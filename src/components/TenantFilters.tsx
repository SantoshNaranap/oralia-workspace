
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown, Filter } from 'lucide-react'

interface FiltersState {
  plans: string[]
  statuses: string[]
  regions: string[]
  dateRange: { from: Date; to: Date } | null
  usageRange: [number, number]
}

interface TenantFiltersProps {
  filters: FiltersState
  onFiltersChange: (filters: FiltersState) => void
}

export function TenantFilters({ filters, onFiltersChange }: TenantFiltersProps) {
  const [isOpen, setIsOpen] = useState(true)

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

  const handleUsageRangeChange = (value: number[]) => {
    onFiltersChange({ ...filters, usageRange: [value[0], value[1]] })
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

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={`border-r border-border bg-card transition-all duration-300 ${isOpen ? 'w-80' : 'w-12'}`}>
        <div className="p-4">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-2">
              {isOpen && (
                <>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">Filters</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
              {!isOpen && <Filter className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-6 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Active Filters</span>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Plan Type</h3>
                <div className="space-y-2">
                  {plans.map(plan => (
                    <div key={plan} className="flex items-center space-x-2">
                      <Checkbox
                        id={`plan-${plan}`}
                        checked={filters.plans.includes(plan)}
                        onCheckedChange={(checked) => handlePlanChange(plan, checked as boolean)}
                      />
                      <label htmlFor={`plan-${plan}`} className="text-sm">
                        {plan}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Status</h3>
                <div className="space-y-2">
                  {statuses.map(status => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={filters.statuses.includes(status)}
                        onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                      />
                      <label htmlFor={`status-${status}`} className="text-sm">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Region</h3>
                <div className="space-y-2">
                  {regions.map(region => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox
                        id={`region-${region}`}
                        checked={filters.regions.includes(region)}
                        onCheckedChange={(checked) => handleRegionChange(region, checked as boolean)}
                      />
                      <label htmlFor={`region-${region}`} className="text-sm">
                        {region}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Usage Range (%)</h3>
                <div className="px-2">
                  <Slider
                    value={filters.usageRange}
                    onValueChange={handleUsageRangeChange}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{filters.usageRange[0]}%</span>
                    <span>{filters.usageRange[1]}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </div>
    </Collapsible>
  )
}
