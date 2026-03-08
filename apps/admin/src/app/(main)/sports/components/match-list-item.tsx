import { MatchDto } from '@/types/api/sport/match';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { CalendarIcon, TrophyIcon, Settings, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

interface MatchCardProps {
  item: MatchDto;
  index: number;
  onClick: (id: string) => void;
}

export function MatchesItem({ item, onClick }: MatchCardProps) {
  const isLive = item.Status?.toLowerCase() === 'live';
  const isFinished = item.Status?.toLowerCase() === 'over';

  const formattedDate = item.StartAt
    ? format(new Date(item.StartAt), 'MMM d, h:mm a')
    : 'TBD';

  return (
    <Card className="group relative border-none p-4 rounded-4xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 bg-card hover:bg-accent/5">
      <CardContent className="p-5" onClick={() => onClick(item.Id)}>
        {/* Teams and Score */}
        <div className="flex items-center justify-between gap-4 cursor-pointer">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <Avatar className="w-22 h-22 bg-muted p-2">
              <AvatarImage
                src={item.HomeTeam}
                alt={item.HomeTeam}
                className="object-contain"
              />
              <AvatarFallback className="font-bold">
                {item.HomeTeam.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold text-center leading-tight line-clamp-2 min-h-[2.5em] flex items-center justify-center">
              {item.HomeTeam}
            </span>
          </div>

          {/* Score / VS */}
          <div className="flex flex-col items-center gap-1 w-24 shrink-0">
            {isLive || isFinished ? (
              <div className="flex items-center justify-center gap-2 text-3xl font-black tabular-nums tracking-tighter">
                <span>{item.HomeTeamScore}</span>
                <span className="text-muted-foreground/30">-</span>
                <span>{item.AwayTeamScore}</span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-muted-foreground/50">
                VS
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <Avatar className="w-22 h-22 bg-muted p-2">
              <AvatarImage
                src={item.AwayTeam}
                alt={item.AwayTeam}
                className="object-contain"
              />
              <AvatarFallback className="font-bold">
                {item.AwayTeam.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold text-center leading-tight line-clamp-2 min-h-[2.5em] flex items-center justify-center">
              {item.AwayTeam}
            </span>
          </div>
        </div>

        {/* Header: League & Status */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center mt-5 gap-2 text-muted-foreground">
            <TrophyIcon className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              {item.League}
            </span>
          </div>
          <div className="my-6 flex items-center justify-center text-muted-foreground text-xs font-medium">
            <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <Badge
            variant={isLive ? 'destructive' : 'secondary'}
            className="rounded-full px-3"
          >
            {item.Status}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <Link
            href={`/sports/${item.Id}/update`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="outline" size="sm" className="rounded-full gap-1">
              <Settings className="w-3.5 h-3.5" />
              Update Info
            </Button>
          </Link>
          <Link
            href={`/sports/${item.Id}/score`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="outline" size="sm" className="rounded-full gap-1">
              <TrophyIcon className="w-3.5 h-3.5" />
              Update Score
            </Button>
          </Link>
          <Link
            href={`/sports/${item.Id}/addevent`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="outline" size="sm" className="rounded-full gap-1">
              <PlusCircle className="w-3.5 h-3.5" />
              Add Event
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
