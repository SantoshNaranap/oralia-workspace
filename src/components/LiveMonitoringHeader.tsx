
import React from 'react'
import { Activity, RefreshCw, Clock, Globe, Maximize, Minimize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface LiveMonitoringHeaderProps {
  isAutoRefresh: boolean
  onAutoRefreshChange: (value: boolean) => void
  refreshInterval: number
  onRefreshIntervalChange: (value: number) => void
  timeZone: string
  onTimeZoneChange: (value: string) => void
  isFullScreen: boolean
  onFullScreenChange: (value: boolean) => void
}

export function LiveMonitoringHeader({
  isAutoRefresh,
  onAutoRefreshChange,
  refreshInterval,
  onRefreshIntervalChange,
  timeZone,
  onTimeZoneChange,
  isFullScreen,
  onFullScreenChange
}: LiveMonitoringHeaderProps) {
  return (
    <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Live Platform Monitor</h1>
            <div className="flex items-center gap-1 ml-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-500 font-medium">LIVE</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="auto-refresh"
              checked={isAutoRefresh}
              onCheckedChange={onAutoRefreshChange}
            />
            <Label htmlFor="auto-refresh" className="text-sm">Auto-refresh</Label>
          </div>
          
          <Select
            value={refreshInterval.toString()}
            onValueChange={(value) => onRefreshIntervalChange(parseInt(value))}
          >
            <SelectTrigger className="w-32">
              <Clock className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1s</SelectItem>
              <SelectItem value="5">5s</SelectItem>
              <SelectItem value="10">10s</SelectItem>
              <SelectItem value="30">30s</SelectItem>
              <SelectItem value="60">1m</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeZone} onValueChange={onTimeZoneChange}>
            <SelectTrigger className="w-32">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="PST">PST</SelectItem>
              <SelectItem value="EST">EST</SelectItem>
              <SelectItem value="GMT">GMT</SelectItem>
              <SelectItem value="JST">JST</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFullScreenChange(!isFullScreen)}
          >
            {isFullScreen ? (
              <Minimize className="w-4 h-4" />
            ) : (
              <Maximize className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
