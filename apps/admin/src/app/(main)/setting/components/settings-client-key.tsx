import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function SettingsKey() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="max-w-lg">
            <p className="font-medium">API Access Key</p>
            <p className="text-sm text-muted-foreground">
              Use this key to access your data programmatically. **Treat this
              key like a password.**
            </p>
          </div>
          <Button variant="secondary" className="mt-3 md:mt-0">
            Generate New Key
          </Button>
        </div>
        <Input
          type="text"
          defaultValue="sk-**********************40b8"
          readOnly
        />

        <Separator />

        <div className="flex items-center justify-between">
          <div className="max-w-lg">
            <p className="font-medium">Key Permissions</p>
            <p className="text-sm text-muted-foreground">
              View or modify the scope of the current API key.
            </p>
          </div>
          <Button variant="outline" className="mt-3 md:mt-0">
            Manage Permissions
          </Button>
        </div>
      </div>
    </Card>
  );
}
