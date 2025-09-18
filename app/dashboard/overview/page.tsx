"use client";

import {
  KPICard,
  TierCard,
  ActivityItem,
} from "../../../components/common/KPICard";

export default function OverviewPage() {
  // Mock data for Web3 payment and membership metrics
  const transactionKPIs = {
    totalTransactions: { today: 1247, thisMonth: 45678 },
    web3AdoptionRate: 35.2,
    gmv: 125000000,
    aov: 2734,
  };

  const savingsRewardsKPIs = {
    totalSavings: 4200000,
    totalRewardsDistributed: 3570000,
    savingsToRewardsRatio: 85.0,
  };

  const retentionKPIs = {
    repeatCustomerRate: 28.5,
    tierDistribution: { bronze: 1234, silver: 567, gold: 234 },
    ltv: 15600,
    web3RetentionRate: 28.0,
    web2RetentionRate: 15.0,
  };

  const operationalKPIs = {
    activeCampaigns: 8,
    rewardFailureRate: 0.3,
    refundRate: 2.1,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Web3 Payment & Membership Dashboard (Example)
        </h2>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Web3 Payment Share"
          value={`${transactionKPIs.web3AdoptionRate}%`}
          subtitle="301,230,000 payments"
          variant="gradient"
          color="blue"
          size="lg"
        />
        <KPICard
          title="Savings → Rewards"
          value={`${savingsRewardsKPIs.savingsToRewardsRatio}%`}
          subtitle={`₩${savingsRewardsKPIs.totalSavings.toLocaleString()} saved`}
          variant="gradient"
          color="green"
          size="lg"
        />
        <KPICard
          title="Web3 Retention"
          value={`${retentionKPIs.web3RetentionRate}%`}
          subtitle={`vs Web2 ${retentionKPIs.web2RetentionRate}%`}
          variant="gradient"
          color="orange"
          size="lg"
        />
      </div>

      {/* Transaction KPIs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">💳</span>
          Transaction KPIs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Transactions"
            value={transactionKPIs.totalTransactions.thisMonth}
            subtitle="This month"
            color="blue"
          />
          <KPICard
            title="Web3 Adoption Rate"
            value={`${transactionKPIs.web3AdoptionRate}%`}
            subtitle={`vs Web2 ${100 - transactionKPIs.web3AdoptionRate}%`}
            color="purple"
          />
          <KPICard
            title="GMV"
            value={`₩${(transactionKPIs.gmv / 1000000).toFixed(1)}M`}
            subtitle="Gross Merchandise Volume"
            color="green"
          />
          <KPICard
            title="AOV"
            value={`₩${transactionKPIs.aov.toLocaleString()}`}
            subtitle="Average Order Value"
            color="orange"
          />
        </div>
      </div>

      {/* Savings & Rewards KPIs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">💰</span>
          Savings & Rewards KPIs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard
            title="Total Savings"
            value={`₩${(savingsRewardsKPIs.totalSavings / 1000000).toFixed(
              1
            )}M`}
            subtitle="Card fees saved via Web3"
            color="green"
          />
          <KPICard
            title="Rewards Distributed"
            value={`₩${(
              savingsRewardsKPIs.totalRewardsDistributed / 1000000
            ).toFixed(1)}M`}
            subtitle="Points, USDC, NFTs"
            color="blue"
          />
          <KPICard
            title="Savings → Rewards Ratio"
            value={`${savingsRewardsKPIs.savingsToRewardsRatio}%`}
            subtitle="Customer benefit return rate"
            color="purple"
          />
        </div>
      </div>

      {/* Retention KPIs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">🔄</span>
          Customer Retention KPIs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Repeat Customer Rate"
            value={`${retentionKPIs.repeatCustomerRate}%`}
            subtitle="This month buyers"
            color="indigo"
          />
          <KPICard
            title="LTV"
            value={`₩${retentionKPIs.ltv.toLocaleString()}`}
            subtitle="Lifetime Value"
            color="amber"
          />
          <KPICard
            title="Web3 Retention"
            value={`${retentionKPIs.web3RetentionRate}%`}
            subtitle="Web3 customers"
            color="emerald"
          />
          <KPICard
            title="Web2 Retention"
            value={`${retentionKPIs.web2RetentionRate}%`}
            subtitle="Web2 customers"
            color="gray"
          />
        </div>

        {/* Tier Distribution */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            Membership Tier Distribution
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <TierCard
              tier="bronze"
              count={retentionKPIs.tierDistribution.bronze}
            />
            <TierCard
              tier="silver"
              count={retentionKPIs.tierDistribution.silver}
            />
            <TierCard tier="gold" count={retentionKPIs.tierDistribution.gold} />
          </div>
        </div>
      </div>

      {/* Operational KPIs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">⚙️</span>
          Operational KPIs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard
            title="Active Campaigns"
            value={operationalKPIs.activeCampaigns}
            subtitle="Membership campaigns"
            color="blue"
          />
          <KPICard
            title="Reward Failure Rate"
            value={`${operationalKPIs.rewardFailureRate}%`}
            subtitle="Failed reward distributions"
            color="red"
          />
          <KPICard
            title="Refund Rate"
            value={`${operationalKPIs.refundRate}%`}
            subtitle="Transaction refunds"
            color="orange"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">📊</span>
          Recent Activity
        </h3>
        <div className="space-y-3">
          <ActivityItem
            type="payment"
            message="Web3 payment completed - ₩45,000"
            timestamp="2 minutes ago"
          />
          <ActivityItem
            type="reward"
            message="Rewards distributed - 1,250 USDC"
            timestamp="5 minutes ago"
          />
          <ActivityItem
            type="membership"
            message="New Gold member - Customer #7890"
            timestamp="10 minutes ago"
          />
          <ActivityItem
            type="campaign"
            message='Campaign launched - "Web3 +2% Rewards"'
            timestamp="1 hour ago"
          />
        </div>
      </div>
    </div>
  );
}
