import React, { useState } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { BotMonitoringHeader } from '@/components/BotMonitoringHeader'
import { BotPerformanceGrid } from '@/components/BotPerformanceGrid'
import { BotDetailsModal } from '@/components/BotDetailsModal'

export interface Bot {
  id: string
  name: string
  tenant: string
  status: 'active' | 'inactive' | 'error'
  messageCount: number
  accuracy: number
  responseTime: number
  lastActive: string
  configuration: {
    model: string
    temperature: number
    maxTokens: number
  }
  metrics: {
    totalSessions: number
    avgSessionLength: number
    satisfactionScore: number
  }
  recentActivity: number[]
  errorLog: Array<{
    timestamp: string
    message: string
    severity: 'low' | 'medium' | 'high'
  }>
  knowledgeBase: {
    documentsCount: number
    lastUpdated: string
    size: string
  }
}

const mockBots: Bot[] = [
  {
    id: '1',
    name: 'Customer Support Bot',
    tenant: 'TechCorp',
    status: 'active',
    messageCount: 15420,
    accuracy: 94.2,
    responseTime: 0.8,
    lastActive: '2 minutes ago',
    configuration: {
      model: 'GPT-4',
      temperature: 0.7,
      maxTokens: 2048
    },
    metrics: {
      totalSessions: 3420,
      avgSessionLength: 4.5,
      satisfactionScore: 4.3
    },
    recentActivity: [120, 145, 160, 140, 180, 165, 190],
    errorLog: [
      {
        timestamp: '2024-06-11 14:30',
        message: 'Rate limit exceeded',
        severity: 'medium'
      }
    ],
    knowledgeBase: {
      documentsCount: 247,
      lastUpdated: '1 hour ago',
      size: '15.2 MB'
    }
  },
  {
    id: '2',
    name: 'Sales Assistant',
    tenant: 'RetailPlus',
    status: 'active',
    messageCount: 8930,
    accuracy: 89.7,
    responseTime: 1.2,
    lastActive: '5 minutes ago',
    configuration: {
      model: 'GPT-3.5',
      temperature: 0.9,
      maxTokens: 1024
    },
    metrics: {
      totalSessions: 1890,
      avgSessionLength: 6.2,
      satisfactionScore: 4.1
    },
    recentActivity: [80, 95, 110, 85, 120, 105, 130],
    errorLog: [],
    knowledgeBase: {
      documentsCount: 156,
      lastUpdated: '3 hours ago',
      size: '8.7 MB'
    }
  },
  {
    id: '3',
    name: 'FAQ Bot',
    tenant: 'ServiceCorp',
    status: 'error',
    messageCount: 2340,
    accuracy: 76.4,
    responseTime: 2.5,
    lastActive: '1 hour ago',
    configuration: {
      model: 'GPT-3.5',
      temperature: 0.3,
      maxTokens: 512
    },
    metrics: {
      totalSessions: 780,
      avgSessionLength: 3.1,
      satisfactionScore: 3.6
    },
    recentActivity: [20, 15, 10, 25, 30, 18, 12],
    errorLog: [
      {
        timestamp: '2024-06-11 13:45',
        message: 'Knowledge base connection failed',
        severity: 'high'
      },
      {
        timestamp: '2024-06-11 13:30',
        message: 'Response timeout',
        severity: 'medium'
      }
    ],
    knowledgeBase: {
      documentsCount: 89,
      lastUpdated: '2 days ago',
      size: '4.1 MB'
    }
  },
  {
    id: '4',
    name: 'HR Helper',
    tenant: 'Corporate Inc',
    status: 'inactive',
    messageCount: 1250,
    accuracy: 88.1,
    responseTime: 1.5,
    lastActive: '2 days ago',
    configuration: {
      model: 'GPT-4',
      temperature: 0.5,
      maxTokens: 1536
    },
    metrics: {
      totalSessions: 425,
      avgSessionLength: 5.8,
      satisfactionScore: 4.0
    },
    recentActivity: [0, 0, 0, 0, 0, 0, 0],
    errorLog: [],
    knowledgeBase: {
      documentsCount: 312,
      lastUpdated: '1 week ago',
      size: '22.4 MB'
    }
  }
]

export default function BotMonitoring() {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'error'>('all')

  const filteredBots = mockBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bot.tenant.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || bot.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="flex flex-col h-full">
            <BotMonitoringHeader
              totalBots={mockBots.length}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
            
            <div className="flex-1 p-6">
              <BotPerformanceGrid
                bots={filteredBots}
                onBotSelect={setSelectedBot}
              />
            </div>
          </div>
          
          <BotDetailsModal
            bot={selectedBot}
            open={!!selectedBot}
            onOpenChange={(open) => !open && setSelectedBot(null)}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
