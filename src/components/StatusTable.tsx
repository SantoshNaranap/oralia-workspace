
import { ChartCard } from "@/components/ChartCard"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const tenantData = [
  { tenant: "Acme Corp", botCount: 12, messages: "45,230", revenue: "$12,450" },
  { tenant: "TechStart Inc", botCount: 8, messages: "32,100", revenue: "$9,800" },
  { tenant: "Global Dynamics", botCount: 15, messages: "67,890", revenue: "$18,200" },
  { tenant: "Innovation Labs", botCount: 6, messages: "21,450", revenue: "$7,300" },
  { tenant: "Digital Solutions", botCount: 10, messages: "38,670", revenue: "$11,100" },
]

export function StatusTable() {
  return (
    <ChartCard title="Top Performing Tenants">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tenant</TableHead>
            <TableHead>Bot Count</TableHead>
            <TableHead>Messages</TableHead>
            <TableHead>Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenantData.map((tenant) => (
            <TableRow key={tenant.tenant}>
              <TableCell className="font-medium">{tenant.tenant}</TableCell>
              <TableCell>{tenant.botCount}</TableCell>
              <TableCell>{tenant.messages}</TableCell>
              <TableCell className="text-green-400">{tenant.revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ChartCard>
  )
}
