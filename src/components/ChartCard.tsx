
import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartCardProps {
  title: string
  children: ReactNode
  className?: string
}

export function ChartCard({ title, children, className = "" }: ChartCardProps) {
  return (
    <Card className={`gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
