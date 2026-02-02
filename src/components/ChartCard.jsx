import { useState, useMemo } from 'react'

export const ChartCard = ({ title, value, label, trend, color = 'blue' }) => {
  const colorMap = {
    blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', bar: 'bg-gradient-to-r from-blue-400 to-blue-600' },
    green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', bar: 'bg-gradient-to-r from-green-400 to-green-600' },
    red: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', bar: 'bg-gradient-to-r from-red-400 to-red-600' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', bar: 'bg-gradient-to-r from-purple-400 to-purple-600' },
  }

  const colors = colorMap[color] || colorMap.blue
  const widthPercent = Math.min((value / 1000) * 100, 100)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
        </div>
        <div className={`${colors.bg} p-3 rounded-lg`}>
          <p className={`text-lg font-bold ${colors.text}`}>{value}</p>
        </div>
      </div>

      {/* Mini Progress Bar */}
      <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
        <div className={`h-full ${colors.bar} transition-all duration-500`} style={{ width: `${widthPercent}%` }} />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        {trend && (
          <span className={`font-semibold ${trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  )
}

export const BarChart = ({ title, data, color = 'blue' }) => {
  const colorMap = {
    blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
    green: 'bg-gradient-to-r from-green-400 to-green-600',
    red: 'bg-gradient-to-r from-red-400 to-red-600',
    purple: 'bg-gradient-to-r from-purple-400 to-purple-600',
  }

  const maxValue = Math.max(...data.map(d => d.value))
  const barColor = colorMap[color] || colorMap.blue

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</span>
            </div>
            <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${barColor} transition-all duration-500`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const LineChart = ({ title, data, color = 'blue' }) => {
  const colorMap = {
    blue: { dot: 'bg-blue-600', line: 'stroke-blue-600', area: 'fill-blue-100 dark:fill-blue-900/30' },
    green: { dot: 'bg-green-600', line: 'stroke-green-600', area: 'fill-green-100 dark:fill-green-900/30' },
    red: { dot: 'bg-red-600', line: 'stroke-red-600', area: 'fill-red-100 dark:fill-red-900/30' },
    purple: { dot: 'bg-purple-600', line: 'stroke-purple-600', area: 'fill-purple-100 dark:fill-purple-900/30' },
  }

  const colors = colorMap[color] || colorMap.blue
  const maxValue = Math.max(...data.map(d => d.value))
  const chartHeight = 200
  const padding = 40

  const points = data.map((item, idx) => {
    const x = (idx / (data.length - 1)) * (300 - padding)
    const y = chartHeight - ((item.value / maxValue) * (chartHeight - padding))
    return { x: x + padding / 2, y: y + padding / 2, ...item }
  })

  const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
      <svg viewBox="0 0 340 240" className="w-full h-auto">
        <path d={areaD} className={colors.area} />
        <path d={pathD} fill="none" className={`${colors.line} stroke-2`} strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, idx) => (
          <circle key={idx} cx={p.x} cy={p.y} r="4" className={`${colors.dot}`} />
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, idx) => (
          <div key={idx} className="text-xs">
            <p className="text-gray-600 dark:text-gray-400">{item.label}</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChartCard
