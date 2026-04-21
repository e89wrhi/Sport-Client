'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EVENTS_LIMIT } from '@/lib/constants';
import { MatchDto } from '@/types/api/match';
import { useGetMatches } from '@/lib/api/sports/getMatches';
import { MatchLeague } from '@/types/enums/sport';
import MatchsListHeader from './match-list-header';
import { MatchesItem } from './match-list-item';
import ErrorView from '@/components/layout/state/error-view';
import EmptyView from '@/components/layout/state/empty-view';
import MatchesLoading from './match-list-loading';
import { LocationType } from '@/types/enums/location';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import NotificationBar from '@/components/shared/notification-bar';
import { UpcomingSportView } from '@/components/layout/state/upcoming-sport-view';

interface Props {
  type: string;
  location: string;
  offset: number;
}

const TOPIC_OPTIONS = [
  {
    value: MatchLeague.PremierLeague,
    icon: '/premier_league.png',
    label: 'Premier League',
  },
  { value: MatchLeague.LaLiga, icon: '/laliga.webp', label: 'La Liga' },
  {
    value: MatchLeague.Bundesliga,
    icon: '/champions_league.png',
    label: 'Bundesliga',
  },
  {
    value: MatchLeague.SerieA,
    icon: '/champions_league.png',
    label: 'Serie A',
  },
];

const LOCATION_OPTIONS = [
  { value: LocationType.Global, label: 'Global' },
  { value: LocationType.Africa, label: 'Africa' },
];

export default function MatchesClient(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { offset, type, location } = props;
  const [currentOffset, setCurrentOffset] = useState(offset || 0);
  const [allItems, setAllItems] = useState<MatchDto[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [localTopic, setLocalTopic] = useState(
    type || MatchLeague.PremierLeague
  );
  const [localLocation, setLocalLocation] = useState(
    location || LocationType.Global
  );
  const [activeSport, setActiveSport] = useState('football');

  // Fetch initial data
  const { data, isLoading, isError, error, refetch } = useGetMatches(
    localTopic,
    localLocation
  );

  // Track loaded offsets to prevent re-fetching
  const loadedOffsetsRef = useRef<Set<number>>(new Set());

  // Update items when data changes
  useEffect(() => {
    const isSoccer = activeSport === 'football';
    if (data && isSoccer && !loadedOffsetsRef.current.has(currentOffset)) {
      // Mark this offset as loaded
      loadedOffsetsRef.current.add(currentOffset);

      if (currentOffset === 0) {
        // Reset items on filter change
        setAllItems(data);
        // Clear loaded offsets when filters change
        loadedOffsetsRef.current.clear();
        loadedOffsetsRef.current.add(0);
      } else {
        // Append new items for load more
        setAllItems((prev) => [...prev, ...data]);
      }
      setIsLoadingMore(false);
    }
  }, [data, currentOffset, activeSport]);

  // Reset offset when filters change (but not offset itself)
  useEffect(() => {
    if (currentOffset === 0) return; // Already at 0, no need to reset

    // Only reset if filters changed (not offset)
    const urlOffset = searchParams?.get('offset')
      ? parseInt(searchParams.get('offset')!, 10)
      : 0;

    // If URL offset is 0 and we're not at 0, reset
    if (urlOffset === 0 && currentOffset !== 0) {
      setCurrentOffset(0);
      setAllItems([]);
      setHasMore(true);
    }
  }, [localTopic, localLocation, searchParams, currentOffset]);

  // Handle filter changes
  const handleLocationChange = (value: string) => {
    if (value === localLocation) return;
    setLocalLocation(value);
    setCurrentOffset(0);
    setAllItems([]);
    setHasMore(true);
  };

  const handleTopicChange = (value: string) => {
    if (value === localTopic) return;
    setLocalTopic(value);
    setCurrentOffset(0);
    setAllItems([]);
    setHasMore(true);
    loadedOffsetsRef.current.clear();
  };

  const handleSportChange = (id: string) => {
    if (id === activeSport) return;

    setActiveSport(id);
    setCurrentOffset(0);
    setAllItems([]);
    loadedOffsetsRef.current.clear();

    if (id !== 'football') {
      setHasMore(false);
    } else {
      setHasMore(true);
      refetch();
    }
  };

  // Load more function
  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const newOffset = currentOffset + EVENTS_LIMIT;
    setCurrentOffset(newOffset);
  }, [currentOffset, isLoadingMore, hasMore]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0]?.isIntersecting &&
          hasMore &&
          !isLoadingMore &&
          !isLoading
        ) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, isLoadingMore, isLoading, handleLoadMore]);

  const handleOpenItem = (id: string) => {
    router.push(`/m/${id}`);
  };

  const isSoccer = activeSport === 'football';

  return (
    <DetailWidthWrapper className="px-3 md:px-6">
      <div className="h-10"></div>
      <NotificationBar />
      <MatchsListHeader
        topic={localTopic}
        location={localLocation}
        topics={TOPIC_OPTIONS}
        locations={LOCATION_OPTIONS}
        onLocationChange={handleLocationChange}
        onTopicChange={handleTopicChange}
        activeSport={activeSport}
        onSportChange={handleSportChange}
      />

      {/* main list layout */}
      <div className="mt-8">
        {isSoccer && isLoading && (!allItems || allItems.length === 0) && (
          <MatchesLoading />
        )}

        {/* error state */}
        {isSoccer && isError && allItems.length == 0 && (
          <ErrorView
            itemsname="match list"
            error={error.message}
            onRetry={refetch}
            className=""
          />
        )}

        {/* empty state or non-soccer upcoming state */}
        {!isSoccer ? (
          <UpcomingSportView
            sportId={activeSport}
            sportName={activeSport.toUpperCase()}
          />
        ) : (
          !isLoading &&
          !isError &&
          allItems.length === 0 && (
            <EmptyView itemsname="match list" className="py-20" />
          )
        )}

        {/* success view */}
        {isSoccer && !isLoading && !isError && allItems.length !== 0 && (
          <div className="pb-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {allItems.map((item, index) => (
                <MatchesItem
                  key={item.Id}
                  onClick={() => handleOpenItem(item.Id)}
                  item={item}
                  index={index}
                />
              ))}
            </div>

            {/* Load More */}
            {(hasMore || isLoadingMore) && <p>....</p>}

            {/* all loaded */}
            {!hasMore && allItems.length > 0 && <p>---</p>}
          </div>
        )}
      </div>
    </DetailWidthWrapper>
  );
}
