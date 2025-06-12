import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { MetricCard } from "@/components/MetricCard"
import { ChartCard } from "@/components/ChartCard"
import { StatusTable } from "@/components/StatusTable"
import { AlertsFeed } from "@/components/AlertsFeed"
import { ResourceCharts } from "@/components/ResourceCharts"
import { QuickActions } from "@/components/QuickActions"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts'
import { 
  Users, 
  Bot, 
  MessageCircle, 
  DollarSign 
} from "lucide-react"

const activityData = [
  { time: '00:00', conversations: 120, messages: 850, activeUsers: 45 },
  { time: '04:00', conversations: 98, messages: 720, activeUsers: 38 },
  { time: '08:00', conversations: 180, messages: 1200, activeUsers: 67 },
  { time: '12:00', conversations: 220, messages: 1450, activeUsers: 89 },
  { time: '16:00', conversations: 195, messages: 1320, activeUsers: 78 },
  { time: '20:00', conversations: 165, messages: 1100, activeUsers: 58 },
]

const statusData = [
  { name: 'Healthy', value: 75, color: '#10b981' },
  { name: 'Warning', value: 15, color: '#f59e0b' },
  { name: 'Critical', value: 7, color: '#ef4444' },
  { name: 'Maintenance', value: 3, color: '#3b82f6' },
]

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background overflow-x-hidden">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          
          <main className="flex-1 overflow-x-hidden">
            {/* Key Metrics Section - Sticky and ultra compact for mobile */}
            <div className="sticky top-0 z-10 bg-background border-b border-border">
              <div className="grid grid-cols-4 lg:grid-cols-4 gap-0.5 sm:gap-4 p-0.5 sm:p-4">
                <MetricCard
                  title="TENANTS"
                  value="1,247"
                  change="+12.5%"
                  changeType="positive"
                  icon={Users}
                >
                  <p className="text-xs text-muted-foreground">currently active</p>
                </MetricCard>
                
                <MetricCard
                  title="BOTS"
                  value="3,892"
                  change="+8.2%"
                  changeType="positive"
                  icon={Bot}
                >
                  <p className="text-xs text-muted-foreground">across all tenants</p>
                </MetricCard>
                
                <MetricCard
                  title="ACTIVE"
                  value="15,234"
                  change="+2.1%"
                  changeType="positive"
                  icon={MessageCircle}
                >
                  <p className="text-xs text-muted-foreground">right now</p>
                </MetricCard>
                
                <MetricCard
                  title="REVENUE"
                  value="$127,849"
                  change="+18.3%"
                  changeType="positive"
                  icon={DollarSign}
                />
              </div>
            </div>

            {/* Scrollable content area */}
            <div className="p-0.5 sm:p-4 animate-fade-in">
              {/* Top Section: Activity Chart + Top Performing Tenants - Minimal gaps for mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5 sm:gap-4 mb-1 sm:mb-4">
                <ChartCard title="Platform Activity">
                  <ResponsiveContainer width="100%" height={80} className="sm:h-[200px]">
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" fontSize={8} />
                      <YAxis stroke="#9CA3AF" fontSize={8} />
                      <Line 
                        type="monotone" 
                        dataKey="conversations" 
                        stroke="#8b5cf6" 
                        strokeWidth={1}
                        dot={false}
                        name="Conversations"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="messages" 
                        stroke="#10b981" 
                        strokeWidth={1}
                        dot={false}
                        name="Messages"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="activeUsers" 
                        stroke="#f59e0b" 
                        strokeWidth={1}
                        dot={false}
                        name="Active Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>

                <StatusTable />
              </div>

              {/* Bottom Section: System Health + Actions + Alerts + Resources - Ultra compressed */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 sm:gap-4">
                <ChartCard title="System Health">
                  <ResponsiveContainer width="100%" height={60} className="sm:h-[150px]">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={10}
                        outerRadius={25}
                        dataKey="value"
                        className="sm:inner-radius-[30] sm:outer-radius-[60]"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>
                
                <QuickActions />
                <AlertsFeed />
                <ResourceCharts />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Index
