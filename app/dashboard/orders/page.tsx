"use client";

import { useState, useEffect } from "react";
import { StatCard } from "../../../components/common/StatCard";
import EventRow from "../../../components/orders/EventRow";
import MembershipModal from "../../../components/orders/MembershipModal";
import { WebhookEvent, EventStats } from "../../../lib/types";

export default function OrdersPage() {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [stats, setStats] = useState<EventStats | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("disconnected");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent | null>(null);

  // 데이터 로드 + 자동 새로고침
  useEffect(() => {
    let interval: number | undefined;

    const load = async () => {
      try {
        const eventsUrl = "/api/webhooks/events?limit=100";
        const [eventsResponse, statsResponse] = await Promise.all([
          fetch(eventsUrl),
          fetch("/api/webhooks/events?stats=true"),
        ]);

        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json();
          setEvents((prev) =>
            eventsData.events !== prev ? eventsData.events || [] : prev
          );
        }
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats((prev) => (statsData !== prev ? statsData : prev));
        }
      } catch (error) {
        console.error("Error loading webhook data:", error);
      }
    };

    load();

    if (autoRefresh) {
      interval = window.setInterval(load, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoRefresh]);

  // 실시간 연결 상태 표시
  useEffect(() => {
    setConnectionStatus(autoRefresh ? "connected" : "disconnected");
  }, [autoRefresh]);

  // 이벤트 삭제
  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`/api/webhooks/events?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // 모든 이벤트 삭제
  const clearAllEvents = async () => {
    if (!confirm("모든 webhook 이벤트를 삭제하시겠습니까?")) {
      return;
    }
    try {
      const response = await fetch("/api/webhooks/events?clearAll=true", {
        method: "DELETE",
      });
      if (response.ok) {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error clearing events:", error);
    }
  };

  // 모달 열기
  const openMembershipModal = (event: WebhookEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeMembershipModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // 멤버십 적용 로직은 MembershipModal 내부로 이동

  const loadEvents = async () => {
    const eventsUrl = "/api/webhooks/events?limit=100";
    const eventsResponse = await fetch(eventsUrl);
    const eventsData = await eventsResponse.json();
    setEvents(eventsData.events || []);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
          <p className="text-gray-600">실시간 Stripe webhook 이벤트 모니터링</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                connectionStatus === "connected"
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {connectionStatus === "connected" ? "실시간 연결됨" : "연결 끊김"}
            </span>
          </div>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              autoRefresh
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {autoRefresh ? "자동 새로고침 ON" : "자동 새로고침 OFF"}
          </button>
          <button
            onClick={loadEvents}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            새로고침
          </button>
          <button
            onClick={clearAllEvents}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
          >
            전체 삭제
          </button>
        </div>
      </div>

      {/* Order Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="전체 이벤트" value={stats.total} color="default" />
          <StatCard
            title="최근 24시간"
            value={stats.last24Hours}
            color="blue"
          />
          <StatCard
            title="성공한 결제"
            value={stats.byType["payment_intent.succeeded"] || 0}
            color="green"
          />
          <StatCard
            title="실패한 결제"
            value={stats.byType["payment_intent.payment_failed"] || 0}
            color="red"
          />
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Webhook 이벤트</h3>
        </div>

        {events.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-gray-500">webhook 이벤트가 없습니다.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                    이벤트 ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이벤트 타입
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    금액
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    결제 수단
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    발생 시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    멤버십
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <EventRow
                    key={event.id}
                    event={event}
                    openMembershipModal={openMembershipModal}
                    deleteEvent={deleteEvent}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <MembershipModal
        isOpen={isModalOpen}
        selectedEvent={selectedEvent}
        onClose={closeMembershipModal}
        setEvents={setEvents}
      />
    </div>
  );
}
