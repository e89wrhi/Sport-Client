import { MatchDto } from '@/types/api/match';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { CalendarIcon, TrophyIcon } from 'lucide-react';

interface MatchCardProps {
  item: MatchDto;
  index: number;
  onClick: (id: string) => void;
}

export function MatchesItem({ item, onClick }: MatchCardProps) {
  const isLive = item.Status === 'live'; // Assuming status values, adjust as needed
  const isFinished = item.Status === 'finished';

  const formattedDate = item.StartAt
    ? format(new Date(item.StartAt), 'MMM d, h:mm a')
    : 'TBD';

  return (
    <Card
      onClick={() => onClick(item.Id)}
      className="group relative border-none p-3 md:p-4 rounded-4xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50 bg-card hover:bg-accent/5"
    >
      <CardContent className="p-4 md:p-5">
        {/* Teams and Score */}
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <Avatar className="w-14 h-14 md:w-22 md:h-22 bg-muted p-2">
              <AvatarImage
                src={item.HomeTeam}
                alt={item.HomeTeam}
                className="object-contain"
              />
              <AvatarFallback className="font-bold">
                {item.HomeTeam.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm md:text-xl font-bold text-center leading-tight line-clamp-2 min-h-[2.5em] flex items-center justify-center">
              {item.HomeTeam}
            </span>
          </div>

          {/* Score / VS */}
          <div className="flex flex-col items-center gap-1 w-16 md:w-24 shrink-0">
            {isLive || isFinished ? (
              <div className="flex items-center justify-center gap-2 text-xl md:text-3xl font-black tabular-nums tracking-tighter">
                <span>{item.HomeTeamScore}</span>
                <span className="text-muted-foreground/30">-</span>
                <span>{item.AwayTeamScore}</span>
              </div>
            ) : (
              <span className="text-lg md:text-2xl font-bold text-muted-foreground/50">
                VS
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <Avatar className="w-14 h-14 md:w-22 md:h-22 bg-muted p-2">
              <AvatarImage
                src={item.AwayTeam}
                alt={item.AwayTeam}
                className="object-contain"
              />
              <AvatarFallback className="font-bold">
                {item.AwayTeam.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm md:text-xl font-bold text-center leading-tight line-clamp-2 min-h-[2.5em] flex items-center justify-center">
              {item.AwayTeam}
            </span>
          </div>
        </div>
        {/* Header: League & Status */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center mt-5 gap-2 text-muted-foreground">
            <TrophyIcon className="w-4 h-4" />
            <span className="text-[10px] md:text-xs font-semibold tracking-wider uppercase">
              {item.League}
            </span>
          </div>
          <div className="my-4 md:my-6 flex items-center justify-center text-muted-foreground text-[10px] md:text-xs font-medium">
            <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full">
              <CalendarIcon className="w-3 md:w-3.5 h-3 md:h-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>{' '}
          <Badge
            variant={isLive ? 'destructive' : 'secondary'}
            className="rounded-full px-3 text-[10px] md:text-xs"
          >
            {item.Status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
