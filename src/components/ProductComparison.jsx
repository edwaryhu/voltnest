import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, DollarSign, Zap, TrendingDown, Leaf, Sun } from 'lucide-react'

export default function ProductComparison() {
  // Calculator inputs
  const [monthlyBill, setMonthlyBill] = useState(150)
  const [peakRate, setPeakRate] = useState(0.35)
  const [offPeakRate, setOffPeakRate] = useState(0.12)
  const [dailyUsage, setDailyUsage] = useState(30)
  const [hasSolar, setHasSolar] = useState(false)

  // Calculate savings
  const savings = useMemo(() => {
    const shiftableUsage = dailyUsage * 0.6
    const dailySavings = shiftableUsage * (peakRate - offPeakRate)
    const monthlySavings = dailySavings * 30
    const solarBonus = hasSolar ? monthlySavings * 0.2 : 0
    const totalMonthlySavings = monthlySavings + solarBonus
    const yearlySavings = totalMonthlySavings * 12
    const tenYearSavings = yearlySavings * 10
    const batteryCost = 1500
    const paybackMonths = Math.ceil(batteryCost / totalMonthlySavings)
    const yearlyKwhSaved = shiftableUsage * 365 * 0.3
    const co2Reduction = yearlyKwhSaved * 0.4

    return {
      monthly: totalMonthlySavings,
      yearly: yearlySavings,
      tenYear: tenYearSavings,
      paybackMonths,
      co2Reduction,
      percentSaved: ((totalMonthlySavings / monthlyBill) * 100).toFixed(0)
    }
  }, [monthlyBill, peakRate, offPeakRate, dailyUsage, hasSolar])

  return (
    <section className="section-padding bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-sm font-mono text-sunset-500 tracking-wider mb-4">
            <Calculator size={16} />
            SAVINGS CALCULATOR
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See How Much You Can <span className="text-gradient">Save</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Battery storage lets you charge during off-peak hours and use power when rates are highest.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
          >
            <h3 className="font-display text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="text-sunset-500" size={20} />
              Your Energy Profile
            </h3>

            <div className="space-y-6">
              {/* Monthly Bill */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-600 text-sm">Monthly Electricity Bill</label>
                  <span className="text-sunset-500 font-bold">${monthlyBill}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$50</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Peak Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-600 text-sm">Peak Rate (per kWh)</label>
                  <span className="text-sunset-500 font-bold">${peakRate.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.15"
                  max="0.60"
                  step="0.01"
                  value={peakRate}
                  onChange={(e) => setPeakRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$0.15</span>
                  <span>$0.60</span>
                </div>
              </div>

              {/* Off-Peak Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-600 text-sm">Off-Peak Rate (per kWh)</label>
                  <span className="text-sunset-500 font-bold">${offPeakRate.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.25"
                  step="0.01"
                  value={offPeakRate}
                  onChange={(e) => setOffPeakRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$0.05</span>
                  <span>$0.25</span>
                </div>
              </div>

              {/* Daily Usage */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-gray-600 text-sm">Daily Usage (kWh)</label>
                  <span className="text-sunset-500 font-bold">{dailyUsage} kWh</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={dailyUsage}
                  onChange={(e) => setDailyUsage(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>10 kWh</span>
                  <span>100 kWh</span>
                </div>
              </div>

              {/* Solar Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Sun className="text-yellow-500" size={20} />
                  <div>
                    <p className="text-gray-700 font-medium">Do you have solar panels?</p>
                    <p className="text-gray-400 text-sm">Additional savings with solar</p>
                  </div>
                </div>
                <button
                  onClick={() => setHasSolar(!hasSolar)}
                  className={`w-14 h-8 rounded-full transition-all cursor-pointer ${
                    hasSolar ? 'bg-sunset-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow transition-transform ${
                      hasSolar ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Main Savings Card */}
            <div className="bg-gradient-to-br from-sunset-50 to-orange-50 rounded-3xl p-8 border border-sunset-100">
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm mb-2">Your Estimated Annual Savings</p>
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="text-sunset-500" size={32} />
                  <span className="text-6xl font-display font-bold text-gray-900">
                    {savings.yearly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <p className="text-sunset-600 font-medium mt-2">
                  {savings.percentSaved}% reduction in electricity costs
                </p>
              </div>

              {/* Savings Breakdown */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-sunset-200/50">
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-gray-900">
                    ${savings.monthly.toFixed(0)}
                  </p>
                  <p className="text-gray-500 text-sm">Monthly</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-gray-900">
                    ${savings.yearly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-gray-500 text-sm">Yearly</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-display font-bold text-sunset-500">
                    ${savings.tenYear.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-gray-500 text-sm">10 Years</p>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <TrendingDown className="text-green-600" size={20} />
                  </div>
                  <p className="text-gray-500 text-sm">Payback Period</p>
                </div>
                <p className="text-3xl font-display font-bold text-gray-900">
                  {savings.paybackMonths}
                  <span className="text-lg text-gray-400 ml-1">months</span>
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Leaf className="text-emerald-600" size={20} />
                  </div>
                  <p className="text-gray-500 text-sm">CO₂ Reduced/Year</p>
                </div>
                <p className="text-3xl font-display font-bold text-gray-900">
                  {savings.co2Reduction.toFixed(0)}
                  <span className="text-lg text-gray-400 ml-1">kg</span>
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4">How Battery Storage Saves You Money</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sunset-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sunset-600 text-xs font-bold">1</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    <span className="text-gray-700">Charge during off-peak hours</span> when electricity rates are lowest
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sunset-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sunset-600 text-xs font-bold">2</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    <span className="text-gray-700">Use stored power during peak hours</span> when rates are 2-3x higher
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sunset-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sunset-600 text-xs font-bold">3</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    <span className="text-gray-700">Add solar panels</span> to charge for free and maximize savings
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer">
              <Zap size={18} />
              Find Your Perfect Battery
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
