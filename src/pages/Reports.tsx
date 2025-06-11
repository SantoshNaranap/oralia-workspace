
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { ChartCard } from "@/components/ChartCard"

const Reports = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Performance Reports">
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Reports visualization coming soon...
                </div>
              </ChartCard>
              
              <ChartCard title="User Analytics">
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  User analytics charts coming soon...
                </div>
              </ChartCard>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Reports
