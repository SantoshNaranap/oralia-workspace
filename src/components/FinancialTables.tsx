
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertTriangle, Calendar, CreditCard } from 'lucide-react'

const recentTransactions = [
  { id: 'TXN-001', tenant: 'TechCorp Inc', amount: '$2,500', type: 'Payment', status: 'Completed', date: '2024-06-10' },
  { id: 'TXN-002', tenant: 'StartupXYZ', amount: '$890', type: 'Subscription', status: 'Completed', date: '2024-06-10' },
  { id: 'TXN-003', tenant: 'Enterprise Co', amount: '$5,000', type: 'Payment', status: 'Processing', date: '2024-06-09' },
  { id: 'TXN-004', tenant: 'SMB Solutions', amount: '$450', type: 'Refund', status: 'Completed', date: '2024-06-09' }
]

const upcomingRenewals = [
  { tenant: 'TechCorp Inc', plan: 'Enterprise', amount: '$2,500', date: '2024-06-15', status: 'Auto-renewal' },
  { tenant: 'RetailPlus', plan: 'Professional', amount: '$890', date: '2024-06-18', status: 'Manual renewal' },
  { tenant: 'ServiceCorp', plan: 'Starter', amount: '$299', date: '2024-06-20', status: 'Auto-renewal' },
  { tenant: 'GlobalTech', plan: 'Enterprise', amount: '$4,500', date: '2024-06-22', status: 'Payment required' }
]

const failedPayments = [
  { tenant: 'StartupABC', amount: '$890', reason: 'Insufficient funds', date: '2024-06-08', attempts: 2 },
  { tenant: 'SmallBiz Co', amount: '$299', reason: 'Card expired', date: '2024-06-07', attempts: 1 },
  { tenant: 'TechStart', amount: '$1,200', reason: 'Payment declined', date: '2024-06-06', attempts: 3 }
]

const topTenants = [
  { rank: 1, tenant: 'Enterprise Co', revenue: '$15,000', growth: '+23%' },
  { rank: 2, tenant: 'GlobalTech', revenue: '$12,500', growth: '+18%' },
  { rank: 3, tenant: 'TechCorp Inc', revenue: '$10,000', growth: '+15%' },
  { rank: 4, tenant: 'MegaCorp', revenue: '$8,500', growth: '+12%' },
  { rank: 5, tenant: 'BigTech Ltd', revenue: '$7,200', growth: '+8%' }
]

export function FinancialTables() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="renewals">Renewals</TabsTrigger>
          <TabsTrigger value="failed">Failed Payments</TabsTrigger>
          <TabsTrigger value="leaderboard">Top Tenants</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono">{transaction.id}</TableCell>
                      <TableCell>{transaction.tenant}</TableCell>
                      <TableCell className="font-semibold">{transaction.amount}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === 'Completed' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renewals">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Renewals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Renewal Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingRenewals.map((renewal, index) => (
                    <TableRow key={index}>
                      <TableCell>{renewal.tenant}</TableCell>
                      <TableCell>{renewal.plan}</TableCell>
                      <TableCell className="font-semibold">{renewal.amount}</TableCell>
                      <TableCell>{renewal.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={renewal.status === 'Payment required' ? 'destructive' : 'default'}
                        >
                          {renewal.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Failed Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Attempts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {failedPayments.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{payment.tenant}</TableCell>
                      <TableCell className="font-semibold">{payment.amount}</TableCell>
                      <TableCell>{payment.reason}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{payment.attempts}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>Top Revenue Tenants</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topTenants.map((tenant) => (
                    <TableRow key={tenant.rank}>
                      <TableCell className="font-bold">#{tenant.rank}</TableCell>
                      <TableCell>{tenant.tenant}</TableCell>
                      <TableCell className="font-semibold">{tenant.revenue}</TableCell>
                      <TableCell className="text-green-500 font-medium">{tenant.growth}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
