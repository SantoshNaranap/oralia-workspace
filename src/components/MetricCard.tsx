
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
    <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</span>
          </div>
          <span className={`text-sm font-semibold ${changeColor}`}>{change}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold mb-2 text-foreground">{value}</div>
        {children}
      </CardContent>
    </Card>
  )
}
