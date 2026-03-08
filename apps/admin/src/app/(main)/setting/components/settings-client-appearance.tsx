import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Globe } from 'lucide-react';
import React from 'react';

const TIMEZONE_OPTIONS = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'Europe/London', label: 'London Time (GMT)' },
];

export default function SettingsAppearance() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Appearance */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-sm text-muted-foreground">
              Switch between light, dark, or system default mode.
            </p>
          </div>
          {/* Mock implementation of theme selector */}
          <Select
            defaultValue="system"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onValueChange={(value) => {
              /* setTheme(value) */
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System Default</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Localization */}
        <div className="flex items-center justify-between">
          <div className="max-w-md">
            <p className="font-medium flex items-center gap-2">
              <Globe className="w-4 h-4" /> Timezone
            </p>
            <p className="text-sm text-muted-foreground">
              This affects the display of timestamps throughout the dashboard.
            </p>
          </div>
          <Select
            defaultValue="UTC"
            onValueChange={(value) => console.log('Timezone set to:', value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Timezone" />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Compact View */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Compact data view</p>
            <p className="text-sm text-muted-foreground">
              Minimize padding and text size to display more content on screen
              (requires reload).
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </Card>
  );
}
