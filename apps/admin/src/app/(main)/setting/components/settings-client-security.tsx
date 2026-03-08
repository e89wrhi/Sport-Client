import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { Lock } from 'lucide-react';

export default function SettingsSecurity() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Change Password */}
        <div className="pb-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Change Password
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <Button className="mt-4">Update Password</Button>
        </div>

        <Separator />

        {/* 2FA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-4">
          <div className="max-w-md">
            <p className="font-medium">Two-factor authentication (2FA)</p>
            <p className="text-sm text-muted-foreground">
              Require a second verification step to log in. Highly recommended
              for account security.
            </p>
          </div>
          <Button variant="outline" className="mt-3 md:mt-0">
            Enable 2FA
          </Button>
        </div>
      </div>
    </Card>
  );
}
