
import React, { useState, useEffect } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { LiveMonitoringHeader } from '@/components/LiveMonitoringHeader'
import { RealTimeMetrics } from '@/components/RealTimeMetrics'
import { LiveActivityFeed } from '@/components/LiveActivityFeed'
import { ServiceStatusGrid } from '@/components/ServiceStatusGrid'
import { GeographicActivityMap } from '@/components/GeographicActivityMap'

export interface LiveActivity {
  id: string
  type: 'conversation_start' | 'conversation_end'
  tenant: string
  botName: string
  duration?: number
  status: 'positive' | 'neutral' | 'negative'
  timestamp: string
  location?: {
    country: string
    city: string
    lat: number
    lng: number
  }
}

export interface ServiceStatus {
  id: string
  name: string
  status: 'healthy' | 'warning' | 'error'
  latency: number
  throughput: number
  uptime: number
}

export interface RealTimeMetric {
  messagesPerSecond: number
  activeConversations: number
  avgResponseTime: number
  errorRate: number
}

const mockServices: ServiceStatus[] = [
  {
    id: '1',
    name: 'API Gateway',
    status: 'healthy',
    latency: 45,
    throughput: 1240,
    uptime: 99.9
  },
  {
    id: '2',
    name: 'ML Services',
    status: 'warning',
    latency: 120,
    throughput: 890,
    uptime: 98.5
  },
  {
    id: '3',
    name: 'Database',
    status: 'healthy',
    latency: 12,
    throughput: 2100,
    uptime: 99.95
  },
  {
    id: '4',
    name: 'Cache',
    status: 'healthy',
    latency: 8,
    throughput: 3400,
    uptime: 99.8
  },
  {
    id: '5',
    name: 'Message Queue',
    status: 'error',
    latency: 250,
    throughput: 120,
    uptime: 95.2
  },
  {
    id: '6',
    name: 'Analytics',
    status: 'healthy',
    latency: 35,
    throughput: 560,
    uptime: 99.7
  }
]

export default function LiveMonitoring() {
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(5)
  const [timeZone, setTimeZone] = useState('UTC')
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [activities, setActivities] = useState<LiveActivity[]>([])
  const [metrics, setMetrics] = useState<RealTimeMetric>({
    messagesPerSecond: 45.2,
    activeConversations: 1247,
    avgResponseTime: 0.89,
    errorRate: 2.1
  })

  // Simulate real-time data updates
  useEffect(() => {
    if (!isAutoRefresh) return

    const interval = setInterval(() => {
      // Update metrics
      setMetrics(prev => ({
        messagesPerSecond: Math.max(0, prev.messagesPerSecond + (Math.random() - 0.5) * 10),
        activeConversations: Math.max(0, prev.activeConversations + Math.floor((Math.random() - 0.5) * 20)),
        avgResponseTime: Math.max(0.1, prev.avgResponseTime + (Math.random() - 0.5) * 0.2),
        errorRate: Math.max(0, Math.min(10, prev.errorRate + (Math.random() - 0.5) * 1))
      }))

      // Add new activity
      const newActivity: LiveActivity = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'conversation_start' : 'conversation_end',
        tenant: ['TechCorp', 'RetailPlus', 'ServiceCorp', 'Corporate Inc'][Math.floor(Math.random() * 4)],
        botName: ['Customer Support Bot', 'Sales Assistant', 'FAQ Bot', 'HR Helper'][Math.floor(Math.random() * 4)],
        duration: Math.random() > 0.5 ? Math.floor(Math.random() * 600) : undefined,
        status: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as any,
        timestamp: new Date().toISOString(),
        location: {
          country: ['USA', 'UK', 'Germany', 'Japan', 'Australia'][Math.floor(Math.random() * 5)],
          city: ['New York', 'London', 'Berlin', 'Tokyo', 'Sydney'][Math.floor(Math.random() * 5)],
          lat: Math.random() * 180 - 90,
          lng: Math.random() * 360 - 180
        }
      }

      setActivities(prev => [newActivity, ...prev.slice(0, 49)]) // Keep last 50 activities
    }, refreshInterval * 1000)

    return () => clearInterval(interval)
  }, [isAutoRefresh, refreshInterval])

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full ${isFullScreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
        {!isFullScreen && <AppSidebar />}
        <SidebarInset className="flex-1">
          <div className="flex flex-col h-full">
            <LiveMonitoringHeader
              isAutoRefresh={isAutoRefresh}
              onAutoRefreshChange={setIsAutoRefresh}
              refreshInterval={refreshInterval}
              onRefreshIntervalChange={setRefreshInterval}
              timeZone={timeZone}
              onTimeZoneChange={setTimeZone}
              isFullScreen={isFullScreen}
              onFullScreenChange={setIsFullScreen}
            />
            
            <div className="flex-1 p-6 space-y-6 overflow-auto">
              <RealTimeMetrics metrics={metrics} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LiveActivityFeed activities={activities} />
                <ServiceStatusGrid services={mockServices} />
              </div>
              
              <GeographicActivityMap activities={activities} />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
