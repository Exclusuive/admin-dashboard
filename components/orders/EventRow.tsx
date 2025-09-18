import {
  getEventTypeColor,
  getEventTypeLabel,
  getPaymentAmount,
  getPaymentMethod,
  getMembershipStatus,
  formatDate,
} from "../../lib/webhooks";

interface WebhookEvent {
  id: string;
  type: string;
  created: string;
  data: Record<string, unknown>;
  processed: boolean;
  error?: string;
}

export default function EventRow({
  event,
  openMembershipModal,
  deleteEvent,
}: {
  event: WebhookEvent;
  openMembershipModal: (event: WebhookEvent) => void;
  deleteEvent: (id: string) => void;
}) {
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
