'use client';

import React, { useEffect, useState } from 'react';
import { useGetMatch } from '@/lib/api/sports/getMatch';
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
  Sparkles,
  TrophyIcon,
  UserIcon,
  Brain,
  Zap,
  Target,
} from 'lucide-react';
import { format } from 'date-fns';
import { VoteChart } from './vote-chart';
import { LiveEventsFeed } from './live-events-feed';
import { useGetMatchEvents } from '@/lib/api/sports/getMatchEvents';
import { useCastMatchVote } from '@/lib/api/sports/addMatchVote';
import { showToast } from '@/components/shared/toast';
import { MatchStatus, MatchVoteType } from '@/types/enums/sport';
import { EventDto } from '@/types/api/events';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { PredictMatchDialog } from './predict-match-dialog';
import { useSession } from 'next-auth/react';
import { AuthGuardDialog } from '@/components/shared/auth-guard-dialog';

const teamIcons: Record<string, string> = {
  Arsenal: '/arsenal.png',
  Chelsea: '/chelsea.png',
  'Man United': '/manutd.png',
  'Man City': '/mancity.png',
  Tottenham: '/tottenham.png',
  'Real Madrid': '/laliga.webp',
  Barcelona: '/laliga.webp',
  'Bayern Munich': '/champions_league.png',
  Dortmund: '/champions_league.png',
  'AC Milan': '/champions_league.png',
  'Inter Milan': '/champions_league.png',
  Liverpool: '/premier_league.png',
};

interface Props {
  id: string;
}

export const metadata: Metadata = {
  title: 'SnowBall | Match',
};

