"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StatCard } from "../../../../components/common/StatCard";

// 임시: 목록 페이지의 mock 데이터와 동일 구조
const memberships = [
  {
    id: 1,
    name: "Web3 Premium",
    type: "TIERED",
    description: "Premium Web3 payment benefits",
    totalMembers: 1247,
    activeMembers: 1156,
    inactiveMembers: 91,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: 2,
    name: "Crypto Rewards",
    type: "POINTS_ONLY",
    description: "Crypto rewards program",
    totalMembers: 856,
    activeMembers: 789,
    inactiveMembers: 67,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: 3,
    name: "NFT Access",
    type: "NFT_PASS",
    description: "Exclusive NFT holder benefits",
    totalMembers: 234,
    activeMembers: 198,
    inactiveMembers: 36,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
  },
];

const members = [
  {
    id: 1,
    name: "Alice Johnson",
    identifier: "alice@example.com",
    status: "Active",
    joinDate: "2024-01-15",
    lastActivity: "2024-01-20",
    memo: "High-value customer",
  },
  {
    id: 2,
    name: "Bob Smith",
    identifier: "0x1234...5678",
    status: "Active",
    joinDate: "2024-01-10",
    lastActivity: "2024-01-19",
    memo: "Frequent Web3 user",
  },
  {
    id: 3,
    name: "Carol Davis",
    identifier: "+82-10-1234-5678",
    status: "Inactive",
    joinDate: "2024-01-05",
    lastActivity: "2024-01-12",
    memo: "Inactive for 8 days",
  },
];

const activities = [
  {
    id: 1,
    type: "Member Added",
    description: "Alice Johnson joined Web3 Premium",
    timestamp: "2024-01-20 14:30",
    admin: "Admin User",
  },
  {
    id: 2,
    type: "Status Changed",
    description: "Bob Smith status changed to Active",
    timestamp: "2024-01-19 16:45",
    admin: "Admin User",
  },
  {
    id: 3,
    type: "Member Removed",
    description: "John Doe removed from Crypto Rewards",
    timestamp: "2024-01-18 10:20",
    admin: "Admin User",
  },
];

export default function MembershipDetailPage() {
  const router = useRouter();
  const params = useParams();
  const membershipId = useMemo(() => Number(params?.id), [params]);
  const membership = useMemo(
    () => memberships.find((m) => m.id === membershipId),
    [membershipId]
  );

  const [activeTab, setActiveTab] = useState<
    "members" | "settings" | "activity"
  >("members");
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberIdentifier, setNewMemberIdentifier] = useState("");

  const handleAddMember = () => {
    if (newMemberIdentifier.trim()) {
      alert(`Member added: ${newMemberIdentifier}`);
      setNewMemberIdentifier("");
      setShowAddMember(false);
    }
  };

  const handleMemberAction = (memberId: number, action: string) => {
    alert(`${action} action for member ${memberId}`);
  };

  if (!membership) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Dashboard
        </button>
        <div className="text-gray-700">Membership not found.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Memberships
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {membership.name}
          </h2>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Members"
          value={membership.totalMembers}
          color="blue"
        />
        <StatCard
          title="Active"
          value={membership.activeMembers}
          color="green"
        />
        <StatCard
          title="New (30 days)"
          value={`+${Math.floor(Math.random() * 50) + 10}`}
          color="purple"
        />
        <StatCard
          title="Recent Activity"
          value={Math.floor(Math.random() * 20) + 5}
          color="orange"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: "members", label: "Members", icon: "👥" },
              { id: "settings", label: "Settings", icon: "⚙️" },
              { id: "activity", label: "Activity", icon: "📊" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as "members" | "settings" | "activity")
                }
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "members" && (
            <div className="space-y-4">
              {/* Search and Add Member */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Search by wallet, email, phone..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowAddMember(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Member
                </button>
              </div>

              {/* Add Member Modal */}
              {showAddMember && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-96">
                    <h3 className="text-lg font-semibold mb-4">
                      Add New Member
                    </h3>
                    <input
                      type="text"
                      placeholder="Email, Phone, Wallet, or Customer ID"
                      value={newMemberIdentifier}
                      onChange={(e) => setNewMemberIdentifier(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowAddMember(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddMember}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Add Member
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Members Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Identifier
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {member.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {member.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {member.memo}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.identifier}
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
                              onClick={() =>
                                handleMemberAction(member.id, "View")
                              }
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                            <button
                              onClick={() =>
                                handleMemberAction(
                                  member.id,
                                  member.status === "Active"
                                    ? "Deactivate"
                                    : "Reactivate"
                                )
                              }
                              className="text-orange-600 hover:text-orange-900"
                            >
                              {member.status === "Active"
                                ? "Deactivate"
                                : "Reactivate"}
                            </button>
                            <button
                              onClick={() =>
                                handleMemberAction(member.id, "Remove")
                              }
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
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Membership Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Membership Name
                    </label>
                    <input
                      type="text"
                      defaultValue={membership.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      defaultValue={membership.description}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Membership Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="TIERED">Tiered Membership</option>
                      <option value="SUBSCRIPTION">Subscription</option>
                      <option value="POINTS_ONLY">Points Only</option>
                      <option value="NFT_PASS">NFT Pass</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Activity Log
              </h3>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100"
                  >
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <div>
                        <span className="text-gray-700 font-medium">
                          {activity.type}
                        </span>
                        <span className="text-gray-500 ml-2">
                          {activity.description}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {activity.timestamp}
                      </div>
                      <div className="text-xs text-gray-400">
                        by {activity.admin}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
