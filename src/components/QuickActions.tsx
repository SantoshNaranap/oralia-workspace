
import { ChartCard } from "@/components/ChartCard"
import { Button } from "@/components/ui/button"
import { Plus, Settings, Users, Bot, BarChart, Shield } from "lucide-react"

const actions = [
  { name: "Add Tenant", icon: Plus, variant: "default" as const },
  { name: "Deploy Bot", icon: Bot, variant: "secondary" as const },
  { name: "Manage Users", icon: Users, variant: "secondary" as const },
  { name: "View Analytics", icon: BarChart, variant: "secondary" as const },
  { name: "Security Settings", icon: Shield, variant: "secondary" as const },
  { name: "System Config", icon: Settings, variant: "secondary" as const },
]

export function QuickActions() {
  return (
    <ChartCard title="Quick Actions">
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.name}
            variant={action.variant}
            className="h-12 flex-col gap-1 text-xs"
          >
            <action.icon className="w-4 h-4" />
            {action.name}
          </Button>
        ))}
      </div>
    </ChartCard>
  )
}
