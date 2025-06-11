
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobalSettingsTab } from "@/components/GlobalSettingsTab"
import { PlansAndPricingTab } from "@/components/PlansAndPricingTab"
import { IntegrationsTab } from "@/components/IntegrationsTab"
import { SecurityTab } from "@/components/SecurityTab"
import { ComplianceTab } from "@/components/ComplianceTab"

const SettingsPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">System Configuration</h1>
              <p className="text-muted-foreground">Manage your platform settings and configurations</p>
            </div>

            <Tabs defaultValue="global" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="global">Global Settings</TabsTrigger>
                <TabsTrigger value="plans">Plans & Pricing</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>

              <TabsContent value="global" className="mt-6">
                <GlobalSettingsTab />
              </TabsContent>

              <TabsContent value="plans" className="mt-6">
                <PlansAndPricingTab />
              </TabsContent>

              <TabsContent value="integrations" className="mt-6">
                <IntegrationsTab />
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <SecurityTab />
              </TabsContent>

              <TabsContent value="compliance" className="mt-6">
                <ComplianceTab />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default SettingsPage
