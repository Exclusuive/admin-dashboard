"use client";

import { useState } from "react";
import { KPICard } from "../../components/common/KPICard";

export function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Analytics Dashboard
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
              {period === "day" ? "일" : period === "week" ? "주" : "월"}
            </button>
          ))}
        </div>
      </div>

      {/* 핵심 KPI 하이라이트 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Web3 결제 비중"
          value="35%"
          subtitle="+12% MoM"
          color="blue"
          size="lg"
        />
        <KPICard
          title="Web3 재구매율"
          value="28%"
          subtitle="vs Web2 15%"
          color="purple"
          size="lg"
        />
        <KPICard
          title="리워드 활용률"
          value="72%"
          subtitle="+5% MoM"
          color="orange"
          size="lg"
        />
        <KPICard
          title="활성 멤버"
          value="12,340"
          subtitle="명"
          color="indigo"
          size="lg"
        />
      </div>

      {/* 매출/거래 지표 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          매출/거래 지표
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="총 결제 건수"
            value="8,456"
            color="blue"
            trend={{ value: "+15.3%", isPositive: true }}
          />
          <KPICard
            title="총 결제 금액"
            value="₩127.8M"
            color="green"
            trend={{ value: "+22.1%", isPositive: true }}
          />
          <KPICard
            title="평균 결제 금액"
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
            결제 수단 비율
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
            리워드 지표
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">총 적립 포인트</span>
              <span className="font-semibold">2,456,780 P</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">총 사용 포인트</span>
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
                <span>사용됨</span>
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
            멤버십 티어 분포
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
                    {item.count.toLocaleString()}명
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
          고객 리텐션/행동 지표
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="재구매율"
            value="23.5%"
            color="blue"
            trend={{ value: "+3.2%", isPositive: true }}
          />
          <KPICard
            title="Web3 재방문율"
            value="28%"
            subtitle="vs Web2 15%"
            color="green"
          />
          <KPICard
            title="평균 LTV"
            value="₩89,500"
            color="purple"
            trend={{ value: "+12.8%", isPositive: true }}
          />
          <KPICard
            title="신규 전환율"
            value="67%"
            color="orange"
            trend={{ value: "+8.5%", isPositive: true }}
          />
        </div>
      </div>

      {/* Actionable Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          전략 인사이트
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Web3 전환 기회
                </h4>
                <p className="text-blue-800 text-sm">
                  Web3 결제 고객의 재방문율이 Web2보다 1.8배 높습니다. Web2 고객
                  대상 Web3 전환 보너스 캠페인을 실행하세요.
                </p>
              </div>
              <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                캠페인 생성
              </button>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-orange-900 mb-2">
                  리워드 활용 증대
                </h4>
                <p className="text-orange-800 text-sm">
                  30일 내 적립된 포인트 중 35%가 아직 미사용 상태입니다. 소멸 전
                  리마인드 알림을 발송하세요.
                </p>
              </div>
              <button className="ml-4 bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                알림 발송
              </button>
            </div>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-green-900 mb-2">
                  주문금액 증대
                </h4>
                <p className="text-green-800 text-sm">
                  평균 주문금액 ₩15,120 → 1만 원 이상 주문 시 스탬프 2배 지급
                  프로모션 추천
                </p>
              </div>
              <button className="ml-4 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                프로모션 생성
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 상품/마켓 지표 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          상품/마켓 지표
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">
              인기 교환 상품 TOP 5
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
                      <span className="text-gray-500">{item.exchanges}회</span>
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
              교환 전환율
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">조회 → 교환 완료</span>
                <span className="font-semibold text-green-600">12.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">재고 소진 속도</span>
                <span className="font-semibold text-blue-600">평균 3.2일</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">품절 알림 대상</span>
                <span className="font-semibold text-orange-600">23개 상품</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 세그먼트 분석 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          세그먼트 분석
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="High Spenders"
            value="1,234"
            subtitle="상위 10%"
            description="매출 기여도 45%"
            color="blue"
          />
          <KPICard
            title="Dormant Users"
            value="3,456"
            subtitle="30일+ 미방문"
            description="재활성화 대상"
            color="red"
          />
          <KPICard
            title="Web3 Shifters"
            value="2,890"
            subtitle="Web2→Web3"
            description="전환율 23%"
            color="green"
          />
          <KPICard
            title="신규 가입자"
            value="567"
            subtitle="이번 주"
            description="전환율 67%"
            color="purple"
          />
        </div>
      </div>
    </div>
  );
}
