
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const SettingsPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span>Email notifications</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Push notifications</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Auto-refresh data</span>
                    <Switch defaultChecked />
                  </div>
                  <Button className="w-full gradient-purple">Save Settings</Button>
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Account Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span>Dark mode</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Analytics tracking</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Performance monitoring</span>
                    <Switch defaultChecked />
                  </div>
                  <Button variant="outline" className="w-full border-border/50">Reset Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default SettingsPage
