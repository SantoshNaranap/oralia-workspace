
import { ChartCard } from "@/components/ChartCard"
import { Progress } from "@/components/ui/progress"
import { Cpu, HardDrive, MemoryStick } from "lucide-react"

const resourceData = [
  { name: "CPU", usage: 68, icon: Cpu, color: "bg-purple-500" },
  { name: "Memory", usage: 74, icon: MemoryStick, color: "bg-green-500" },
  { name: "Storage", usage: 45, icon: HardDrive, color: "bg-orange-500" },
]

export function ResourceCharts() {
  return (
    <ChartCard title="Resource Utilization">
      <div className="space-y-6">
        {resourceData.map((resource) => (
          <div key={resource.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <resource.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{resource.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{resource.usage}%</span>
            </div>
            <Progress value={resource.usage} className="h-2" />
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
