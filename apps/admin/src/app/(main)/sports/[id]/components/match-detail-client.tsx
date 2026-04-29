'use client';

import React, { useEffect, useState } from 'react';
import { useGetMatch } from '@/lib/api/sport/getMatch';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';
import DetailHeader from '@/components/layout/detail-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import LoadingPageView from '@/components/layout/state/loading-page-view';
import ErrorView from '@/components/layout/state/error-view';
import EmptyView from '@/components/layout/state/empty-view';
import { Badge } from '@/components/ui/badge';
import {
  CalendarIcon,
  MapPinIcon,
  TrophyIcon,
  UserIcon,
  Settings,
  PlusCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { VoteChart } from './vote-chart';
import { LiveEventsFeed } from './live-events-feed';
import { useGetMatchEvents } from '@/lib/api/event/getMatchEvents';
import { ModeToggle } from '@/components/shared/mode-toggle';
import { EventDto } from '@/types/api/event/events';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MatchEventsList } from './match-events-list';

interface Props {
  id: string;
}

export const metadata: Metadata = {
  title: 'SnowBall | Match',
};

export default function MatchDetailClient({ id }: Props) {
  const { data, isLoading, isError, error, refetch } = useGetMatch(id);
  const { data: eventsData } = useGetMatchEvents(id);
  const [streamedEvents, setStreamedEvents] = useState<EventDto[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentIndex, setCurrentIndex] = useState(0);
  const getDelayByType = (type?: string) => {
    switch (type) {
      case 'Goal':
        return 2000; // dramatic
      case 'RedCard':
        return 1800;
      case 'YellowCard':
        return 1400;
      case 'Substitution':
        return 1200;
      default:
        return 900;
    }
  };

  useEffect(() => {
    if (!eventsData?.length) return;

    // Reset when new data arrives
    setStreamedEvents([]);
    setCurrentIndex(0);

    let timeout: NodeJS.Timeout;

    const streamNext = (index: number) => {
      if (index >= eventsData.length) return;

      const event = eventsData[index];
      if (!event) return;

      timeout = setTimeout(() => {
        setStreamedEvents((prev) => [...prev, event]);
        streamNext(index + 1);
      }, getDelayByType(event.Type));
    };

    streamNext(0);

    return () => clearTimeout(timeout);
  }, [eventsData]);

  if (isLoading) {
    return <LoadingPageView />;
  }

  if (isError) {
    return (
      <ErrorView
        itemsname="match"
        error={error.message}
        onRetry={refetch}
        className=""
      />
    );
  }

  if (!data) {
    return <EmptyView itemsname="match" className="" />;
  }

  const isLive = data.Status === 'live';
  const formattedDate = data.StartAt
    ? format(new Date(data.StartAt), 'PPP p')
    : 'TBD';

  return (
    <DetailWidthWrapper className="max-w-6xl">
      <DetailHeader
        dropdown={
          <div className="flex items-center gap-2">
            <Link href={`/sports/${id}/update`}>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2"
              >
                <Settings className="w-4 h-4" />
                Update Info
              </Button>
            </Link>
            <Link href={`/sports/${id}/score`}>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2"
              >
                <TrophyIcon className="w-4 h-4" />
                Update Score
              </Button>
            </Link>
            <Link href={`/sports/${id}/addevent`}>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add Event
              </Button>
            </Link>
            <ModeToggle />
          </div>
        }
      />

      <div className="mt-6 flex flex-col items-center gap-8 pb-20">
        {/* League & Status Badge */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-muted-foreground uppercase tracking-wider text-sm font-semibold">
            <TrophyIcon className="w-4 h-4" />
            <span>{data.League}</span>
          </div>
          <Badge
            variant={isLive ? 'destructive' : 'secondary'}
            className="text-lg px-4 py-1"
          >
            {data.Status}
          </Badge>
        </div>

        {/* Scoreboard */}
        <div className="relative w-full flex items-center justify-between max-w-6xl px-4 md:px-12 py-16 bg-card/80 backdrop-blur-sm rounded-[3rem] shadow-xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Home Team */}
          <div className="flex flex-col items-center gap-4 flex-1 z-10">
            <div className="relative">
              <Avatar className="w-24 h-24 md:w-36 md:h-36 border-4 border-muted/50 p-2 bg-background/50 backdrop-blur transition-transform group-hover:scale-105 duration-500">
                <AvatarImage
                  src={data.HomeTeam}
                  alt={data.HomeTeam}
                  className="object-contain"
                />
                <AvatarFallback className="text-3xl font-bold">
                  {data.HomeTeam.substring(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-orange-500 w-6 h-6 rounded-full border-4 border-card flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-center tracking-tight">
              {data.HomeTeam}
            </h2>
            <p className="text-muted-foreground text-xs uppercase font-black tracking-widest opacity-50">
              Home
            </p>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-3 mx-6 z-10">
            <div className="text-6xl md:text-8xl font-black tabular-nums tracking-tighter flex items-center gap-4 drop-shadow-2xl">
              <span className="text-primary">{data.HomeTeamScore}</span>
              <span className="text-muted-foreground/10">:</span>
              <span>{data.AwayTeamScore}</span>
            </div>
            {isLive ? (
              <Badge
                variant="destructive"
                className="animate-pulse px-4 py-1 font-black text-xs uppercase tracking-[0.2em]"
              >
                Live Now
              </Badge>
            ) : (
              <span className="text-muted-foreground/40 font-bold text-sm tracking-widest uppercase">
                Full Time
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-4 flex-1 z-10">
            <div className="relative">
              <Avatar className="w-24 h-24 md:w-36 md:h-36 border-4 border-muted/50 p-2 bg-background/50 backdrop-blur transition-transform group-hover:scale-105 duration-500">
                <AvatarImage
                  src={data.AwayTeam}
                  alt={data.AwayTeam}
                  className="object-contain"
                />
                <AvatarFallback className="text-3xl font-bold">
                  {data.AwayTeam.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-center tracking-tight">
              {data.AwayTeam}
            </h2>
            <p className="text-muted-foreground text-xs uppercase font-black tracking-widest opacity-50">
              Away
            </p>
          </div>
        </div>

        <div className="w-full gap-8 mt-4">
          {/* Voting Simulation & Chart */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black tracking-tight">
                Real-time Fan Voting
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Active Now
                </span>
              </div>
            </div>

            <VoteChart
              homeVotes={data.HomeVotesCount}
              awayVotes={data.AwayVotesCount}
              drawVotes={data.DrawVotesCount}
              homeTeamName={data.HomeTeam}
              awayTeamName={data.AwayTeam}
            />
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          <div className="bg-card/40 backdrop-blur border border-border/40 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] items-center gap-2 text-muted-foreground uppercase tracking-wider font-black">
                Kickoff Time
              </p>
              <p className="font-bold text-sm">{formattedDate}</p>
            </div>
          </div>
          <div className="bg-card/40 backdrop-blur border border-border/40 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <MapPinIcon className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] items-center gap-2 text-muted-foreground uppercase tracking-wider font-black">
                Stadium Venue
              </p>
              <p className="font-bold text-sm">-</p>
            </div>
          </div>
          <div className="bg-card/40 backdrop-blur border border-border/40 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center center justify-center">
              <UserIcon className="w-5 h-5 text-amber-500" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] items-center gap-2 text-muted-foreground uppercase tracking-wider font-black">
                Match Referee
              </p>
              <p className="font-bold text-sm">{data.Referee}</p>
            </div>
          </div>
        </div>

        <MatchEventsList events={eventsData || []} matchId={id} />
        <LiveEventsFeed events={streamedEvents} matchId={id} />
        <Separator className="max-w-4xl opacity-50" />
      </div>
    </DetailWidthWrapper>
  );
}
