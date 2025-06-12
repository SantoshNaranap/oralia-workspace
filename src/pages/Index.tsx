
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
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-1 sm:p-4 animate-fade-in">
            {/* Key Metrics Section - Ultra compact for mobile */}
            <div className="grid grid-cols-4 lg:grid-cols-4 gap-1 sm:gap-4 mb-2 sm:mb-4">
              <MetricCard
                title="TOTAL TENANTS"
                value="1,247"
                change="+12.5%"
                changeType="positive"
                icon={Users}
              >
                <p className="text-xs text-muted-foreground">currently active</p>
              </MetricCard>
              
              <MetricCard
                title="TOTAL BOTS DEPLOYED"
                value="3,892"
                change="+8.2%"
                changeType="positive"
                icon={Bot}
              >
                <p className="text-xs text-muted-foreground">across all tenants</p>
              </MetricCard>
              
              <MetricCard
                title="ACTIVE CONVERSATIONS"
                value="15,234"
                change="+2.1%"
                changeType="positive"
                icon={MessageCircle}
              >
                <p className="text-xs text-muted-foreground">right now</p>
              </MetricCard>
              
              <MetricCard
                title="PLATFORM REVENUE"
                value="$127,849 MRR"
                change="+18.3%"
                changeType="positive"
                icon={DollarSign}
              />
            </div>

            {/* Top Section: Activity Chart + Top Performing Tenants - Compressed for mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-4 mb-2 sm:mb-4">
              <ChartCard title="Platform Activity Trend">
                <ResponsiveContainer width="100%" height={160} className="sm:h-[250px]">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Line 
                      type="monotone" 
                      dataKey="conversations" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
                      name="Conversations"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="messages" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                      name="Messages"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="activeUsers" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                      name="Active Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <StatusTable />
            </div>

            {/* Bottom Section: System Health + Actions + Alerts + Resources - Ultra compressed for mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-4">
              <ChartCard title="System Health Status">
                <ResponsiveContainer width="100%" height={120} className="sm:h-[200px]">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={50}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      className="sm:inner-radius-[40] sm:outer-radius-[80]"
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Index
