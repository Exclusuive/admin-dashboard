"use client";

interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  admin: string;
}

interface ActivityTabProps {
  activities: Activity[];
}

export function ActivityTab({ activities }: ActivityTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
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
              <div className="text-sm text-gray-500">{activity.timestamp}</div>
              <div className="text-xs text-gray-400">by {activity.admin}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
