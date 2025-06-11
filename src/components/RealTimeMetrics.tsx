
import React from 'react'
import { MessageCircle, Users, Clock, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RealTimeMetric } from '@/pages/LiveMonitoring'

interface RealTimeMetricsProps {
  metrics: RealTimeMetric
}

export function RealTimeMetrics({ metrics }: RealTimeMetricsProps) {
  const getErrorRateColor = (rate: number) => {
    if (rate < 1) return 'text-green-500'
    if (rate < 5) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="gradient-card border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-blue-500" />
            Messages/Second
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">
            {metrics.messagesPerSecond.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">
            Real-time message rate
          </div>
        </CardContent>
      </Card>

      <Card className="gradient-card border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-green-500" />
            Active Conversations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">
            {metrics.activeConversations.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">
            Currently active
          </div>
        </CardContent>
      </Card>

      <Card className="gradient-card border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            Avg Response Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">
            {metrics.avgResponseTime.toFixed(2)}s
          </div>
          <Progress value={Math.min(100, (2 - metrics.avgResponseTime) * 50)} className="h-2" />
          <div className="text-xs text-muted-foreground mt-1">
            Target: &lt;1.5s
          </div>
        </CardContent>
      </Card>

      <Card className="gradient-card border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            Error Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold mb-2 ${getErrorRateColor(metrics.errorRate)}`}>
            {metrics.errorRate.toFixed(1)}%
          </div>
          <Progress value={metrics.errorRate * 10} className="h-2" />
          <div className="text-xs text-muted-foreground mt-1">
            Target: &lt;1%
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
