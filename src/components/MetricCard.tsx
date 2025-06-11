
import { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
  children?: ReactNode
}

export function MetricCard({ title, value, change, changeType, icon: Icon, children }: MetricCardProps) {
  const changeColor = {
    positive: "text-green-400",
    negative: "text-red-400",
    neutral: "text-yellow-400"
  }[changeType]

  return (
    <Card className="gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 group">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
          </div>
          <span className={`text-xs font-medium ${changeColor}`}>{change}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{value}</div>
        {children}
      </CardContent>
    </Card>
  )
}
