
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bot } from '@/pages/BotMonitoring'
import { Activity, Clock, MessageSquare, Target } from 'lucide-react'

interface BotPerformanceGridProps {
  bots: Bot[]
  onBotSelect: (bot: Bot) => void
}

export function BotPerformanceGrid({ bots, onBotSelect }: BotPerformanceGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-gray-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'inactive': return 'secondary'
      case 'error': return 'destructive'
      default: return 'secondary'
    }
  }

  const MiniSparkline = ({ data }: { data: number[] }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min
    
    return (
      <div className="flex items-end gap-0.5 h-8 w-16">
        {data.map((value, index) => {
          const height = range > 0 ? ((value - min) / range) * 100 : 50
          return (
            <div
              key={index}
              className="bg-primary/60 w-1.5 rounded-sm"
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {bots.map((bot) => (
        <Card
          key={bot.id}
          className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/50"
          onClick={() => onBotSelect(bot)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-sm line-clamp-1">{bot.name}</h3>
                <p className="text-xs text-muted-foreground">{bot.tenant}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(bot.status)}`} />
                <Badge variant={getStatusVariant(bot.status)} className="text-xs">
                  {bot.status}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs font-medium">{bot.messageCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs font-medium">{bot.accuracy}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs font-medium">{bot.responseTime}s</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-muted-foreground" />
                <MiniSparkline data={bot.recentActivity} />
              </div>
            </div>
            
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Last active: {bot.lastActive}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
