"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StatCard } from "../../../../components/common/StatCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { MembersTab } from "../../../../components/memberships/MembersTab";
import { SettingsTab } from "../../../../components/memberships/SettingsTab";
import { ActivityTab } from "../../../../components/memberships/ActivityTab";
import { useAddMember } from "@/hooks/moveCall/useAddMember";
import { RetailMembership } from "@/lib/types";

// 임시: 목록 페이지의 mock 데이터와 동일 구조
const memberships = [
  {
    name: "guest",
    type: "TIERED",
    description: "Premium Web3 payment benefits",
    totalMembers: 1247,
    activeMembers: 1156,
    inactiveMembers: 91,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
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

const defaultMembers = [
  {
    name: "Alice Johnson",
    id: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    status: "Active",
    joinDate: "2024-01-15",
    lastActivity: "2024-01-20",
    email: "alice@example.com",
  },
  {
    name: "Bob Smith",
    id: "0x8ba1f109551bD432803012645Hac136c",
    status: "Inactive",
    joinDate: "2024-01-10",
    lastActivity: "2024-01-19",
    email: "bob@example.com",
  },
  {
    id: "0x1234567890abcdef1234567890abcdef12345678",
    status: "Active",
    joinDate: "2024-01-05",
    lastActivity: "2024-01-12",
    email: "carol@example.com",
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
  const membershipId = useMemo(() => String(params?.id), [params]);
  const [members, setMembers] = useState<RetailMembership[]>(defaultMembers);
  const membership = useMemo(
    () => memberships.find((m) => m.name === membershipId),
    [membershipId]
  );

  const handleMemberAction = (memberId: string, action: string) => {
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
        <Tabs defaultValue="members" className="w-full">
          <div className="border-b border-gray-200 px-6">
            <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="members"
                className="flex items-center space-x-2 py-4 px-1 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 hover:border-gray-300 rounded-none"
              >
                <span>👥</span>
                <span>Members</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center space-x-2 py-4 px-1 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 hover:border-gray-300 rounded-none"
              >
                <span>⚙️</span>
                <span>Settings</span>
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="flex items-center space-x-2 py-4 px-1 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 hover:border-gray-300 rounded-none"
              >
                <span>📊</span>
                <span>Activity</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="members">
              <MembersTab
                members={members}
                onMemberAction={handleMemberAction}
                setMembers={setMembers}
              />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsTab membership={membership} />
            </TabsContent>

            <TabsContent value="activity">
              <ActivityTab activities={activities} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
