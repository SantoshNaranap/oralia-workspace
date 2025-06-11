
import React from 'react'
import { RefreshCw, Trash2, Eye, MessageCircle, Settings, Database, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Bot } from '@/pages/BotMonitoring'

interface BotDetailsModalProps {
  bot: Bot | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BotDetailsModal({ bot, open, onOpenChange }: BotDetailsModalProps) {
  if (!bot) return null

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(bot.status)}`} />
            {bot.name}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">Tenant: {bot.tenant}</p>
          <p className="text-xs text-muted-foreground">Last active: {bot.lastActive}</p>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {/* Knowledge Base */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Database className="w-4 h-4" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold">{bot.knowledgeBase.documentsCount}</div>
                <div className="text-xs text-muted-foreground">Documents</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{bot.knowledgeBase.size}</div>
                <div className="text-xs text-muted-foreground">Size</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{bot.knowledgeBase.lastUpdated}</div>
                <div className="text-xs text-muted-foreground">Last Updated</div>
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
          <div className="grid grid-cols-2 gap-2">
            <Button className="justify-start" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Restart Bot
            </Button>
            <Button className="justify-start" variant="outline">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cache
            </Button>
            <Button className="justify-start" variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              View Logs
            </Button>
            <Button className="justify-start" variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Tenant
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
