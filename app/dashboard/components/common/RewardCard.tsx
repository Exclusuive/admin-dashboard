import React from "react";

export interface Reward {
  id: string;
  name: string;
  type: "Digital" | "Physical" | "NFT";
  requirement: {
    type: "points" | "stamps" | "mixed";
    points?: number;
    stamps?: number;
  };
  status: "Active" | "Inactive";
  stock?: {
    total: number;
    available: number;
  };
  period?: {
    startDate: string;
    endDate: string;
  };
  image?: string;
}

export interface RewardCardProps {
  reward: Reward;
  onToggleStatus: (id: string) => void;
  onEdit?: () => void;
  onDelete: (id: string) => void;
}

export const getRequirementText = (requirement: Reward["requirement"]) => {
  switch (requirement.type) {
    case "points":
      return `Points ${requirement.points}`;
    case "stamps":
      return `Stamps ${requirement.stamps}`;
    case "mixed":
      return `Mixed (Points ${requirement.points} + Stamps ${requirement.stamps})`;
    default:
      return "";
  }
};

export function RewardCard({
  reward,
  onToggleStatus,
  onEdit,
  onDelete,
}: RewardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Image Section */}
      {reward.image && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img
            src={reward.image}
            alt={reward.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600">
            {reward.name}
          </h3>
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
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">Requirement:</span>{" "}
            {getRequirementText(reward.requirement)}
          </div>

          {reward.stock && (
            <div>
              <span className="font-medium">Stock:</span>{" "}
              {reward.stock.available}/{reward.stock.total}
            </div>
          )}

          {reward.period && (
            <div>
              <span className="font-medium">Period:</span>{" "}
              {reward.period.startDate} ~ {reward.period.endDate}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Status:</span>
            <button
              onClick={() => onToggleStatus(reward.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                reward.status === "Active" ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  reward.status === "Active" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="ml-2 text-sm text-gray-600">{reward.status}</span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(reward.id)}
            className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
