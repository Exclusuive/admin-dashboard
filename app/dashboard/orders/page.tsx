"use client";

import { useState } from "react";
import { StatCard } from "../../../components/common/StatCard";
import EventRow from "../../../components/orders/EventRow";
import MembershipModal from "../../../components/orders/MembershipModal";
import { WebhookEvent, EventStats } from "../../../lib/types";
import { useGetPaidEvents } from "@/hooks/getData/useGetPaidEvents";

export default function OrdersPage() {
  const [web2Events, setWeb2Events] = useState<WebhookEvent[]>([]);
  const [stats] = useState<EventStats | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent | null>(null);
  const {
    events: web3Events,
    isPending: isWeb3Pending,
    refetch,
  } = useGetPaidEvents();

  // web2와 web3 이벤트를 합친 배열
  const events = [...web2Events, ...web3Events];

  // Open modal
  const openMembershipModal = (event: WebhookEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Close modal
  const closeMembershipModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  // The membership application logic has been moved inside MembershipModal

  const loadWeb2Events = async () => {
    const eventsUrl = "/api/webhooks/events?limit=100";
    const eventsResponse = await fetch(eventsUrl);
    const eventsData = await eventsResponse.json();
    setWeb2Events(eventsData.events || []);
  };

  const loadEvents = async () => {
    loadWeb2Events();
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
          <p className="text-gray-600">
            Real-time Stripe webhook event monitoring
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={loadEvents}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Order Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Events" value={stats.total} color="default" />
          <StatCard
            title="Last 24 Hours"
            value={stats.last24Hours}
            color="blue"
          />
          <StatCard
            title="Successful Payments"
            value={stats.byType["payment_intent.succeeded"] || 0}
            color="green"
          />
          <StatCard
            title="Failed Payments"
            value={stats.byType["payment_intent.payment_failed"] || 0}
            color="red"
          />
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Webhook Events</h3>
        </div>

        {events.length === 0 && !isWeb3Pending ? (
          <div className="p-6 text-center">
            <div className="text-gray-500">No webhook events.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                    Event ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membership
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <EventRow
                    key={event.id}
                    event={event}
                    openMembershipModal={openMembershipModal}
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
        setEvents={setWeb2Events}
      />
    </div>
  );
}
