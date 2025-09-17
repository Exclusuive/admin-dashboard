"use client";

import { useState } from "react";
import {
  RewardCard,
  Reward,
  getRequirementText,
} from "../../components/common/RewardCard";
import { StatCard } from "../../components/common/StatCard";

// Sample data
const sampleRewards: Reward[] = [
  {
    id: "1",
    name: "Starbucks Americano Coupon",
    type: "Digital",
    requirement: { type: "points", points: 1000 },
    status: "Active",
    period: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Nike Air Force 1",
    type: "Physical",
    requirement: { type: "mixed", points: 5000, stamps: 10 },
    status: "Active",
    stock: { total: 50, available: 23 },
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Special NFT Artwork",
    type: "NFT",
    requirement: { type: "stamps", stamps: 20 },
    status: "Inactive",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=300&h=200&fit=crop",
  },
];

export function Rewards() {
  const [rewards, setRewards] = useState<Reward[]>(sampleRewards);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [typeFilter, setTypeFilter] = useState<
    "All" | "Digital" | "Physical" | "NFT"
  >("All");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  // Filtered rewards list
  const filteredRewards = rewards.filter((reward) => {
    const matchesSearch = reward.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || reward.status === statusFilter;
    const matchesType = typeFilter === "All" || reward.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const toggleRewardStatus = (id: string) => {
    setRewards(
      rewards.map((reward) =>
        reward.id === id
          ? {
              ...reward,
              status: reward.status === "Active" ? "Inactive" : "Active",
            }
          : reward
      )
    );
  };

  const deleteReward = (id: string) => {
    setRewards(rewards.filter((reward) => reward.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Reward Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create Reward
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Rewards" value={rewards.length} color="blue" />
        <StatCard
          title="Active Rewards"
          value={rewards.filter((r) => r.status === "Active").length}
          color="green"
        />
        <StatCard
          title="Inactive Rewards"
          value={rewards.filter((r) => r.status === "Inactive").length}
          color="default"
        />
        <StatCard
          title="Low Stock"
          value={
            rewards.filter((r) => r.stock && r.stock.available < 10).length
          }
          color="red"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by reward name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as typeof statusFilter)
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Types</option>
            <option value="Digital">Digital</option>
            <option value="Physical">Physical</option>
            <option value="NFT">NFT</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("card")}
              className={`px-3 py-2 text-sm ${
                viewMode === "card"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Card
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 text-sm ${
                viewMode === "table"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Rewards List */}
      {filteredRewards.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-500 text-lg mb-4">No rewards found.</div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Create Reward
          </button>
        </div>
      ) : viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onToggleStatus={toggleRewardStatus}
              onEdit={() => alert(`Edit ${reward.name}`)}
              onDelete={deleteReward}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reward Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requirement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRewards.map((reward) => (
                <tr key={reward.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600">
                      {reward.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        reward.type === "Digital"
                          ? "bg-blue-100 text-blue-800"
                          : reward.type === "Physical"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {reward.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getRequirementText(reward.requirement)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleRewardStatus(reward.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          reward.status === "Active"
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            reward.status === "Active"
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                      <span className="ml-2 text-sm text-gray-600">
                        {reward.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reward.stock
                      ? `${reward.stock.available}/${reward.stock.total}`
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reward.period
                      ? `${reward.period.startDate} ~ ${reward.period.endDate}`
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteReward(reward.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
