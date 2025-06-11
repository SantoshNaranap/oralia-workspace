
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { MetricCard } from "@/components/MetricCard"
import { ChartCard } from "@/components/ChartCard"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { BarChart as BarChartIcon, PieChart as PieChartIcon, Calendar, Settings } from "lucide-react"

const revenueData = [
  { month: 'Jan', revenue: 4000, users: 2400 },
  { month: 'Feb', revenue: 3000, users: 1398 },
  { month: 'Mar', revenue: 2000, users: 9800 },
  { month: 'Apr', revenue: 2780, users: 3908 },
  { month: 'May', revenue: 1890, users: 4800 },
  { month: 'Jun', revenue: 2390, users: 3800 },
]

const trafficData = [
  { name: 'Direct', value: 4000, color: '#8b5cf6' },
  { name: 'Social', value: 3000, color: '#06d6a0' },
  { name: 'Search', value: 2000, color: '#f72585' },
  { name: 'Email', value: 2780, color: '#ffbe0b' },
]

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6 animate-fade-in">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Revenue"
                value="$54,329"
                change="+12.5%"
                changeType="positive"
                icon={BarChartIcon}
              />
              
              <MetricCard
                title="Active Users"
                value="2,847"
                change="+8.2%"
                changeType="positive"
                icon={Calendar}
              />
              
              <MetricCard
                title="Conversion Rate"
                value="3.24%"
                change="-2.1%"
                changeType="negative"
                icon={PieChartIcon}
              />
              
              <MetricCard
                title="Avg. Session"
                value="4m 32s"
                change="+0.8%"
                changeType="neutral"
                icon={Settings}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartCard title="Revenue & Users Trend">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#06d6a0" 
                      strokeWidth={3}
                      dot={{ fill: '#06d6a0', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Traffic Sources">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Full Width Chart */}
            <ChartCard title="Monthly Performance">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Index
