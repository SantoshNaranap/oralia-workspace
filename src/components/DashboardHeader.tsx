
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="h-16 border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, track your performance</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="bg-card/50 border-border/50">
            Export Data
          </Button>
          <div className="w-8 h-8 rounded-full gradient-purple flex items-center justify-center">
            <span className="text-sm font-medium text-white">JD</span>
          </div>
        </div>
      </div>
    </header>
  )
}
