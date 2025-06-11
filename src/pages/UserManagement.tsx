import React, { useState } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { UserManagementHeader } from '@/components/UserManagementHeader'
import { UserCategoryTabs } from '@/components/UserCategoryTabs'
import { UserTable } from '@/components/UserTable'
import { UserQuickView } from '@/components/UserQuickView'

export interface User {
  id: string
  name: string
  email: string
  category: 'workspace' | 'tenant'
  role: string
  status: 'Active' | 'Suspended' | 'Pending' | 'Inactive'
  tenantId?: string
  tenantName?: string
  lastLogin: string
  createdAt: string
  permissions: string[]
  mfaEnabled: boolean
  lastActivity: string
  loginCount: number
  ipAddress?: string
  location?: string
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'john@oralia.com',
    category: 'workspace',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '2024-06-11T10:30:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    permissions: ['all'],
    mfaEnabled: true,
    lastActivity: '2024-06-11T11:45:00Z',
    loginCount: 342,
    ipAddress: '192.168.1.100',
    location: 'New York, US'
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'sarah@acme.com',
    category: 'tenant',
    role: 'Owner',
    status: 'Active',
    tenantId: '1',
    tenantName: 'Acme Corp',
    lastLogin: '2024-06-11T09:15:00Z',
    createdAt: '2024-02-01T00:00:00Z',
    permissions: ['tenant_admin', 'user_management', 'billing'],
    mfaEnabled: true,
    lastActivity: '2024-06-11T10:22:00Z',
    loginCount: 156,
    ipAddress: '203.0.113.45',
    location: 'London, UK'
  }
]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [activeCategory, setActiveCategory] = useState<'all' | 'workspace' | 'tenant'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    roles: [] as string[],
    statuses: [] as string[],
    tenants: [] as string[],
    mfaEnabled: null as boolean | null,
    dateRange: null as { from: Date; to: Date } | null
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || user.category === activeCategory
    const matchesRole = filters.roles.length === 0 || filters.roles.includes(user.role)
    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(user.status)
    const matchesTenant = filters.tenants.length === 0 || (user.tenantName && filters.tenants.includes(user.tenantName))
    const matchesMfa = filters.mfaEnabled === null || user.mfaEnabled === filters.mfaEnabled
    
    return matchesSearch && matchesCategory && matchesRole && matchesStatus && matchesTenant && matchesMfa
  })

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="flex h-screen bg-background">
            <div className="flex-1 flex flex-col overflow-hidden">
              <UserManagementHeader
                userCount={filteredUsers.length}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filters={filters}
                onFiltersChange={setFilters}
              />
              
              <div className="flex-1 overflow-auto">
                <UserCategoryTabs
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  users={users}
                />
                
                <div className="p-6">
                  <UserTable
                    users={filteredUsers}
                    onUserClick={setSelectedUser}
                  />
                </div>
              </div>
            </div>

            <UserQuickView
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
