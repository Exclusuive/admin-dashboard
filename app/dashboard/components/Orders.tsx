"use client";

export function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Export Orders
        </button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Processing</h3>
          <p className="text-2xl font-bold text-blue-600">23</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Error</h3>
          <p className="text-2xl font-bold text-red-600">5</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-600">487</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                주문 번호
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                고객
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                금액
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                결제 수단
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                주문 시간
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                멤버십
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              {
                id: "ORD-2025-01-001234",
                customer: {
                  wallet: "0x8a2b3c4d5e6f7890abcdef1234567890abcdef12",
                  email: "sangjun@example.com",
                },
                amount: { value: 18900, currency: "KRW" },
                paymentMethod: "Card (VISA)",
                status: "Processing",
                orderTime: "2025-01-11 13:45 KST",
                membershipStatus: "적립하기",
              },
              {
                id: "ORD-2025-01-001235",
                customer: {
                  wallet: "0x9b3c4d5e6f7890abcdef1234567890abcdef1234",
                  email: "customer2@example.com",
                },
                amount: { value: 12.5, currency: "USDC" },
                paymentMethod: "Web3(USDC/Sui)",
                status: "Error",
                orderTime: "2025-01-11 14:20 KST",
                membershipStatus: null,
              },
              {
                id: "ORD-2025-01-001236",
                customer: {
                  wallet: "0xac4d5e6f7890abcdef1234567890abcdef123456",
                  email: "customer3@example.com",
                },
                amount: { value: 25000, currency: "KRW" },
                paymentMethod: "Card (Mastercard)",
                status: "Completed",
                orderTime: "2025-01-11 15:10 KST",
                membershipStatus: "적립 완료",
              },
              {
                id: "ORD-2025-01-001237",
                customer: {
                  wallet: "0xbd5e6f7890abcdef1234567890abcdef12345678",
                  email: "customer4@example.com",
                },
                amount: { value: 8.75, currency: "USDC" },
                paymentMethod: "Web3(USDC/Sui)",
                status: "Completed",
                orderTime: "2025-01-11 16:30 KST",
                membershipStatus: null,
              },
              {
                id: "ORD-2025-01-001238",
                customer: {
                  wallet: "0xce6f7890abcdef1234567890abcdef1234567890",
                  email: "customer5@example.com",
                },
                amount: { value: 35000, currency: "KRW" },
                paymentMethod: "Card (VISA)",
                status: "Processing",
                orderTime: "2025-01-11 17:15 KST",
                membershipStatus: "적립하기",
              },
            ].map((order, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                  <div className="flex items-center gap-2">
                    <span className="cursor-pointer hover:text-blue-600">
                      {order.id}
                    </span>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => navigator.clipboard.writeText(order.id)}
                    >
                      📋
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="space-y-1">
                    <div className="font-mono text-xs cursor-pointer hover:text-blue-600">
                      {order.customer.wallet.slice(0, 6)}…
                      {order.customer.wallet.slice(-4)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {order.customer.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {order.amount.currency === "KRW"
                        ? `₩${order.amount.value.toLocaleString()}`
                        : `${order.amount.value} ${order.amount.currency}`}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.amount.currency === "KRW"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {order.amount.currency === "KRW"
                        ? "₩"
                        : order.amount.currency}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      order.paymentMethod.includes("Card")
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {order.paymentMethod}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "Processing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Error"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.orderTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {order.membershipStatus ? (
                    <button
                      className={`px-3 py-1 text-xs rounded-full ${
                        order.membershipStatus === "적립하기"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.membershipStatus}
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
