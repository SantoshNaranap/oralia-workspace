
import React, { useState } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { TenantHeader } from '@/components/TenantHeader'
import { TenantTable } from '@/components/TenantTable'
import { TenantQuickView } from '@/components/TenantQuickView'

export interface Tenant {
  id: string
  name: string
  company: string
  plan: 'Free' | 'Starter' | 'Pro' | 'Enterprise'
  status: 'Active' | 'Suspended' | 'Trial' | 'Churned'
  bots: number
  messages: number
  revenue: number
  created: string
  region: string
  usage: {
    cpu: number
    memory: number
    storage: number
  }
  companyInfo: {
    industry: string
    size: string
    contact: string
  }
}

const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'Acme Corp',
    company: 'Acme Corporation',
    plan: 'Enterprise',
    status: 'Active',
    bots: 12,
    messages: 45230,
    revenue: 12450,
    created: '2024-01-15',
    region: 'US-East',
    usage: { cpu: 65, memory: 70, storage: 45 },
    companyInfo: { industry: 'Technology', size: '500-1000', contact: 'john@acme.com' }
  },
  {
    id: '2',
    name: 'TechStart Inc',
    company: 'TechStart Incorporated',
    plan: 'Pro',
    status: 'Trial',
    bots: 8,
    messages: 32100,
    revenue: 9800,
    created: '2024-02-20',
    region: 'US-West',
    usage: { cpu: 45, memory: 55, storage: 30 },
    companyInfo: { industry: 'Startup', size: '50-100', contact: 'sarah@techstart.com' }
  },
  {
    id: '3',
    name: 'Global Dynamics',
    company: 'Global Dynamics LLC',
    plan: 'Enterprise',
    status: 'Active',
    bots: 15,
    messages: 67890,
    revenue: 18200,
    created: '2023-11-10',
    region: 'EU-Central',
    usage: { cpu: 80, memory: 85, storage: 60 },
    companyInfo: { industry: 'Manufacturing', size: '1000+', contact: 'mike@globaldynamics.com' }
  },
  {
    id: '4',
    name: 'Innovation Labs',
    company: 'Innovation Labs',
    plan: 'Starter',
    status: 'Suspended',
    bots: 6,
    messages: 21450,
    revenue: 7300,
    created: '2024-03-05',
    region: 'US-East',
    usage: { cpu: 20, memory: 25, storage: 15 },
    companyInfo: { industry: 'Research', size: '10-50', contact: 'alex@innovationlabs.com' }
  },
  {
    id: '5',
    name: 'Digital Solutions',
    company: 'Digital Solutions Co',
    plan: 'Pro',
    status: 'Active',
    bots: 10,
    messages: 38670,
    revenue: 11100,
    created: '2024-01-30',
    region: 'APAC',
    usage: { cpu: 60, memory: 65, storage: 40 },
    companyInfo: { industry: 'Consulting', size: '100-500', contact: 'lisa@digitalsolutions.com' }
  }
]

export default function TenantManagement() {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    plans: [] as string[],
    statuses: [] as string[],
    regions: [] as string[],
    dateRange: null as { from: Date; to: Date } | null,
    usageRange: [0, 100] as [number, number]
  })

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlan = filters.plans.length === 0 || filters.plans.includes(tenant.plan)
    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(tenant.status)
    const matchesRegion = filters.regions.length === 0 || filters.regions.includes(tenant.region)
    
    return matchesSearch && matchesPlan && matchesStatus && matchesRegion
  })

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="flex h-screen bg-background">
            <div className="flex-1 flex flex-col overflow-hidden">
              <TenantHeader
                tenantCount={filteredTenants.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                filters={filters}
                onFiltersChange={setFilters}
              />
              
              <div className="flex-1 overflow-auto p-6">
                <TenantTable
                  tenants={filteredTenants}
                  onTenantClick={setSelectedTenant}
                />
              </div>
            </div>

            {selectedTenant && (
              <TenantQuickView
                tenant={selectedTenant}
                onClose={() => setSelectedTenant(null)}
              />
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
