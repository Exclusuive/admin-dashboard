import { NextRequest, NextResponse } from "next/server";
import { WebhookDatabase } from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "50");
    const stats = searchParams.get("stats") === "true";

    if (stats) {
      // 통계 정보 반환
      const eventStats = await WebhookDatabase.getEventStats();
      return NextResponse.json(eventStats);
    }

    let events;
    if (type) {
      // 특정 타입의 이벤트만 조회
      events = await WebhookDatabase.getEventsByType(type);
    } else {
      // 최근 이벤트 조회
      events = await WebhookDatabase.getRecentEvents(limit);
    }

    return NextResponse.json({
      events,
      count: events.length,
    });
  } catch (error) {
    console.error("Error fetching webhook events:", error);
    return NextResponse.json(
      { error: "Failed to fetch webhook events" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const clearAll = searchParams.get("clearAll") === "true";

    if (clearAll) {
      await WebhookDatabase.clearAllEvents();
      return NextResponse.json({ message: "All events cleared" });
    }

    if (id) {
      const deleted = await WebhookDatabase.deleteEvent(id);
      if (deleted) {
        return NextResponse.json({ message: "Event deleted" });
      } else {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
    }

    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error deleting webhook event:", error);
    return NextResponse.json(
      { error: "Failed to delete webhook event" },
      { status: 500 }
    );
  }
}
