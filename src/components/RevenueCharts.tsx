
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const mrrData = [
  { month: 'Jan', mrr: 98000 },
  { month: 'Feb', mrr: 102000 },
  { month: 'Mar', mrr: 108000 },
  { month: 'Apr', mrr: 115000 },
  { month: 'May', mrr: 118000 },
  { month: 'Jun', mrr: 124500 }
]

const planData = [
  { plan: 'Starter', revenue: 45000 },
  { plan: 'Professional', revenue: 68000 },
  { plan: 'Enterprise', revenue: 125000 }
]

const regionData = [
  { region: 'North America', revenue: 145000, color: '#3b82f6' },
  { region: 'Europe', revenue: 68000, color: '#10b981' },
  { region: 'Asia Pacific', revenue: 25000, color: '#f59e0b' }
]

const cohortData = Array.from({ length: 6 }, (_, month) => ({
  month: `M${month + 1}`,
  ...Array.from({ length: 6 }, (_, cohort) => ({
    [`C${cohort + 1}`]: Math.max(0, 100 - month * 8 - cohort * 3 + Math.random() * 10)
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
}))

const chartConfig = {
  mrr: { label: "MRR", color: "hsl(var(--primary))" },
  revenue: { label: "Revenue", color: "hsl(var(--primary))" }
}

export function RevenueCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>MRR Growth Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <LineChart data={mrrData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="mrr" 
                stroke="var(--color-mrr)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-mrr)" }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Plan Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <BarChart data={planData}>
              <XAxis dataKey="plan" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <PieChart>
              <Pie
                data={regionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ region, percent }) => `${region} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
              >
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cohort Retention Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 overflow-auto">
            <div className="grid grid-cols-7 gap-1 text-xs">
              <div className="font-medium">Cohort</div>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="font-medium text-center">M{i + 1}</div>
              ))}
              
              {cohortData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <div className="font-medium">C{rowIndex + 1}</div>
                  {Array.from({ length: 6 }, (_, colIndex) => {
                    const value = row[`C${colIndex + 1}`] as number
                    const intensity = value / 100
                    return (
                      <div
                        key={colIndex}
                        className="h-8 rounded flex items-center justify-center text-white text-xs"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${intensity})`
                        }}
                      >
                        {value.toFixed(0)}%
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
