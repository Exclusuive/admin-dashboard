// 간단한 인메모리 데이터베이스 (실제 프로덕션에서는 PostgreSQL, MongoDB 등을 사용)
interface WebhookEvent {
  id: string;
  type: string;
  created: string;
  data: Record<string, unknown>;
  processed: boolean;
  error?: string;
}

// 인메모리 저장소
let webhookEvents: WebhookEvent[] = [];

export class WebhookDatabase {
  // Webhook 이벤트 저장
  static async saveEvent(event: {
    id: string;
    type: string;
    created: number;
    data: Record<string, unknown>;
  }): Promise<void> {
    const webhookEvent: WebhookEvent = {
      id: event.id,
      type: event.type,
      created: new Date(event.created * 1000).toISOString(),
      data: event.data,
      processed: true,
    };

    webhookEvents.unshift(webhookEvent); // 최신 이벤트를 맨 앞에 추가

    // 최대 1000개 이벤트만 유지
    if (webhookEvents.length > 1000) {
      webhookEvents = webhookEvents.slice(0, 1000);
    }

    console.log("Webhook event saved:", webhookEvent.id);
  }

  // 모든 webhook 이벤트 조회
  static async getAllEvents(): Promise<WebhookEvent[]> {
    return webhookEvents;
  }

  // 특정 타입의 이벤트만 조회
  static async getEventsByType(type: string): Promise<WebhookEvent[]> {
    return webhookEvents.filter((event) => event.type === type);
  }

  // 최근 N개 이벤트 조회
  static async getRecentEvents(limit: number = 50): Promise<WebhookEvent[]> {
    return webhookEvents.slice(0, limit);
  }

  // 이벤트 통계 조회
  static async getEventStats(): Promise<{
    total: number;
    byType: Record<string, number>;
    last24Hours: number;
  }> {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const byType: Record<string, number> = {};
    let last24HoursCount = 0;

    webhookEvents.forEach((event) => {
      // 타입별 카운트
      byType[event.type] = (byType[event.type] || 0) + 1;

      // 최근 24시간 카운트
      const eventDate = new Date(event.created);
      if (eventDate >= last24Hours) {
        last24HoursCount++;
      }
    });

    return {
      total: webhookEvents.length,
      byType,
      last24Hours: last24HoursCount,
    };
  }

  // 이벤트 삭제
  static async deleteEvent(id: string): Promise<boolean> {
    const index = webhookEvents.findIndex((event) => event.id === id);
    if (index !== -1) {
      webhookEvents.splice(index, 1);
      return true;
    }
    return false;
  }

  // 모든 이벤트 삭제
  static async clearAllEvents(): Promise<void> {
    webhookEvents = [];
  }
}
