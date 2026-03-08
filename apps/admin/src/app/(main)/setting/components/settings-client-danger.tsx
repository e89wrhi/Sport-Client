import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React from 'react';

export default function SettingsDanger() {
  return (
    <Card className="p-6 border-none">
      <h3 className="text-xl font-bold mb-4 text-destructive">Danger Zone</h3>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-3  rounded-lg bg-red-50 bg-neutral-200 dark:bg-neutral-800">
          <div>
            <p className="font-medium text-destructive">Delete Account</p>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data. **This
              action cannot be undone.**
            </p>
          </div>
          <Button variant="destructive" className="rounded-full mt-3 md:mt-0">
            Delete Account
          </Button>
        </div>
      </div>
    </Card>
  );
}
