import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import React from 'react';

export default function SettingsNotification() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Existing Notification Settings */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">New comments</p>
            <p className="text-sm text-muted-foreground">
              Get notified when someone comments on your apps
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">App reviews</p>
            <p className="text-sm text-muted-foreground">
              Get notified when someone reviews your app
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator />
        {/* New: Critical System Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Critical system alerts</p>
            <p className="text-sm text-muted-foreground">
              Required: Notifications about outages, security breaches, or major
              changes.
            </p>
          </div>
          <Switch checked disabled />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Weekly reports</p>
            <p className="text-sm text-muted-foreground">
              Receive weekly analytics summary via email
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </Card>
  );
}
