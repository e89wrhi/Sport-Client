import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

export default function AccountUpdateClient() {
  const router = useRouter();
  const handleOpenStatus = () => {
    router.push(`/account_status`);
  };
  const handleOpenEdit = () => {
    router.push(`/account_edit`);
  };
  const handleOpenMore = () => {
    router.push(`/account_more`);
  };

  return (
    <Card className="border-none">
      <CardContent className="p-5">
        <div className="flex flex-col space-y-3 pb-4">
          <div
            className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={handleOpenStatus}
          >
            <div className="space-y-1">
              <p className="text-lg lg:text-xl font-black traking-[0rem] text-neutral-900 dark:text-neutral-50">
                Update Status
              </p>
              <p className="text-sm text-muted-foreground">
                Suspend, ban, or activate this user
              </p>
            </div>
            <div className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-neutral-50 dark:bg-neutral-800 transition-all group-hover:bg-primary group-hover:text-white">
              <ChevronRight className="w-6 h-6" />
            </div>{' '}
          </div>

          <Separator />

          <div
            className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={handleOpenEdit}
          >
            <div className="space-y-1">
              <p className="text-lg lg:text-xl font-black tracking-[0rem] text-neutral-900 dark:text-neutral-50">
                Edit Profile Data
              </p>
              <p className="text-sm text-muted-foreground">
                Change name, bio, or avatar manually
              </p>
            </div>
            <div className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-neutral-50 dark:bg-neutral-800 transition-all group-hover:bg-primary group-hover:text-white">
              <ChevronRight className="w-6 h-6" />
            </div>{' '}
          </div>
          <Separator />

          <div
            className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={handleOpenMore}
          >
            <div className="space-y-1">
              <p className="text-lg lg:text-xl font-black tracking-[0rem] text-neutral-900 dark:text-neutral-50">
                More Options
              </p>
              <p className="text-sm text-muted-foreground">
                Change name, bio, or avatar manually
              </p>
            </div>
            <div className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-neutral-50 dark:bg-neutral-800 transition-all group-hover:bg-primary group-hover:text-white">
              <ChevronRight className="w-6 h-6" />
            </div>{' '}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
