import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Settings, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  item: { name: string; status: string; image: string };
}

const StatusBadge = ({
  status,
  statusUpdatedAt,
}: {
  status: string;
  statusUpdatedAt?: Date;
}) => {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' =
    'secondary';
  let icon = null;

  if (status === 'Active') {
    variant = 'default';
    icon = <Zap className="w-3 h-3 mr-1" />;
  } else if (status === 'Suspended' || status === 'Disabled') {
    variant = 'destructive';
  }

  const dateString = statusUpdatedAt
    ? new Date(statusUpdatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="space-y-1">
      <Badge
        variant={variant}
        className="capitalize text-sm font-semibold px-3 py-1"
      >
        {icon}
        {status} Status
      </Badge>
      <div className="flex items-center text-xs text-muted-foreground mt-1">
        <Calendar className="w-3 h-3 mr-1" />
        Last Updated: {dateString}
      </div>
    </div>
  );
};

export default function MeClientProfile(props: Props) {
  const { item } = props;
  const router = useRouter();

  const handleOpenSettings = () => {
    router.push(`/setting`);
  };

  return (
    <Card className="p-6 shadow-lg border-transparent">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Info */}
        <div className="flex items-center gap-6 flex-grow">
          <Avatar className="w-24 h-24 shadow-md ring-2 ring-primary/50">
            <AvatarImage
              src={
                item.image ||
                'https://images.unsplash.com/photo-1558181445-eca4774b2a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxMDgzODM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              }
            />
            <AvatarFallback>
              {item.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <StatusBadge status={status} />
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={handleOpenSettings}>
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        <Separator orientation="vertical" className="hidden md:block h-24" />
        <Separator orientation="horizontal" className="block md:hidden" />

        {/* Quick Actions (Moved to a separate grid below for better scaling) */}
      </div>
    </Card>
  );
}
