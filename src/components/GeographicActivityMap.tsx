
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Globe } from 'lucide-react'
import { LiveActivity } from '@/pages/LiveMonitoring'

interface GeographicActivityMapProps {
  activities: LiveActivity[]
}

export function GeographicActivityMap({ activities }: GeographicActivityMapProps) {
  // Group activities by country for regional stats
  const regionStats = activities
    .filter(activity => activity.location)
    .reduce((acc, activity) => {
      const country = activity.location!.country
      if (!acc[country]) {
        acc[country] = { count: 0, activities: [] }
      }
      acc[country].count++
      acc[country].activities.push(activity)
      return acc
    }, {} as Record<string, { count: number; activities: LiveActivity[] }>)

  const recentActivities = activities
    .filter(activity => activity.location)
    .slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Geographic Activity Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Simplified world map representation */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 h-64 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
              
              {/* Simulated activity dots */}
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Globe className="w-12 h-12 text-primary mx-auto animate-pulse" />
                  <p className="text-sm text-muted-foreground">
                    Live activity visualization
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    {Object.entries(regionStats).slice(0, 6).map(([country, stats]) => (
                      <div key={country} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span>{country}: {stats.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Regional activity list */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm mb-3">Recent Global Activity</h3>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-2 p-2 rounded border border-border/30 hover:bg-muted/30 transition-colors"
                >
                  <MapPin className="w-3 h-3 text-primary" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">
                      {activity.location?.city}, {activity.location?.country}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.tenant} • {new Date(activity.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    activity.status === 'positive' ? 'bg-green-500' :
                    activity.status === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                  }`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
