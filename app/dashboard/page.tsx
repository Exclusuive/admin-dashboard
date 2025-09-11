"use client";

import { useDashboard } from "./providers/DashboardProvider";
import { Overview } from "./components/Overview";
import { Memberships } from "./components/Memberships";
import { Orders } from "./components/Orders";
import { Rewards } from "./components/Rewards";
import { Analytics } from "./components/Analytics";
import { Settings } from "./components/Settings";

export default function Dashboard() {
  const { activeTab } = useDashboard();

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "memberships":
        return <Memberships />;
      case "orders":
        return <Orders />;
      case "products":
        return <Rewards />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
}
