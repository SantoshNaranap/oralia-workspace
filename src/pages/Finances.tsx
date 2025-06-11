
import React from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { FinancesHeader } from '@/components/FinancesHeader'
import { RevenueMetrics } from '@/components/RevenueMetrics'
import { RevenueCharts } from '@/components/RevenueCharts'
import { FinancialTables } from '@/components/FinancialTables'
import { BillingOperations } from '@/components/BillingOperations'

export default function Finances() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1 min-w-0">
          <div className="flex flex-col h-screen">
            <FinancesHeader />
            
            <div className="flex-1 p-6 space-y-6 overflow-auto min-w-0">
              <RevenueMetrics />
              <RevenueCharts />
              
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <FinancialTables />
                </div>
                <div className="xl:col-span-1">
                  <BillingOperations />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
