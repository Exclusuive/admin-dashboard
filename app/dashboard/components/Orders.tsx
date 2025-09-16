"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";

interface WebhookEvent {
  id: string;
  type: string;
  created: string;
  data: Record<string, unknown>;
  processed: boolean;
  error?: string;
}

interface EventStats {
  total: number;
  byType: Record<string, number>;
  last24Hours: number;
}

// EventRow 컴포넌트 (메모이제이션)
const EventRow = memo(
  ({
    event,
    getEventTypeColor,
    getEventTypeLabel,
    getPaymentAmount,
    getPaymentMethod,
    getMembershipStatus,
    formatDate,
    openMembershipModal,
    deleteEvent,
  }: {
    event: WebhookEvent;
    getEventTypeColor: (type: string) => string;
    getEventTypeLabel: (type: string) => string;
    getPaymentAmount: (event: WebhookEvent) => {
      value: number;
      currency: string;
    };
    getPaymentMethod: (event: WebhookEvent) => string;
    getMembershipStatus: (event: WebhookEvent) => string | null;
    formatDate: (dateString: string) => string;
    openMembershipModal: (event: WebhookEvent) => void;
    deleteEvent: (id: string) => void;
  }) => {
    const amount = getPaymentAmount(event);
    const paymentMethod = getPaymentMethod(event);
    const membershipStatus = getMembershipStatus(event);

    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="cursor-pointer hover:text-blue-600 font-mono text-xs">
              {event.id}
            </span>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => navigator.clipboard.writeText(event.id)}
            >
              📋
            </button>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEventTypeColor(
              event.type
            )}`}
          >
            {getEventTypeLabel(event.type)}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {amount.currency === "KRW"
                ? `₩${amount.value.toLocaleString()}`
                : `${amount.value} ${amount.currency}`}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                amount.currency === "KRW"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              {amount.currency === "KRW" ? "₩" : amount.currency}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              paymentMethod.includes("Card")
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {paymentMethod}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              event.processed
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {event.processed ? "처리됨" : "오류"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(event.created)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {membershipStatus ? (
            <button
              onClick={() =>
                membershipStatus === "적립하기" && openMembershipModal(event)
              }
              className={`px-3 py-1 text-xs rounded-full ${
                membershipStatus === "적립하기"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                  : membershipStatus === "구독 관리"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {membershipStatus}
            </button>
          ) : (
            <span className="text-gray-400 text-xs">-</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button
            onClick={() => deleteEvent(event.id)}
            className="text-red-600 hover:text-red-900"
          >
            삭제
          </button>
        </td>
      </tr>
    );
  }
);

EventRow.displayName = "EventRow";

