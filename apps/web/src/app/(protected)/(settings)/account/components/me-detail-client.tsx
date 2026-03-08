'use client';

import React from 'react';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import DetailHeader from '@/components/layout/detail-header';
import AccountHeader from './me-detail-header';

export default function AccountClient() {
  return (
    <DetailWidthWrapper>
      <DetailHeader />
      <AccountHeader />
    </DetailWidthWrapper>
  );
}
