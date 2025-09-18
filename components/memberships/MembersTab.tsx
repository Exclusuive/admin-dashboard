"use client";

import { RetailMembership } from "@/lib/types";
import { AddMemberDialog } from "./AddMemberDialog";
import { useAddMember } from "@/hooks/moveCall/useAddMember";
import { useDashboard } from "@/app/dashboard/providers/DashboardProvider";

interface MembersTabProps {
  members: RetailMembership[];
  onMemberAction: (memberId: string, action: string) => void;
  setMembers: (members: RetailMembership[]) => void;
}

export function MembersTab({
  members,
  onMemberAction,
  setMembers,
}: MembersTabProps) {
  const { addMember } = useAddMember();
  const { shopId } = useDashboard();

  const handleAddMember = (address: string) => {
    // addMember(
    //   { shopId: shopId, recipient: address },
    //   (result: RetailMembership) => {
    //     setMembers((prev) => [...prev, result]);
    //   }
    // );
  };

  return (
    <div className="space-y-4">
      {/* Search and Add Member */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by address, name..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <AddMemberDialog onAddMember={handleAddMember} />
      </div>

      {/* Members Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Membership ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                  {member.id.slice(0, 6)}...{member.id.slice(-6)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.name && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.name?.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.lastActivity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onMemberAction(member.id, "View")}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        onMemberAction(
                          member.id,
                          member.status === "Active"
                            ? "Deactivate"
                            : "Reactivate"
                        )
                      }
                      className="text-orange-600 hover:text-orange-900"
                    >
                      {member.status === "Active" ? "Deactivate" : "Reactivate"}
                    </button>
                    <button
                      onClick={() => onMemberAction(member.id, "Remove")}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
