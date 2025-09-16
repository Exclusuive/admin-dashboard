# Stripe Webhook 설정 가이드

이 가이드는 Next.js에서 Stripe webhook을 받아서 모니터링하는 방법을 설명합니다.

## 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# Stripe 설정
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe CLI 설정 (개발용)
STRIPE_CLI_WEBHOOK_SECRET=whsec_your_cli_webhook_secret_here

# Next.js 설정
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## 2. Stripe Dashboard 설정

### 2.1 Webhook 엔드포인트 생성

1. [Stripe Dashboard](https://dashboard.stripe.com)에 로그인
2. **Developers** > **Webhooks**로 이동
3. **Add endpoint** 클릭
4. **Endpoint URL**에 다음 URL 입력:
   ```
   https://yourdomain.com/api/webhooks/stripe
   ```
   (로컬 개발 시: `http://localhost:3000/api/webhooks/stripe`)

### 2.2 이벤트 선택

다음 이벤트들을 선택하세요:

- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

### 2.3 Webhook Secret 복사

Webhook 엔드포인트 생성 후, **Signing secret**을 복사하여 `.env.local`의 `STRIPE_WEBHOOK_SECRET`에 설정하세요.

## 3. 개발 서버 실행

```bash
npm run dev
```

## 4. Webhook 모니터링

1. 브라우저에서 `http://localhost:3000/webhook-monitor`로 이동
2. 실시간 webhook 이벤트를 모니터링할 수 있습니다

## 5. 기능

### 5.1 실시간 모니터링

- 자동 새로고침 (5초 간격)
- 실시간 연결 상태 표시
- 이벤트 타입별 필터링

### 5.2 이벤트 관리

- 이벤트 삭제
- 전체 이벤트 삭제
- 이벤트 통계 조회

### 5.3 지원하는 이벤트 타입

- 결제 성공/실패
- 구독 생성/업데이트/삭제
- 인보이스 결제 성공/실패

## 6. API 엔드포인트

### 6.1 Webhook 수신

```
POST /api/webhooks/stripe
```

### 6.2 이벤트 조회

```
GET /api/webhooks/events
GET /api/webhooks/events?type=payment_intent.succeeded
GET /api/webhooks/events?limit=100
GET /api/webhooks/events?stats=true
```

### 6.3 이벤트 삭제

```
DELETE /api/webhooks/events?id=event_id
DELETE /api/webhooks/events?clearAll=true
```

## 7. 테스트

### 7.1 Stripe CLI 사용 (권장)

```bash
# Stripe CLI 설치
brew install stripe/stripe-cli/stripe

# 로그인
stripe login

# Webhook 포워딩 (로컬 개발용)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**중요**: `stripe listen` 명령어를 실행하면 터미널에 webhook secret이 표시됩니다. 이 값을 `.env.local` 파일의 `STRIPE_CLI_WEBHOOK_SECRET`에 복사하세요.

예시:

```
> Ready! Your webhook signing secret is whsec_1234567890abcdef...
```

### 7.2 테스트 이벤트 전송

```bash
# 테스트 결제 성공 이벤트
stripe trigger payment_intent.succeeded

# 테스트 결제 실패 이벤트
stripe trigger payment_intent.payment_failed

# 테스트 구독 생성 이벤트
stripe trigger customer.subscription.created
```

## 8. 프로덕션 배포

### 8.1 환경 변수 설정

프로덕션 환경에서 다음 환경 변수를 설정하세요:

- `STRIPE_SECRET_KEY`: 프로덕션 Stripe Secret Key
- `STRIPE_WEBHOOK_SECRET`: 프로덕션 Webhook Secret

### 8.2 Webhook URL 업데이트

Stripe Dashboard에서 프로덕션 도메인으로 webhook URL을 업데이트하세요.

## 9. 보안 고려사항

1. **Webhook Secret 검증**: 모든 webhook 요청은 서명을 검증합니다
2. **HTTPS 사용**: 프로덕션에서는 반드시 HTTPS를 사용하세요
3. **환경 변수 보안**: `.env.local` 파일을 `.gitignore`에 추가하세요

## 10. 문제 해결

### 10.1 Webhook이 수신되지 않는 경우

1. Stripe Dashboard에서 webhook URL 확인
2. 환경 변수 설정 확인
3. 서버 로그 확인

### 10.2 서명 검증 실패

1. `STRIPE_WEBHOOK_SECRET` 값 확인
2. Webhook Secret이 올바른지 확인

### 10.3 이벤트가 표시되지 않는 경우

1. 브라우저 개발자 도구에서 네트워크 요청 확인
2. API 엔드포인트 응답 확인

### 10.4 Stripe CLI trigger 명령어가 작동하지 않는 경우

**문제**: `stripe trigger` 명령어로 테스트할 때 webhook이 수신되지 않음

**해결 방법**:

1. **Stripe CLI webhook secret 확인**:

   ```bash
   # 터미널에서 stripe listen 실행 시 표시되는 secret 복사
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

2. **환경 변수 설정**:

   ```env
   # .env.local 파일에 추가
   STRIPE_CLI_WEBHOOK_SECRET=whsec_your_cli_webhook_secret_here
   ```

3. **서버 재시작**:

   ```bash
   npm run dev
   ```

4. **테스트**:
   ```bash
   stripe trigger payment_intent.succeeded
   ```

**참고**: Stripe CLI의 `trigger` 명령어는 `stripe listen`으로 생성된 webhook secret을 사용합니다. 이는 Stripe Dashboard에서 생성한 webhook secret과 다릅니다.
