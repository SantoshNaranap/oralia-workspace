
import { Moon, Sun, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, colorTheme, setTheme, setColorTheme } = useTheme()

  const colorThemes = [
    { name: 'Purple', value: 'purple' as const, color: 'hsl(250, 100%, 70%)' },
    { name: 'Blue', value: 'blue' as const, color: 'hsl(220, 100%, 70%)' },
    { name: 'Green', value: 'green' as const, color: 'hsl(142, 76%, 36%)' },
    { name: 'Orange', value: 'orange' as const, color: 'hsl(25, 95%, 53%)' },
  ]

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="h-8 w-8 p-0"
      >
        {theme === 'light' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Palette className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {colorThemes.map((themeOption) => (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setColorTheme(themeOption.value)}
              className="flex items-center gap-2"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: themeOption.color }}
              />
              <span>{themeOption.name}</span>
              {colorTheme === themeOption.value && (
                <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
