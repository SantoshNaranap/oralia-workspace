
import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartCardProps {
  title: string
  children: ReactNode
  className?: string
}

export function ChartCard({ title, children, className = "" }: ChartCardProps) {
  return (
    <Card className={`bg-card border-border hover:shadow-lg transition-all duration-300 min-w-0 ${className}`}>
      <CardHeader className="pb-1 sm:pb-4 p-1 sm:p-6">
        <CardTitle className="text-xs sm:text-xl font-semibold text-foreground truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 p-1 sm:p-6">
        {children}
      </CardContent>
    </Card>
  )
}
