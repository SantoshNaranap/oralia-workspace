
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Plus, Filter, Download, ChevronDown, UserPlus, Shield, Key } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface UserManagementHeaderProps {
  userCount: number
  searchQuery: string
  onSearchChange: (query: string) => void
  filters: {
    roles: string[]
    statuses: string[]
    tenants: string[]
    mfaEnabled: boolean | null
    dateRange: { from: Date; to: Date } | null
  }
  onFiltersChange: (filters: any) => void
}

interface AddUserForm {
  name: string
  email: string
  category: 'workspace' | 'tenant'
  role: string
  tenantId?: string
  sendInviteEmail: boolean
}

export function UserManagementHeader({
  userCount,
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange
}: UserManagementHeaderProps) {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const form = useForm<AddUserForm>({
    defaultValues: {
      name: '',
      email: '',
      category: 'workspace',
      role: 'Member',
      sendInviteEmail: true
    }
  })

  const roles = ['Super Admin', 'Support', 'Finance', 'Operations', 'Owner', 'Admin', 'Member', 'Bot Operator']
  const statuses = ['Active', 'Suspended', 'Pending', 'Inactive']
  const tenants = ['Acme Corp', 'TechStart Inc', 'Global Dynamics', 'Digital Solutions']

  const workspaceRoles = ['Super Admin', 'Support', 'Finance', 'Operations']
  const tenantRoles = ['Owner', 'Admin', 'Member', 'Bot Operator']

  const handleRoleChange = (role: string, checked: boolean) => {
    const newRoles = checked
      ? [...filters.roles, role]
      : filters.roles.filter(r => r !== role)
    
    onFiltersChange({ ...filters, roles: newRoles })
  }

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...filters.statuses, status]
      : filters.statuses.filter(s => s !== status)
    
    onFiltersChange({ ...filters, statuses: newStatuses })
  }

  const handleTenantChange = (tenant: string, checked: boolean) => {
    const newTenants = checked
      ? [...filters.tenants, tenant]
      : filters.tenants.filter(t => t !== tenant)
    
    onFiltersChange({ ...filters, tenants: newTenants })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      roles: [],
      statuses: [],
      tenants: [],
      mfaEnabled: null,
      dateRange: null
    })
  }

  const onSubmitAddUser = (data: AddUserForm) => {
    console.log('Adding user:', data)
    setIsAddUserOpen(false)
    form.reset()
  }

  const selectedCategory = form.watch('category')

  const activeFiltersCount = filters.roles.length + filters.statuses.length + filters.tenants.length + 
                            (filters.mfaEnabled !== null ? 1 : 0)

  return (
    <div className="border-b border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Badge variant="secondary" className="text-sm">
            {userCount} users
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Key className="w-4 h-4 mr-2" />
            API Tokens
          </Button>
          <Button variant="outline" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </Button>
          
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account. An invitation email will be sent if enabled.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitAddUser)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select user type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="workspace">Workspace User</SelectItem>
                            <SelectItem value="tenant">Tenant User</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(selectedCategory === 'workspace' ? workspaceRoles : tenantRoles).map(role => (
                              <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {selectedCategory === 'tenant' && (
                    <FormField
                      control={form.control}
                      name="tenantId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tenant</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select tenant" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tenants.map(tenant => (
                                <SelectItem key={tenant} value={tenant.toLowerCase().replace(/\s+/g, '-')}>{tenant}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create User</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search users, emails, roles..."
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
                <div className="text-xs font-medium text-muted-foreground mb-2">ROLE</div>
                {roles.map(role => (
                  <DropdownMenuCheckboxItem
                    key={role}
                    checked={filters.roles.includes(role)}
                    onCheckedChange={(checked) => handleRoleChange(role, checked as boolean)}
                    className="text-sm"
                  >
                    {role}
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
                <div className="text-xs font-medium text-muted-foreground mb-2">TENANT</div>
                {tenants.map(tenant => (
                  <DropdownMenuCheckboxItem
                    key={tenant}
                    checked={filters.tenants.includes(tenant)}
                    onCheckedChange={(checked) => handleTenantChange(tenant, checked as boolean)}
                    className="text-sm"
                  >
                    {tenant}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>

              <DropdownMenuSeparator />
              
              <div className="py-2">
                <div className="text-xs font-medium text-muted-foreground mb-2">2FA STATUS</div>
                <DropdownMenuCheckboxItem
                  checked={filters.mfaEnabled === true}
                  onCheckedChange={(checked) => onFiltersChange({ ...filters, mfaEnabled: checked ? true : null })}
                  className="text-sm"
                >
                  2FA Enabled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.mfaEnabled === false}
                  onCheckedChange={(checked) => onFiltersChange({ ...filters, mfaEnabled: checked ? false : null })}
                  className="text-sm"
                >
                  2FA Disabled
                </DropdownMenuCheckboxItem>
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
            <DropdownMenuItem>Suspend Selected</DropdownMenuItem>
            <DropdownMenuItem>Activate Selected</DropdownMenuItem>
            <DropdownMenuItem>Reset Passwords</DropdownMenuItem>
            <DropdownMenuItem>Enable 2FA</DropdownMenuItem>
            <DropdownMenuItem>Change Roles</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Export Selected</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete Selected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
