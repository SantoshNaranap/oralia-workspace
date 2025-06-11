
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, Clock, MapPin } from 'lucide-react'
import { LiveActivity } from '@/pages/LiveMonitoring'

interface LiveActivityFeedProps {
  activities: LiveActivity[]
}

export function LiveActivityFeed({ activities }: LiveActivityFeedProps) {
  const getSentimentColor = (status: string) => {
    switch (status) {
      case 'positive': return 'bg-green-500'
      case 'negative': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getActivityIcon = (type: string) => {
    return type === 'conversation_start' ? '🟢' : '🔴'
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Live Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80 px-6">
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer border border-border/30"
              >
                <div className="text-lg">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {activity.tenant}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-sm text-muted-foreground">
                      {activity.botName}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(activity.timestamp).toLocaleTimeString()}
                    {activity.duration && (
                      <>
                        <span>•</span>
                        <span>{formatDuration(activity.duration)}</span>
                      </>
                    )}
                    {activity.location && (
                      <>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span>{activity.location.city}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className={`w-2 h-2 rounded-full ${getSentimentColor(activity.status)}`} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
