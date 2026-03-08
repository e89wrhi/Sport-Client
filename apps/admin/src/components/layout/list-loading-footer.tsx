import React, { RefObject } from 'react';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

interface FooterProps {
  total: number;
  count: number;
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMore: () => void;
  loadMoreRef: RefObject<HTMLDivElement | null>;
}
export default function LoadingFooter(props: FooterProps) {
  const { total, count, hasMore, isLoadingMore, loadMore, loadMoreRef } = props;

  return (
    <div ref={loadMoreRef} className="flex justify-center py-8">
      {isLoadingMore ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading more etems...</span>
        </div>
      ) : (
        hasMore && (
          <Button variant="outline" onClick={loadMore} disabled={isLoadingMore}>
            Load More ({total && count > 0 ? Math.max(0, total - count) : 0}{' '}
            remaining)
          </Button>
        )
      )}
    </div>
  );
}