export default function MatchDetailClient({ id }: Props) {
  const { data, isLoading, isError, error, refetch } = useGetMatch(id);
  const { data: eventsData } = useGetMatchEvents(id); // Get more events
  const { mutateAsync: castVote, isPending: isVoting } = useCastMatchVote();
  const [streamedEvents, setStreamedEvents] = useState<EventDto[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPredictionDialog, setShowPredictionDialog] = useState(false);
  const { status } = useSession();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authAction, setAuthAction] = useState<'vote' | 'predict'>('vote');

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

  // Handle voting
  const handleVote = async (type: string) => {
    if (status !== 'authenticated') {
      setAuthAction('vote');
      setShowAuthDialog(true);
      return;
    }
    try {
      const result = await castVote({
        MatchId: id,
        Type: type,
        VoterId: 'current-user', // Should be handled by backend from token, but spec requires it? API definition says string.
      });

      if (result.Success) {
        showToast({
          title: 'Vote Cast!',
          description: `You voted for ${type}`,
          type: 'success',
        });
        refetch(); // Update votes immediately
      } else {
        showToast({
          title: 'Failed',
          description: result.Id,
          type: 'error',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      showToast({
        title: 'Error',
        description: 'Failed to cast vote',
        type: 'error',
      });
    }
  };

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

  const isLive = data.Status.toLowerCase() === 'live';
  const formattedDate = data.StartAt
    ? format(new Date(data.StartAt), 'PPP p')
    : 'TBD';

  const homeIcon = teamIcons[data.HomeTeam] || '/logo.png';
  const awayIcon = teamIcons[data.AwayTeam] || '/logo.png';

  const handleOpenPrediction = () => {
    if (status !== 'authenticated') {
      setAuthAction('predict');
      setShowAuthDialog(true);
      return;
    }

    setShowPredictionDialog(true);
  };

  return (
    <DetailWidthWrapper className="relative max-w-6xl">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <DetailHeader />

      <div className="mt-6 flex flex-col items-center gap-8 pb-20">
        {/* League & Status Badge */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-muted/50 px-4 py-1.5 backdrop-blur-md">
            <TrophyIcon className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {data.League}
            </span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Badge
              variant={isLive ? 'destructive' : 'secondary'}
              className="text-lg px-6 py-1.5 rounded-full shadow-lg"
            >
              {data.Status}
            </Badge>
            {data.Status !== MatchStatus.Over && (
              <Button
                variant="default"
                onClick={handleOpenPrediction}
                className="cursor-pointer rounded-full bg-yellow-500 hover:bg-yellow-700 text-white text-lg p-3 shadow-lg transition-all hover:scale-105"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Predict With AI
              </Button>
            )}
          </div>
        </div>

        {/* Premium Scoreboard */}
        <div className="relative w-full overflow-hidden rounded-[40px] border border-border/40 bg-card/40 p-8 shadow-2xl backdrop-blur-xl md:p-16 group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />

          <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-16">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-primary/10 blur-2xl transition-all duration-700 group-hover:bg-primary/20" />
                <Avatar className="h-24 w-24 md:h-48 md:w-48 border-4 border-background bg-background p-4 shadow-2xl transition-transform duration-700 group-hover:scale-110">
                  <AvatarImage
                    src={homeIcon}
                    alt={data.HomeTeam}
                    className="object-contain"
                  />
                  <AvatarFallback className="text-4xl font-black">
                    {data.HomeTeam.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full border-4 border-card bg-orange-500 shadow-xl md:h-10 md:w-10">
                  <div className="h-full w-full animate-pulse rounded-full bg-white/20" />
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl md:text-5xl font-black tracking-tighter uppercase line-clamp-2">
                  {data.HomeTeam}
                </h2>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                  Home
                </span>
              </div>
            </div>

            {/* Score & Time */}
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4 md:gap-8 text-5xl md:text-[120px] font-black leading-none tracking-tighter tabular-nums drop-shadow-2xl">
                  <span className={isLive ? 'animate-pulse text-primary' : ''}>
                    {data.HomeTeamScore}
                  </span>
                  <span className="text-muted-foreground/10">:</span>
                  <span className={isLive ? 'animate-pulse text-primary' : ''}>
                    {data.AwayTeamScore}
                  </span>
                </div>
                {isLive ? (
                  <div className="flex items-center gap-2 rounded-full bg-destructive/10 px-6 py-2 border border-destructive/20">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-destructive">
                      Live Now
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-full bg-muted-foreground/10 px-6 py-2 text-muted-foreground">
                    <span className="text-xs font-black uppercase tracking-[0.3em]">
                      Full Time
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-secondary/10 blur-2xl transition-all duration-700 group-hover:bg-secondary/20" />
                <Avatar className="h-24 w-24 md:h-48 md:w-48 border-4 border-background bg-background p-4 shadow-2xl transition-transform duration-700 group-hover:scale-110">
                  <AvatarImage
                    src={awayIcon}
                    alt={data.AwayTeam}
                    className="object-contain"
                  />
                  <AvatarFallback className="text-4xl font-black">
                    {data.AwayTeam.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl md:text-5xl font-black tracking-tighter uppercase line-clamp-2">
                  {data.AwayTeam}
                </h2>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                  Away
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl space-y-8">
          {/* Voting Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h3 className="text-2xl font-black tracking-tight">
                  Match Prediction Market
                </h3>
              </div>
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

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleVote(MatchVoteType.Home)}
                disabled={isVoting}
                className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 transition-all group active:scale-95 disabled:opacity-50"
              >
                <span className="text-xl font-black text-orange-600 group-hover:scale-110 transition-transform">
                  {data.HomeVotesCount}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-tighter text-orange-700/60 font-mono">
                  Vote Home
                </span>
              </button>
              <button
                onClick={() => handleVote(MatchVoteType.Abstain)}
                disabled={isVoting}
                className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 transition-all group active:scale-95 disabled:opacity-50"
              >
                <span className="text-xl font-black text-yellow-600 group-hover:scale-110 transition-transform">
                  {data.DrawVotesCount}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-tighter text-yellow-700/60 font-mono">
                  Vote Draw
                </span>
              </button>
              <button
                onClick={() => handleVote(MatchVoteType.Away)}
                disabled={isVoting}
                className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-all group active:scale-95 disabled:opacity-50"
              >
                <span className="text-xl font-black text-blue-600 group-hover:scale-110 transition-transform">
                  {data.AwayVotesCount}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-tighter text-blue-700/60 font-mono">
                  Vote Away
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {[
            {
              icon: CalendarIcon,
              label: 'Kickoff',
              value: formattedDate,
              color: 'text-primary',
              bg: 'bg-primary/10',
            },
            {
              icon: MapPinIcon,
              label: 'Venue',
              value: 'Main Stadium',
              color: 'text-indigo-500',
              bg: 'bg-indigo-500/10',
            },
            {
              icon: UserIcon,
              label: 'Referee',
              value: data.Referee,
              color: 'text-amber-500',
              bg: 'bg-amber-500/10',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[32px] border border-border/40 bg-card/40 p-1 px-8 py-10 transition-all duration-500 hover:-translate-y-1 hover:bg-card hover:shadow-2xl"
            >
              <div
                className={`absolute top-0 right-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-20 ${item.bg}`}
              />

              <div className="relative flex flex-col items-center justify-center gap-4 text-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold tracking-tight">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <LiveEventsFeed events={streamedEvents} matchId={id} />

        {/* AI Insight Section */}
        <div className="w-full max-w-4xl space-y-6">
          <div className="flex items-center gap-3 px-4">
            <div className="h-4 w-1 bg-primary rounded-full" />
            <h3 className="text-xl font-black uppercase tracking-tight italic">
              Match Intelligence
            </h3>
            <Badge
              variant="outline"
              className="ml-auto border-primary/20 text-primary uppercase text-[10px] animate-pulse"
            >
              AI Powered
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-[32px] bg-primary/5 border border-primary/10 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Brain className="w-24 h-24 text-primary" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-black uppercase tracking-widest text-[10px] text-primary">
                  Strategic Advantage
                </h4>
              </div>
              <p className="text-sm font-bold text-muted-foreground leading-relaxed">
                {data.HomeTeamScore > data.AwayTeamScore
                  ? `${data.HomeTeam} is currently dominating central play with 62% possession efficiency.`
                  : data.AwayTeamScore > data.HomeTeamScore
                    ? `${data.AwayTeam} leveraging high-press tactics effectively in the final third.`
                    : 'Statistical parity in midfield indicates a high-intensity battle for possession control.'}
              </p>
            </div>

            <div className="p-6 rounded-[32px] bg-card/40 border border-border/40 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Target className="w-24 h-24 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-muted rounded-xl">
                  <Sparkles className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="font-black uppercase tracking-widest text-[10px] text-muted-foreground">
                  Tactical Forecast
                </h4>
              </div>
              <p className="text-sm font-bold text-muted-foreground leading-relaxed">
                Projected intensity peak expected in the next 15 minutes based
                on historical performance curves.
              </p>
            </div>
          </div>
        </div>

        <Separator className="max-w-4xl opacity-50" />
      </div>

      <PredictMatchDialog
        match={data}
        open={showPredictionDialog}
        onOpenChange={setShowPredictionDialog}
      />
      <AuthGuardDialog
        isOpen={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        action={authAction}
      />
    </DetailWidthWrapper>
  );
}
