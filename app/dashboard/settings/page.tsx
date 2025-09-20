"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"settings" | "billing">(
    "settings"
  );
  const [paypalConnected, setPaypalConnected] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(false);
  const [currentPlan] = useState("Starter");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "settings"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            ⚙️ Settings
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "billing"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            💳 Billing
          </button>
        </div>
      </div>

      {activeTab === "settings" && (
        <div className="space-y-6">
          {/* Web2 Payments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Web2 Payments (Payment Gateway)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PayPal Card */}
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                    PP
                  </div>
                  <h4 className="font-semibold text-gray-900">PayPal</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Connect PayPal payment events to ExcluSuive Membership.
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-medium ${
                      paypalConnected ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {paypalConnected ? "Connected" : "Not Connected"}
                  </span>
                  <button
                    onClick={() => setPaypalConnected(!paypalConnected)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      paypalConnected
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    {paypalConnected ? "Disconnect" : "Connect"}
                  </button>
                </div>
                {paypalConnected && (
                  <div className="mt-4 space-y-2">
                    <input
                      type="text"
                      placeholder="PayPal API Key"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Client ID"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500">
                      Webhook URL will be automatically generated.
                    </p>
                  </div>
                )}
              </div>

              {/* Stripe Card */}
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                    S
                  </div>
                  <h4 className="font-semibold text-gray-900">Stripe</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Execute membership point accumulation triggered by Stripe
                  payments.
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-medium ${
                      stripeConnected ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {stripeConnected ? "Connected" : "Not Connected"}
                  </span>
                  <button
                    onClick={() => setStripeConnected(!stripeConnected)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      stripeConnected
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`}
                  >
                    {stripeConnected ? "Disconnect" : "Connect"}
                  </button>
                </div>
                {stripeConnected && (
                  <div className="mt-4 space-y-2">
                    <input
                      type="text"
                      placeholder="Stripe API Key"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Webhook Secret"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500">
                      ExcluSuive event mapping will be configured.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Web3 Integrations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Web3 Integrations
            </h3>
            <div className="space-y-4">
              {/* ExcluSuive Event Listener */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                      E
                    </div>
                    <h4 className="font-semibold text-gray-900">
                      ExcluSuive Event Listener
                    </h4>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Always On
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Automatically execute membership logic by listening to
                  on-chain Web3 payment events.
                </p>
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors">
                  Manage Rules
                </button>
              </div>

              {/* Custom Web3 Listener */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                    +
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Custom Web3 Listener
                  </h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  You can also connect other smart contract events.
                </p>
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                  Add Listener
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "billing" && (
        <div className="space-y-6">
          {/* Current Plan Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Current Plan
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentPlan === "Free"
                      ? "bg-gray-100 text-gray-800"
                      : currentPlan === "Starter"
                      ? "bg-blue-100 text-blue-800"
                      : currentPlan === "Pro"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {currentPlan}
                </span>
                <div>
                  <p className="text-sm text-gray-600">
                    Currently using {currentPlan} plan.
                  </p>
                  <p className="text-xs text-gray-500">
                    Monthly payment • Next payment date: February 15, 2024
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Change Payment Method
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>

          {/* Plan Features Table */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Plan Features
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Features
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">
                      Free
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">
                      Starter
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">
                      Pro
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Web2 Payments Integration
                    </td>
                    <td className="text-center py-3 px-4">1</td>
                    <td className="text-center py-3 px-4">✅ Unlimited</td>
                    <td className="text-center py-3 px-4">✅ Unlimited</td>
                    <td className="text-center py-3 px-4">✅ Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Web3 Listener
                    </td>
                    <td className="text-center py-3 px-4">✅ Basic Included</td>
                    <td className="text-center py-3 px-4">✅ Basic + 1</td>
                    <td className="text-center py-3 px-4">✅ Basic + 5</td>
                    <td className="text-center py-3 px-4">✅ Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Number of Membership Types
                    </td>
                    <td className="text-center py-3 px-4">1</td>
                    <td className="text-center py-3 px-4">3</td>
                    <td className="text-center py-3 px-4">10</td>
                    <td className="text-center py-3 px-4">✅ Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Number of Reward Marketplace Items
                    </td>
                    <td className="text-center py-3 px-4">10</td>
                    <td className="text-center py-3 px-4">50</td>
                    <td className="text-center py-3 px-4">200</td>
                    <td className="text-center py-3 px-4">✅ Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Dashboard Analytics
                    </td>
                    <td className="text-center py-3 px-4">Basic KPI</td>
                    <td className="text-center py-3 px-4">+Segment Analysis</td>
                    <td className="text-center py-3 px-4">
                      +Action Suggestions
                    </td>
                    <td className="text-center py-3 px-4">
                      Full Customization
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Webhook Call Volume
                    </td>
                    <td className="text-center py-3 px-4">1,000 calls/month</td>
                    <td className="text-center py-3 px-4">
                      10,000 calls/month
                    </td>
                    <td className="text-center py-3 px-4">
                      100,000 calls/month
                    </td>
                    <td className="text-center py-3 px-4">Custom SLA</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Support
                    </td>
                    <td className="text-center py-3 px-4">Email</td>
                    <td className="text-center py-3 px-4">Email + Slack</td>
                    <td className="text-center py-3 px-4">Dedicated Manager</td>
                    <td className="text-center py-3 px-4">
                      Dedicated Manager + SLA
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Upgrade Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upgrade to Pro Plan
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                You can use more Web3 Listeners and extended Analytics.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
