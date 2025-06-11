
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Server, Activity, Database, Zap } from 'lucide-react'
import { ServiceStatus } from '@/pages/LiveMonitoring'

interface ServiceStatusGridProps {
  services: ServiceStatus[]
}

export function ServiceStatusGrid({ services }: ServiceStatusGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Healthy</Badge>
      case 'warning': return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Warning</Badge>
      case 'error': return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Error</Badge>
      default: return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getServiceIcon = (name: string) => {
    if (name.includes('Database')) return Database
    if (name.includes('Cache')) return Zap
    if (name.includes('ML')) return Activity
    return Server
  }

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg flex items-center gap-2">
          <Server className="w-5 h-5" />
          Service Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-6 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((service) => {
              const IconComponent = getServiceIcon(service.name)
              
              return (
                <div
                  key={service.id}
                  className="p-3 rounded-lg border border-border/30 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
                    <IconComponent className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{service.name}</span>
                  </div>
                  
                  <div className="space-y-1 mb-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Latency:</span>
                      <span className="font-medium">{service.latency}ms</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Throughput:</span>
                      <span className="font-medium">{service.throughput}/s</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Uptime:</span>
                      <span className="font-medium">{service.uptime}%</span>
                    </div>
                  </div>
                  
                  {getStatusBadge(service.status)}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
