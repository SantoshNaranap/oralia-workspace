
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Plus, Filter, Grid2x2, List, ChevronDown } from 'lucide-react'

interface TenantHeaderProps {
  tenantCount: number
  searchQuery: string
  onSearchChange: (query: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  filters: {
    plans: string[]
    statuses: string[]
    regions: string[]
    dateRange: { from: Date; to: Date } | null
    usageRange: [number, number]
  }
  onFiltersChange: (filters: any) => void
}

export function TenantHeader({
  tenantCount,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  filters,
  onFiltersChange
}: TenantHeaderProps) {
  const plans = ['Free', 'Starter', 'Pro', 'Enterprise']
  const statuses = ['Active', 'Suspended', 'Trial', 'Churned']
  const regions = ['US-East', 'US-West', 'EU-Central', 'APAC']

  const handlePlanChange = (plan: string, checked: boolean) => {
    const newPlans = checked
      ? [...filters.plans, plan]
      : filters.plans.filter(p => p !== plan)
    
    onFiltersChange({ ...filters, plans: newPlans })
  }

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...filters.statuses, status]
      : filters.statuses.filter(s => s !== status)
    
    onFiltersChange({ ...filters, statuses: newStatuses })
  }

  const handleRegionChange = (region: string, checked: boolean) => {
    const newRegions = checked
      ? [...filters.regions, region]
      : filters.regions.filter(r => r !== region)
    
    onFiltersChange({ ...filters, regions: newRegions })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      plans: [],
      statuses: [],
      regions: [],
      dateRange: null,
      usageRange: [0, 100]
    })
  }

  const activeFiltersCount = filters.plans.length + filters.statuses.length + filters.regions.length

  return (
    <div className="border-b border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Tenant Management</h1>
          <Badge variant="secondary" className="text-sm">
            {tenantCount} tenants
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add New Tenant
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search tenants, companies..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="start">
            <div className="p-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Filters</span>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 px-2 text-xs">
                    Clear All
                  </Button>
                )}
              </div>
              
              <DropdownMenuSeparator />
              
              <div className="py-2">
                <div className="text-xs font-medium text-muted-foreground mb-2">PLAN TYPE</div>
                {plans.map(plan => (
                  <DropdownMenuCheckboxItem
                    key={plan}
                    checked={filters.plans.includes(plan)}
                    onCheckedChange={(checked) => handlePlanChange(plan, checked as boolean)}
                    className="text-sm"
                  >
                    {plan}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
              
              <DropdownMenuSeparator />
              
              <div className="py-2">
                <div className="text-xs font-medium text-muted-foreground mb-2">STATUS</div>
                {statuses.map(status => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={filters.statuses.includes(status)}
                    onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                    className="text-sm"
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
              
              <DropdownMenuSeparator />
              
              <div className="py-2">
                <div className="text-xs font-medium text-muted-foreground mb-2">REGION</div>
                {regions.map(region => (
                  <DropdownMenuCheckboxItem
                    key={region}
                    checked={filters.regions.includes(region)}
                    onCheckedChange={(checked) => handleRegionChange(region, checked as boolean)}
                    className="text-sm"
                  >
                    {region}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Bulk Actions
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Export as CSV</DropdownMenuItem>
            <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Suspend Selected</DropdownMenuItem>
            <DropdownMenuItem>Activate Selected</DropdownMenuItem>
            <DropdownMenuItem>Delete Selected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex items-center border border-border rounded-md">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="rounded-r-none"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="rounded-l-none"
          >
            <Grid2x2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
