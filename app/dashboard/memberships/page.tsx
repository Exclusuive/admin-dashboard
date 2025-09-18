"use client";

import { useRouter } from "next/navigation";
import { MembershipCard } from "../../../components/common/MembershipCard";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { RetailMembershipType } from "@/lib/types";
import { useGetMembershipTypes } from "@/hooks/getData/useGetMembershipTypes";
import { useDashboard } from "../providers/DashboardProvider";
import { Plus } from "lucide-react";
import { useCreateMembershipType } from "@/hooks/moveCall/useCreateMembershipType";

export default function MembershipsPage() {
  const router = useRouter();
  const [isCreateMembershipModalOpen, setIsCreateMembershipModalOpen] =
    useState(false);
  const [memberships, setMemberships] = useState<RetailMembershipType[]>([]);
  const { shopId, shopCapId } = useDashboard();
  const { createMembershipType } = useCreateMembershipType();

  const { membershipTypes } = useGetMembershipTypes({ id: shopId });

  useEffect(() => {
    setMemberships(membershipTypes);
  }, [membershipTypes]);

  const handleViewMembership = (membership: RetailMembershipType) => {
    router.push(`/dashboard/memberships/${membership.name}`);
  };

  const handleCreateMembership = (
    name: string,
    requiredAmountToUpgrade: number
  ) => {
    if (!name.trim() || requiredAmountToUpgrade === 0) return;
    createMembershipType(
      { name, requiredAmountToUpgrade, shopId, shopCapId },
      (result: RetailMembershipType) => {
        setMemberships((prev) => [...prev, result]);
      }
    );
    setIsCreateMembershipModalOpen(false);
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
            <option>STAMP_CARD</option>
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
            key={membership.name}
            membership={membership}
            onView={handleViewMembership}
            onEdit={() => alert(`Edit ${membership.name}`)}
          />
        ))}
        <button
          className="group flex flex-col items-center justify-center w-full h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
          onClick={() => setIsCreateMembershipModalOpen(true)}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200 mb-3">
            <Plus className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-700 transition-colors duration-200">
            Add New Membership
          </h3>
          <p className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-200 text-center mt-1">
            Create a new membership
            <br />
            to provide benefits to customers
          </p>
        </button>
      </div>
      <CreateMembershipDialog
        open={isCreateMembershipModalOpen}
        onOpenChange={setIsCreateMembershipModalOpen}
        onCreateMembership={handleCreateMembership}
      />
    </div>
  );
}

function CreateMembershipDialog({
  open,
  onOpenChange,
  onCreateMembership,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateMembership: (name: string, requiredAmountToUpgrade: number) => void;
}) {
  const [name, setName] = useState("");
  const [requiredAmountToUpgrade, setRequiredAmountToUpgrade] = useState(0);

  const resetForm = () => {
    setName("");
    setRequiredAmountToUpgrade(0);
  };

  const handleCreateMembership = () => {
    onCreateMembership(name, requiredAmountToUpgrade);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Membership</DialogTitle>
          <DialogDescription>
            Create a new membership. Please enter the required information.
          </DialogDescription>
        </DialogHeader>

        {/* 폼 자리 - 추후 실제 입력 필드로 대체 */}
        <div className="space-y-6 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <Input
              placeholder="e.g. Web3 Premium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Required Amount to Upgrade
            </label>
            <p className="text-xs text-gray-500">
              How many stamps need to be collected to achieve this membership
              level
            </p>
            <Input
              placeholder="30"
              type="number"
              value={requiredAmountToUpgrade}
              onChange={(e) =>
                setRequiredAmountToUpgrade(Number(e.target.value))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <button
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => {
              onOpenChange(false);
              resetForm();
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleCreateMembership}
          >
            Create
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
