
import React from 'react'
import { X, RefreshCw, Trash2, Eye, MessageCircle, Settings, Database, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Bot } from '@/pages/BotMonitoring'

interface BotDetailsPanelProps {
  bot: Bot
  onClose: () => void
}

export function BotDetailsPanel({ bot, onClose }: BotDetailsPanelProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-gray-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="w-96 border-l border-border bg-card h-full overflow-y-auto">
      <div className="sticky top-0 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Bot Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Bot Overview */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(bot.status)}`} />
            <h3 className="font-medium">{bot.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Tenant: {bot.tenant}</p>
          <p className="text-xs text-muted-foreground">Last active: {bot.lastActive}</p>
        </div>

        {/* Configuration */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Model:</span>
              <span className="font-medium">{bot.configuration.model}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Temperature:</span>
              <span className="font-medium">{bot.configuration.temperature}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Max Tokens:</span>
              <span className="font-medium">{bot.configuration.maxTokens}</span>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Total Sessions:</span>
              <span className="font-medium">{bot.metrics.totalSessions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Avg Session Length:</span>
              <span className="font-medium">{bot.metrics.avgSessionLength} min</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Satisfaction Score:</span>
              <span className="font-medium">{bot.metrics.satisfactionScore}/5</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Accuracy:</span>
              <span className="font-medium">{bot.accuracy}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Response Time:</span>
              <span className="font-medium">{bot.responseTime}s</span>
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Base */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="w-4 h-4" />
              Knowledge Base
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Documents:</span>
              <span className="font-medium">{bot.knowledgeBase.documentsCount}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Size:</span>
              <span className="font-medium">{bot.knowledgeBase.size}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Last Updated:</span>
              <span className="font-medium">{bot.knowledgeBase.lastUpdated}</span>
            </div>
          </CardContent>
        </Card>

        {/* Error Log */}
        {bot.errorLog.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Recent Errors
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {bot.errorLog.map((error, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{error.timestamp}</span>
                    <Badge variant="outline" className={getSeverityColor(error.severity)}>
                      {error.severity}
                    </Badge>
                  </div>
                  <p className="text-xs">{error.message}</p>
                  {index < bot.errorLog.length - 1 && <Separator className="mt-2" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full justify-start" variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart Bot
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cache
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View Logs
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Tenant
          </Button>
        </div>
      </div>
    </div>
  )
}
