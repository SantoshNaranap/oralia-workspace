
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, User, Download, RefreshCw } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

export function DashboardHeader() {
  return (
    <header className="h-16 border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-semibold">Workspace</h1>
            <p className="text-sm text-muted-foreground">Superadmin Platform</p>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tenants, bots, conversations..." 
              className="pl-10 bg-card/50 border-border/50"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Last 7 days</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
          
          <Button size="sm" className="bg-primary hover:bg-primary/90 gap-2">
            <Download className="h-3 w-3" />
            Export Report
          </Button>
          
          <ThemeToggle />
          
          <div className="relative">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bell className="h-4 w-4" />
            </Button>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </div>
          
          <div className="w-8 h-8 rounded-full gradient-purple flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  )
}
