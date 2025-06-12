
import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartCardProps {
  title: string
  children: ReactNode
  className?: string
}

export function ChartCard({ title, children, className = "" }: ChartCardProps) {
  return (
    <Card className={`bg-card border-border hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader className="pb-2 sm:pb-4 p-2 sm:p-6">
        <CardTitle className="text-sm sm:text-xl font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 p-2 sm:p-6">
        {children}
      </CardContent>
    </Card>
  )
}
