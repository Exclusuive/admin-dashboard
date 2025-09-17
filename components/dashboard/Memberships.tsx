"use client";

import { useRouter } from "next/navigation";
import { MembershipCard } from "../../components/common/MembershipCard";
import { useState } from "react";

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
];

export function Memberships() {
  const router = useRouter();
  const [isCreateMembershipModalOpen, setIsCreateMembershipModalOpen] =
    useState(false);

  const handleViewMembership = (membership: (typeof memberships)[0]) => {
    router.push(`/dashboard/memberships/${membership.id}`);
  };

  // Main list view
  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search memberships..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Types</option>
            <option>TIERED</option>
            <option>SUBSCRIPTION</option>
            <option>POINTS_ONLY</option>
            <option>NFT_PASS</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Sort by Name</option>
            <option>Sort by Created Date</option>
            <option>Sort by Member Count</option>
          </select>
        </div>
      </div>

      {/* Memberships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.map((membership) => (
          <MembershipCard
            key={membership.id}
            membership={membership}
            onView={handleViewMembership}
            onAddMember={() => alert(`Add member to ${membership.name}`)}
            onEdit={() => alert(`Edit ${membership.name}`)}
            onDelete={() => alert(`Delete ${membership.name}`)}
          />
        ))}
        <button
          className=""
          onClick={() => setIsCreateMembershipModalOpen(true)}
        >
          <span className="px-4 py-2 text-center text-blue-500 rounded-full border-2 border-blue-500 text-4xl font-bold">
            +
          </span>
        </button>
      </div>
      {isCreateMembershipModalOpen && <CreateMembershipModal />}
    </div>
  );
}

function CreateMembershipModal() {
  return (
    <div>
      <h1>Create Membership</h1>
    </div>
  );
}
