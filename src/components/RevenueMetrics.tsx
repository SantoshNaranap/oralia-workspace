
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Users, Target } from 'lucide-react'

export function RevenueMetrics() {
  const metrics = [
    {
      title: 'Monthly Recurring Revenue',
      value: '$124,500',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      period: 'vs last month'
    },
    {
      title: 'Annual Recurring Revenue',
      value: '$1.49M',
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      period: 'projected'
    },
    {
      title: 'Customer Lifetime Value',
      value: '$4,250',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: Target,
      period: 'vs last quarter'
    },
    {
      title: 'Average Revenue Per Tenant',
      value: '$890',
      change: '+5.8%',
      changeType: 'positive' as const,
      icon: Users,
      period: 'vs last month'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <metric.icon className="w-5 h-5 text-primary" />
              <div className={`flex items-center gap-1 text-xs font-medium ${
                metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.changeType === 'positive' ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {metric.change}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{metric.period}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
