'use client';

import React from 'react';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import DetailHeader from '@/components/layout/detail-header';
import MeClientProfile from './me-client-profile';
import MeClientActions from './me-client-options';
import MeHeader from './me-header';
import EmptyView from '@/components/layout/state/empty-view';

const data = {
  name: 'my name',
  image: 'image',
  status: 'Active',
};

export default function MeClient() {
  if (!data) {
    return <EmptyView itemsname="profile" className="" />;
  }

  return (
    <DetailWidthWrapper>
      <DetailHeader />
      <MeHeader />

      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Hello, {data.name}!
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Welcome to your account dashboard. You are currently signed in as an
          administrator.
        </p>
      </div>

      <MeClientProfile item={data} />
      <MeClientActions />
    </DetailWidthWrapper>
  );
}
