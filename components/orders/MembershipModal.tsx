"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { getPaymentAmount, getPaymentMethod, formatDate } from "@/lib/webhooks";
import { useGrantStamp } from "@/hooks/moveCall/useGrantStamp";
import { useDashboard } from "@/app/dashboard/providers/DashboardProvider";
import { WebhookEvent } from "../../lib/types";

interface MembershipModalProps {
  isOpen: boolean;
  selectedEvent: WebhookEvent | null;
  onClose: () => void;
  setEvents: Dispatch<SetStateAction<WebhookEvent[]>>;
}

export default function MembershipModal({
  isOpen,
  selectedEvent,
  onClose,
  setEvents,
}: MembershipModalProps) {
  const [barcodeInput, setBarcodeInput] = useState("");
  const { grantStamp } = useGrantStamp();
  const { shopId, shopCapId } = useDashboard();

  if (!isOpen || !selectedEvent) return null;

  const applyMembership = async () => {
    if (!selectedEvent || !barcodeInput.trim()) {
      alert("Please scan a barcode or NFC.");
      return;
    }
    try {
      grantStamp({
        shopId,
        shopCapId,
        stampCardId: barcodeInput,
        selectedEvent,
        setEvents,
      });
      setBarcodeInput("");
      onClose();
    } catch (error) {
      console.error("Membership grant error:", error);
      alert("An error occurred while granting membership.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Please identify membership via NFC or Barcode
          </h3>
        </div>

        <div className="px-6 py-4 space-y-6">
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
          </div>
          <Input
            type="text"
            placeholder="Scan NFC or Barcode"
            value={barcodeInput}
            onChange={(e) => setBarcodeInput(e.target.value)}
          />

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Payment Details
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div>
                Amount:{" "}
                {(() => {
                  const amount = getPaymentAmount(selectedEvent);
                  return amount.currency === "KRW"
                    ? `₩${amount.value.toLocaleString()}`
                    : `${amount.value} ${amount.currency}`;
                })()}
              </div>
              <div>Payment Method: {getPaymentMethod(selectedEvent)}</div>
              <div>Payment Time: {formatDate(selectedEvent.created)}</div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={applyMembership}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
