
import React, { useState } from 'react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
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
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false)
  const [newTenant, setNewTenant] = useState({
    name: '',
    company: '',
    plan: '',
    region: '',
    industry: '',
    size: '',
    contact: ''
  })

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

  const handleAddTenant = () => {
    console.log('Adding new tenant:', newTenant)
    setIsAddTenantOpen(false)
    setNewTenant({
      name: '',
      company: '',
      plan: '',
      region: '',
      industry: '',
      size: '',
      contact: ''
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
          <Dialog open={isAddTenantOpen} onOpenChange={setIsAddTenantOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add New Tenant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Tenant</DialogTitle>
                <DialogDescription>
                  Create a new tenant account with their basic information.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="tenant-name">Tenant Name</Label>
                  <Input
                    id="tenant-name"
                    placeholder="Enter tenant name"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    placeholder="Enter company name"
                    value={newTenant.company}
                    onChange={(e) => setNewTenant({ ...newTenant, company: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="plan">Plan</Label>
                  <Select value={newTenant.plan} onValueChange={(value) => setNewTenant({ ...newTenant, plan: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Free">Free</SelectItem>
                      <SelectItem value="Starter">Starter</SelectItem>
                      <SelectItem value="Pro">Pro</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={newTenant.region} onValueChange={(value) => setNewTenant({ ...newTenant, region: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US-East">US-East</SelectItem>
                      <SelectItem value="US-West">US-West</SelectItem>
                      <SelectItem value="EU-Central">EU-Central</SelectItem>
                      <SelectItem value="APAC">APAC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Technology, Healthcare"
                    value={newTenant.industry}
                    onChange={(e) => setNewTenant({ ...newTenant, industry: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="company-size">Company Size</Label>
                  <Select value={newTenant.size} onValueChange={(value) => setNewTenant({ ...newTenant, size: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="10-50">10-50 employees</SelectItem>
                      <SelectItem value="50-100">50-100 employees</SelectItem>
                      <SelectItem value="100-500">100-500 employees</SelectItem>
                      <SelectItem value="500-1000">500-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="contact@company.com"
                    value={newTenant.contact}
                    onChange={(e) => setNewTenant({ ...newTenant, contact: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddTenantOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTenant}>
                  Create Tenant
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
