import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Palette, Settings, History } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function MeClientActions() {
  const router = useRouter();

  const handleOpenSettings = () => {
    router.push(`/setting`);
  };

  const handleOpenUpdates = () => {
    router.push(`/updates`);
  };

  const handleOpenNotifications = () => {
    router.push(`/notifications`);
  };

  const handleOpenProfiles = () => {
    // Navigates to a page related to managing user profiles/data
    router.push(`/profiles`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="hover:ring-2 hover:ring-primary/50 transition duration-300 shadow-md border-transparent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Account Settings
          </CardTitle>
          <Settings className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">Manage Profile</p>
          <p className="text-xs text-muted-foreground mt-1">
            Update profile, password, and preferences.
          </p>
          <Button
            size="sm"
            className="w-full mt-3"
            onClick={handleOpenSettings}
          >
            Go to Settings
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:ring-2 hover:ring-primary/50 transition duration-300 shadow-md border-transparent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Activity Log</CardTitle>
          <History className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">Recent Updates</p>
          <p className="text-xs text-muted-foreground mt-1">
            View your recent activity and content changes.
          </p>
          <Button size="sm" className="w-full mt-3" onClick={handleOpenUpdates}>
            Go to Updates
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:ring-2 hover:ring-primary/50 transition duration-300 shadow-md border-transparent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alerts</CardTitle>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">View Notifications</p>
          <p className="text-xs text-muted-foreground mt-1">
            See your recent system and app notifications.
          </p>
          <Button
            size="sm"
            className="w-full mt-3"
            onClick={handleOpenNotifications}
          >
            View Notifications
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:ring-2 hover:ring-primary/50 transition duration-300 shadow-md border-transparent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">User Data</CardTitle>
          <Palette className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">Edit Preferences</p>
          <p className="text-xs text-muted-foreground mt-1">
            Set language, theme, and data sharing options.
          </p>
          <Button
            size="sm"
            className="w-full mt-3"
            onClick={handleOpenProfiles}
          >
            Edit Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
