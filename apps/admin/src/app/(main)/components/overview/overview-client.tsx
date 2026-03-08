'use client';

import ListWidthWrapper from '@/components/layout/list-width-wrapper';

export function DashboardOverview() {
  return (
    <ListWidthWrapper>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track performance matches</p>
        </div>
      </div>
    </ListWidthWrapper>
  );
}
