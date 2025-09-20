"use client";

import { useState } from "react";
import { KPICard } from "../../../components/common/KPICard";

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Analytics Dashboard (Example)
        </h2>
        <div className="flex space-x-2">
          {["day", "week", "month"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                selectedPeriod === period
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {period === "day" ? "Day" : period === "week" ? "Week" : "Month"}
            </button>
          ))}
        </div>
      </div>

      {/* 핵심 KPI 하이라이트 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Web3 Payment Share"
          value="35%"
          subtitle="+12% MoM"
          color="blue"
          size="lg"
        />
        <KPICard
          title="Web3 Repeat Purchase Rate"
          value="28%"
          subtitle="vs Web2 15%"
          color="purple"
          size="lg"
        />
        <KPICard
          title="Reward Utilization Rate"
          value="72%"
          subtitle="+5% MoM"
          color="orange"
          size="lg"
        />
        <KPICard
          title="Active Members"
          value="12,340"
          subtitle="members"
          color="indigo"
          size="lg"
        />
      </div>

      {/* 매출/거래 지표 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Sales/Transaction Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Transactions"
            value="8,456"
            color="blue"
            trend={{ value: "+15.3%", isPositive: true }}
          />
          <KPICard
            title="Total Payment Amount"
            value="₩127.8M"
            color="green"
            trend={{ value: "+22.1%", isPositive: true }}
          />
          <KPICard
            title="Average Payment Amount"
            value="₩15,120"
            color="purple"
            trend={{ value: "+5.8%", isPositive: true }}
          />
          <KPICard
            title="Web3 Adoption Rate"
            value="35%"
            color="orange"
            trend={{ value: "+12%", isPositive: true }}
          />
        </div>

        {/* 결제 수단 비율 */}
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-700 mb-4">
            Payment Method Ratio
          </h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Web3: 35%</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Web2: 65%</span>
            </div>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: "35%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* 리워드/멤버십 지표 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Reward Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Earned Points</span>
              <span className="font-semibold">2,456,780 P</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Total Redeemed Points
              </span>
              <span className="font-semibold">1,768,890 P</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Reward Utilization Rate
              </span>
              <span className="font-semibold text-green-600">72%</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Used</span>
                <span>72%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "72%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Membership Tier Distribution
          </h3>
          <div className="space-y-3">
            {[
              {
                tier: "Gold",
                count: 1234,
                percentage: 10,
                color: "bg-yellow-500",
              },
              {
                tier: "Silver",
                count: 3702,
                percentage: 30,
                color: "bg-gray-400",
              },
              {
                tier: "Bronze",
                count: 7404,
                percentage: 60,
                color: "bg-orange-600",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 ${item.color} rounded-full mr-2`}
                  ></div>
                  <span className="text-sm text-gray-700">{item.tier}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {item.count.toLocaleString()} members
                  </span>
                  <span className="text-sm font-medium">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 고객 리텐션/행동 지표 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Customer Retention/Behavior Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Repeat Purchase Rate"
            value="23.5%"
            color="blue"
            trend={{ value: "+3.2%", isPositive: true }}
          />
          <KPICard
            title="Web3 Return Rate"
            value="28%"
            subtitle="vs Web2 15%"
            color="green"
          />
          <KPICard
            title="Average LTV"
            value="₩89,500"
            color="purple"
            trend={{ value: "+12.8%", isPositive: true }}
          />
          <KPICard
            title="New Conversion Rate"
            value="67%"
            color="orange"
            trend={{ value: "+8.5%", isPositive: true }}
          />
        </div>
      </div>

      {/* Actionable Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Strategic Insights
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Web3 Conversion Opportunity
                </h4>
                <p className="text-blue-800 text-sm">
                  Web3 payment customers return 1.8x more than Web2. Run a Web3
                  conversion bonus campaign targeting Web2 customers.
                </p>
              </div>
              <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Create Campaign
              </button>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-orange-900 mb-2">
                  Increase Reward Utilization
                </h4>
                <p className="text-orange-800 text-sm">
                  35% of points earned in the last 30 days remain unused. Send a
                  reminder before expiration.
                </p>
              </div>
              <button className="ml-4 bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                Send Notification
              </button>
            </div>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-green-900 mb-2">
                  Increase Order Value
                </h4>
                <p className="text-green-800 text-sm">
                  Average order value ₩15,120 → Recommend a promotion: double
                  stamps for orders over ₩10,000.
                </p>
              </div>
              <button className="ml-4 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                Create Promotion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 상품/마켓 지표 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Product/Market Metrics
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">
              Top 5 Redeemed Items
            </h4>
            <div className="space-y-3">
              {[
                { name: "스타벅스 아메리카노", exchanges: 1234, rate: 15.2 },
                { name: "CGV 영화관람권", exchanges: 987, rate: 12.1 },
                { name: "배달의민족 쿠폰", exchanges: 756, rate: 9.3 },
                { name: "네이버페이 포인트", exchanges: 654, rate: 8.1 },
                { name: "올리브영 상품권", exchanges: 543, rate: 6.7 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-gray-500">
                        {item.exchanges} times
                      </span>
                    </div>
                    <div className="mt-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.rate * 5}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">
              Redemption Conversion
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Views → Redemptions
                </span>
                <span className="font-semibold text-green-600">12.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Inventory Depletion Speed
                </span>
                <span className="font-semibold text-blue-600">
                  Avg. 3.2 days
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Low-stock Alerts</span>
                <span className="font-semibold text-orange-600">23 items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 세그먼트 분석 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Segment Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="High Spenders"
            value="1,234"
            subtitle="Top 10%"
            description="45% of revenue"
            color="blue"
          />
          <KPICard
            title="Dormant Users"
            value="3,456"
            subtitle="No visit in 30+ days"
            description="Reactivation target"
            color="red"
          />
          <KPICard
            title="Web3 Shifters"
            value="2,890"
            subtitle="Web2→Web3"
            description="Conversion rate 23%"
            color="green"
          />
          <KPICard
            title="New Signups"
            value="567"
            subtitle="This week"
            description="Conversion rate 67%"
            color="purple"
          />
        </div>
      </div>
    </div>
  );
}
