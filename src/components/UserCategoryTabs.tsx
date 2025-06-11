
import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { User } from '@/pages/UserManagement'

interface UserCategoryTabsProps {
  activeCategory: 'all' | 'workspace' | 'tenant'
  onCategoryChange: (category: 'all' | 'workspace' | 'tenant') => void
  users: User[]
}

export function UserCategoryTabs({ activeCategory, onCategoryChange, users }: UserCategoryTabsProps) {
  const getCategoryCount = (category: string) => {
    if (category === 'all') return users.length
    return users.filter(user => user.category === category).length
  }

  return (
    <div className="border-b border-border bg-card px-6 py-3">
      <Tabs value={activeCategory} onValueChange={(value) => onCategoryChange(value as any)}>
        <TabsList className="grid w-full grid-cols-3 max-w-xl">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All Users
            <Badge variant="secondary" className="text-xs">
              {getCategoryCount('all')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="workspace" className="flex items-center gap-2">
            Workspace
            <Badge variant="secondary" className="text-xs">
              {getCategoryCount('workspace')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="tenant" className="flex items-center gap-2">
            Tenant Users
            <Badge variant="secondary" className="text-xs">
              {getCategoryCount('tenant')}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
