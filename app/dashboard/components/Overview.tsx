export function Overview() {
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
          Web3 Payment & Membership Dashboard
        </h2>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Web3 Payment Share</h3>
          <p className="text-3xl font-bold">
            {transactionKPIs.web3AdoptionRate}%
          </p>
          <p className="text-sm opacity-90">301,230,000 payments</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Savings → Rewards</h3>
          <p className="text-3xl font-bold">
            {savingsRewardsKPIs.savingsToRewardsRatio}%
          </p>
          <p className="text-sm opacity-90">
            ₩{savingsRewardsKPIs.totalSavings.toLocaleString()} saved
          </p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Web3 Retention</h3>
          <p className="text-3xl font-bold">
            {retentionKPIs.web3RetentionRate}%
          </p>
          <p className="text-sm opacity-90">
            vs Web2 {retentionKPIs.web2RetentionRate}%
          </p>
        </div>
      </div>

      {/* Transaction KPIs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">💳</span>
          Transaction KPIs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Total Transactions
            </h4>
            <p className="text-2xl font-bold text-blue-600">
              {transactionKPIs.totalTransactions.thisMonth.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">This month</p>
            <p className="text-xs text-green-600 mt-1"></p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Web3 Adoption Rate
            </h4>
            <p className="text-2xl font-bold text-purple-600">
              {transactionKPIs.web3AdoptionRate}%
            </p>
            <p className="text-xs text-gray-500">
              vs Web2 {100 - transactionKPIs.web3AdoptionRate}%
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">GMV</h4>
            <p className="text-2xl font-bold text-green-600">
              ₩{(transactionKPIs.gmv / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-gray-500">Gross Merchandise Volume</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">AOV</h4>
            <p className="text-2xl font-bold text-orange-600">
              ₩{transactionKPIs.aov.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">Average Order Value</p>
          </div>
        </div>
      </div>

      {/* Savings & Rewards KPIs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">💰</span>
          Savings & Rewards KPIs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Total Savings
            </h4>
            <p className="text-2xl font-bold text-green-600">
              ₩{(savingsRewardsKPIs.totalSavings / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-gray-500">Card fees saved via Web3</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Rewards Distributed
            </h4>
            <p className="text-2xl font-bold text-blue-600">
              ₩
              {(savingsRewardsKPIs.totalRewardsDistributed / 1000000).toFixed(
                1
              )}
              M
            </p>
            <p className="text-xs text-gray-500">Points, USDC, NFTs</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Savings → Rewards Ratio
            </h4>
            <p className="text-2xl font-bold text-purple-600">
              {savingsRewardsKPIs.savingsToRewardsRatio}%
            </p>
            <p className="text-xs text-gray-500">
              Customer benefit return rate
            </p>
          </div>
        </div>
      </div>

      {/* Retention KPIs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">🔄</span>
          Customer Retention KPIs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigo-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Repeat Customer Rate
            </h4>
            <p className="text-2xl font-bold text-indigo-600">
              {retentionKPIs.repeatCustomerRate}%
            </p>
            <p className="text-xs text-gray-500">This month buyers</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">LTV</h4>
            <p className="text-2xl font-bold text-amber-600">
              ₩{retentionKPIs.ltv.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">Lifetime Value</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Web3 Retention
            </h4>
            <p className="text-2xl font-bold text-emerald-600">
              {retentionKPIs.web3RetentionRate}%
            </p>
            <p className="text-xs text-gray-500">Web3 customers</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Web2 Retention
            </h4>
            <p className="text-2xl font-bold text-gray-600">
              {retentionKPIs.web2RetentionRate}%
            </p>
            <p className="text-xs text-gray-500">Web2 customers</p>
          </div>
        </div>

        {/* Tier Distribution */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-600 mb-3">
            Membership Tier Distribution
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-amber-100 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-amber-800">
                {retentionKPIs.tierDistribution.bronze.toLocaleString()}
              </p>
              <p className="text-xs text-amber-700">Bronze</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-gray-800">
                {retentionKPIs.tierDistribution.silver.toLocaleString()}
              </p>
              <p className="text-xs text-gray-700">Silver</p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-yellow-800">
                {retentionKPIs.tierDistribution.gold.toLocaleString()}
              </p>
              <p className="text-xs text-yellow-700">Gold</p>
            </div>
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
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Active Campaigns
            </h4>
            <p className="text-2xl font-bold text-blue-600">
              {operationalKPIs.activeCampaigns}
            </p>
            <p className="text-xs text-gray-500">Membership campaigns</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Reward Failure Rate
            </h4>
            <p className="text-2xl font-bold text-red-600">
              {operationalKPIs.rewardFailureRate}%
            </p>
            <p className="text-xs text-gray-500">Failed reward distributions</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              Refund Rate
            </h4>
            <p className="text-2xl font-bold text-orange-600">
              {operationalKPIs.refundRate}%
            </p>
            <p className="text-xs text-gray-500">Transaction refunds</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">📊</span>
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span className="text-gray-700">
                Web3 payment completed - ₩45,000
              </span>
            </div>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">
                Rewards distributed - 1,250 USDC
              </span>
            </div>
            <span className="text-sm text-gray-500">5 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              <span className="text-gray-700">
                New Gold member - Customer #7890
              </span>
            </div>
            <span className="text-sm text-gray-500">10 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              <span className="text-gray-700">
                Campaign launched - &quot;Web3 +2% Rewards&quot;
              </span>
            </div>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
