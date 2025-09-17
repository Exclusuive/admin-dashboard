import React from "react";

export interface MembershipCardProps {
  membership: {
    id: number;
    name: string;
    type: string;
    description: string;
    totalMembers: number;
    activeMembers: number;
    inactiveMembers: number;
    createdAt: string;
    updatedAt: string;
  };
  onView: (membership: MembershipCardProps["membership"]) => void;
  onAddMember?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function MembershipCard({
  membership,
  onView,
  onAddMember,
  onEdit,
  onDelete,
}: MembershipCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {membership.name}
          </h3>
          <p className="text-sm text-gray-500">{membership.description}</p>
          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            {membership.type}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Members:</span>
          <span className="font-medium">
            {membership.totalMembers.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Active:</span>
          <span className="font-medium text-green-600">
            {membership.activeMembers.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Inactive:</span>
          <span className="font-medium text-red-600">
            {membership.inactiveMembers.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="text-xs text-gray-400 mb-4">
        <div>Created: {membership.createdAt}</div>
        <div>Updated: {membership.updatedAt}</div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onView(membership)}
          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
        >
          View
        </button>
        {onAddMember && (
          <button
            onClick={onAddMember}
            className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors"
          >
            Add Member
          </button>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex-1 bg-gray-600 text-white py-2 px-3 rounded text-sm hover:bg-gray-700 transition-colors"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
