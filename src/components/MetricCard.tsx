
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
      <CardHeader className="pb-1 sm:pb-3 p-2 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-3 w-full sm:w-auto">
            <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
              <Icon className="w-3 h-3 sm:w-5 sm:h-5 text-primary" />
            </div>
            <span className="text-[10px] sm:text-sm font-medium text-muted-foreground uppercase tracking-wide leading-tight">{title}</span>
          </div>
          <span className={`text-[10px] sm:text-sm font-semibold ${changeColor} flex-shrink-0`}>{change}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-2 sm:p-6">
        <div className="text-sm sm:text-3xl font-bold mb-0 sm:mb-2 text-foreground leading-tight">{value}</div>
        <div className="hidden sm:block">
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
