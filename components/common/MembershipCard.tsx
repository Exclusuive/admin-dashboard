import React from "react";
import { RetailMembershipType } from "@/lib/types";
export interface MembershipCardProps {
  membership: RetailMembershipType & {
    totalMembers?: number;
    activeMembers?: number;
    inactiveMembers?: number;
  };
  onView: (membership: MembershipCardProps["membership"]) => void;
  onEdit?: () => void;
}

export function MembershipCard({
  membership,
  onView,
  onEdit,
}: MembershipCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {membership.name}
        </h3>
        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {membership.requiredAmountToUpgrade
            ? `At least ${membership.requiredAmountToUpgrade} Stamps`
            : "Free"}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Members:</span>
          <span className="font-medium">
            {membership.totalMembers?.toLocaleString() || 0}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Active:</span>
          <span className="font-medium text-green-600">
            {membership.activeMembers?.toLocaleString() || 0}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Inactive:</span>
          <span className="font-medium text-red-600">
            {membership.inactiveMembers?.toLocaleString() || 0}
          </span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onView(membership)}
          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
        >
          Members
        </button>

        {onEdit && membership.name !== "guest" && (
          <button
            onClick={onEdit}
            className="flex-1 bg-gray-600 text-white py-2 px-3 rounded text-sm hover:bg-gray-700 transition-colors"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