export function Orders() {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [stats, setStats] = useState<EventStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("disconnected");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent | null>(null);
  const [barcodeInput, setBarcodeInput] = useState("");

  // 이벤트 타입별 색상 매핑 (메모이제이션)
  const eventTypeColors = useMemo(
    () => ({
      "payment_intent.succeeded": "bg-green-100 text-green-800",
      "payment_intent.payment_failed": "bg-red-100 text-red-800",
      "customer.subscription.created": "bg-blue-100 text-blue-800",
      "customer.subscription.updated": "bg-yellow-100 text-yellow-800",
      "customer.subscription.deleted": "bg-red-100 text-red-800",
      "invoice.payment_succeeded": "bg-green-100 text-green-800",
      "invoice.payment_failed": "bg-red-100 text-red-800",
    }),
    []
  );

  const getEventTypeColor = useCallback(
    (type: string) => {
      return (
        (eventTypeColors as Record<string, string>)[type] ||
        "bg-gray-100 text-gray-800"
      );
    },
    [eventTypeColors]
  );

  // 이벤트 타입을 한국어로 변환 (메모이제이션)
  const eventTypeLabels = useMemo(
    () => ({
      "payment_intent.succeeded": "결제 성공",
      "payment_intent.payment_failed": "결제 실패",
      "customer.subscription.created": "구독 생성",
      "customer.subscription.updated": "구독 업데이트",
      "customer.subscription.deleted": "구독 삭제",
      "invoice.payment_succeeded": "인보이스 결제 성공",
      "invoice.payment_failed": "인보이스 결제 실패",
    }),
    []
  );

  const getEventTypeLabel = useCallback(
    (type: string) => {
      return (eventTypeLabels as Record<string, string>)[type] || type;
    },
    [eventTypeLabels]
  );

  // 데이터 로드
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      // 이벤트 데이터 로드
      const eventsUrl = selectedType
        ? `/api/webhooks/events?type=${selectedType}&limit=100`
        : "/api/webhooks/events?limit=100";

      const [eventsResponse, statsResponse] = await Promise.all([
        fetch(eventsUrl),
        fetch("/api/webhooks/events?stats=true"),
      ]);

      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setEvents(eventsData.events || []);
      }

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error("Error loading webhook data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedType]);

  // 자동 새로고침
  useEffect(() => {
    loadData();

    if (autoRefresh) {
      const interval = setInterval(loadData, 5000); // 5초마다 새로고침
      return () => clearInterval(interval);
    }
  }, [selectedType, autoRefresh, loadData]);

  // 실시간 연결 상태 표시
  useEffect(() => {
    const updateConnectionStatus = () => {
      if (autoRefresh) {
        setConnectionStatus("connected");
      } else {
        setConnectionStatus("disconnected");
      }
    };

    updateConnectionStatus();
  }, [autoRefresh]);

  // 이벤트 삭제
  const deleteEvent = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/webhooks/events?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== id)
          );
          loadData(); // 통계 업데이트를 위해 다시 로드
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    },
    [loadData]
  );

  // 모든 이벤트 삭제
  const clearAllEvents = useCallback(async () => {
    if (!confirm("모든 webhook 이벤트를 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch("/api/webhooks/events?clearAll=true", {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents([]);
        loadData();
      }
    } catch (error) {
      console.error("Error clearing events:", error);
    }
  }, [loadData]);

  // 날짜 포맷팅 (메모이제이션)
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, []);

  // 멤버십 적용 여부 결정 (메모이제이션)
  const getMembershipStatus = useCallback((event: WebhookEvent) => {
    if (event.type === "payment_intent.succeeded") {
      return "적립하기";
    } else if (event.type === "payment_intent.payment_failed") {
      return null;
    } else if (event.type.includes("subscription")) {
      return "구독 관리";
    } else {
      return null;
    }
  }, []);

  // 결제 금액 추출 (webhook 데이터에서) (메모이제이션)
  const getPaymentAmount = useCallback((event: WebhookEvent) => {
    if (
      event.type === "payment_intent.succeeded" ||
      event.type === "payment_intent.payment_failed"
    ) {
      const data = event.data as Record<string, unknown>;
      const object = data.object as Record<string, unknown>;
      if (object && object.amount) {
        return {
          value: (object.amount as number) / 100, // Stripe는 센트 단위로 저장
          currency: (object.currency as string)?.toUpperCase() || "KRW",
        };
      }
    }
    return { value: 0, currency: "KRW" };
  }, []);

  // 결제 수단 추출 (메모이제이션)
  const getPaymentMethod = useCallback((event: WebhookEvent) => {
    if (
      event.type === "payment_intent.succeeded" ||
      event.type === "payment_intent.payment_failed"
    ) {
      const data = event.data as Record<string, unknown>;
      const object = data.object as Record<string, unknown>;
      if (object && object.payment_method) {
        const paymentMethod = object.payment_method as Record<string, unknown>;
        return `Card (${
          (paymentMethod.type as string)?.toUpperCase() || "STRIPE"
        })`;
      }
    }
    return "Web3(USDC/Sui)";
  }, []);

  // 모달 열기 (메모이제이션)
  const openMembershipModal = useCallback((event: WebhookEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setBarcodeInput("");
  }, []);

  // 모달 닫기 (메모이제이션)
  const closeMembershipModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setBarcodeInput("");
  }, []);

  // 멤버십 적용하기 (메모이제이션)
  const applyMembership = useCallback(async () => {
    if (!selectedEvent || !barcodeInput.trim()) {
      alert("바코드를 입력해주세요.");
      return;
    }

    try {
      // 여기에 멤버십 적립 API 호출 로직을 추가할 수 있습니다
      console.log("멤버십 적립:", {
        eventId: selectedEvent.id,
        barcode: barcodeInput,
        amount: getPaymentAmount(selectedEvent),
      });

      alert("멤버십이 성공적으로 적립되었습니다!");
      closeMembershipModal();
    } catch (error) {
      console.error("멤버십 적립 오류:", error);
      alert("멤버십 적립 중 오류가 발생했습니다.");
    }
  }, [selectedEvent, barcodeInput, getPaymentAmount, closeMembershipModal]);
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
            onClick={loadData}
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
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">전체 이벤트</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">최근 24시간</h3>
            <p className="text-2xl font-bold text-blue-600">
              {stats.last24Hours}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">성공한 결제</h3>
            <p className="text-2xl font-bold text-green-600">
              {stats.byType["payment_intent.succeeded"] || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">실패한 결제</h3>
            <p className="text-2xl font-bold text-red-600">
              {stats.byType["payment_intent.payment_failed"] || 0}
            </p>
          </div>
        </div>
      )}

      {/* 필터 */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex gap-4 items-center">
          <label className="text-sm font-medium text-gray-700">
            이벤트 타입 필터:
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">모든 타입</option>
            {stats &&
              Object.keys(stats.byType).map((type) => (
                <option key={type} value={type}>
                  {getEventTypeLabel(type)} ({stats.byType[type]})
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Webhook 이벤트</h3>
        </div>

        {loading ? (
          <div className="p-6 text-center">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        ) : events.length === 0 ? (
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
                    getEventTypeColor={getEventTypeColor}
                    getEventTypeLabel={getEventTypeLabel}
                    getPaymentAmount={getPaymentAmount}
                    getPaymentMethod={getPaymentMethod}
                    getMembershipStatus={getMembershipStatus}
                    formatDate={formatDate}
                    openMembershipModal={openMembershipModal}
                    deleteEvent={deleteEvent}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 멤버십 적립 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* 모달 헤더 */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                NFC 혹은 바코드로 멤버십을 인식해주세요
              </h3>
            </div>

            {/* 모달 내용 */}
            <div className="px-6 py-4 space-y-6">
              {/* NFC 이미지 */}
              <div className="text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  NFC 카드를 태그해주세요.
                </p>
              </div>

              {/* 바코드 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  멤버십 바코드
                </label>
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="바코드를 찍어주세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* 결제 정보 표시 */}
              {selectedEvent && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    결제 정보
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>
                      금액:{" "}
                      {(() => {
                        const amount = getPaymentAmount(selectedEvent);
                        return amount.currency === "KRW"
                          ? `₩${amount.value.toLocaleString()}`
                          : `${amount.value} ${amount.currency}`;
                      })()}
                    </div>
                    <div>결제 수단: {getPaymentMethod(selectedEvent)}</div>
                    <div>결제 시간: {formatDate(selectedEvent.created)}</div>
                  </div>
                </div>
              )}
            </div>

            {/* 모달 푸터 */}
            <div className="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={closeMembershipModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                취소
              </button>
              <button
                onClick={applyMembership}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
