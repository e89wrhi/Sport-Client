import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import React from 'react';

export default function SettingsGeneral() {
  return (
    <Card className="border-none">
      <CardContent>
        <div className="space-y-6 pt-7">
          {/* Avatar */}
          <div className="flex items-center gap-6 pb-4">
            <Avatar className="w-24 h-24 shadow-md">
              <AvatarImage src="https://images.unsplash.com/photo-1558181445-eca4774b2a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxMDgzODM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button
                variant="secondary"
                size={'sm'}
                className="rounded-full gap-2"
              >
                <Upload className="w-4 h-4" />
                Change Photo
              </Button>
              <p className="text-sm text-muted-foreground">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

          <Separator />

          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" defaultValue="John" />
            </div>
            <div>
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" defaultValue="Doe" />
            </div>
          </div>

          {/* Contact */}
          <div>
            <Label htmlFor="email">Email Address (Read-only)</Label>
            <Input
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
              disabled
              className="text-muted-foreground"
            />
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio / Title</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              defaultValue="App developer & creator"
            />
          </div>

          <Button className="mt-4">Save Profile Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
