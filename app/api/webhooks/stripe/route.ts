import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { WebhookDatabase } from "@/lib/database";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

// 개발 환경에서는 Stripe CLI의 webhook secret을 사용
const webhookSecret =
  process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_CLI_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      console.error("No signature provided");
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      console.error("Body:", body);
      console.error("Signature:", signature);
      console.error("Webhook Secret:", webhookSecret ? "Set" : "Not set");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.log(`🔔 Webhook received: ${event.type}`);

    // 이벤트 타입에 따른 처리
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(
          event.data.object as Stripe.PaymentIntent
        );
        break;
      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(
          event.data.object as Stripe.PaymentIntent
        );
        break;
      case "customer.subscription.created":
        await handleSubscriptionCreated(
          event.data.object as Stripe.Subscription
        );
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        );
        break;
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(
          event.data.object as Stripe.Invoice
        );
        break;
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // 이벤트를 데이터베이스에 저장
    await WebhookDatabase.saveEvent({
      id: event.id,
      type: event.type,
      created: event.created,
      data: event.data as unknown as Record<string, unknown>,
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// 결제 성공 처리
async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
) {
  console.log("Payment succeeded:", paymentIntent.id);
  // 여기에 결제 성공 시 비즈니스 로직 추가
  // 예: 주문 상태 업데이트, 이메일 발송 등
}

// 결제 실패 처리
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log("Payment failed:", paymentIntent.id);
  // 여기에 결제 실패 시 비즈니스 로직 추가
}

// 구독 생성 처리
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log("Subscription created:", subscription.id);
  // 여기에 구독 생성 시 비즈니스 로직 추가
}

// 구독 업데이트 처리
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("Subscription updated:", subscription.id);
  // 여기에 구독 업데이트 시 비즈니스 로직 추가
}

// 구독 삭제 처리
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("Subscription deleted:", subscription.id);
  // 여기에 구독 삭제 시 비즈니스 로직 추가
}

// 인보이스 결제 성공 처리
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log("Invoice payment succeeded:", invoice.id);
  // 여기에 인보이스 결제 성공 시 비즈니스 로직 추가
}

// 인보이스 결제 실패 처리
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log("Invoice payment failed:", invoice.id);
  // 여기에 인보이스 결제 실패 시 비즈니스 로직 추가
}
