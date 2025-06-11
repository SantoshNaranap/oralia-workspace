
import { ChartCard } from "@/components/ChartCard"
import { AlertTriangle, Info, AlertCircle } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "High CPU usage detected on server cluster-03",
    timestamp: "2 minutes ago",
    icon: AlertTriangle,
    color: "text-yellow-400"
  },
  {
    id: 2,
    type: "info",
    message: "System maintenance scheduled for tonight at 2 AM",
    timestamp: "1 hour ago",
    icon: Info,
    color: "text-blue-400"
  },
  {
    id: 3,
    type: "critical",
    message: "Database connection timeout in region us-east-1",
    timestamp: "3 hours ago",
    icon: AlertCircle,
    color: "text-red-400"
  },
  {
    id: 4,
    type: "info",
    message: "New tenant onboarded: Future Tech Solutions",
    timestamp: "5 hours ago",
    icon: Info,
    color: "text-green-400"
  },
]

export function AlertsFeed() {
  return (
    <ChartCard title="Recent Alerts">
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
            <alert.icon className={`w-4 h-4 mt-0.5 ${alert.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{alert.message}</p>
              <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
