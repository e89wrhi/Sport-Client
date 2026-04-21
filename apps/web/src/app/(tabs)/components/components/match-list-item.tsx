import { MatchDto } from '@/types/api/match';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface MatchCardProps {
  item: MatchDto;
  index: number;
  onClick: (id: string) => void;
}

const teamIcons: Record<string, string> = {
  Arsenal: '/arsenal.png',
  Chelsea: '/chelsea.png',
  'Man United': '/manutd.png',
  'Man City': '/mancity.png',
  Tottenham: '/tottenham.png',
  'Real Madrid': '/laliga.webp', // Using league icon as placeholder if team icon missing
  Barcelona: '/laliga.webp',
  'Bayern Munich': '/champions_league.png',
  Dortmund: '/champions_league.png',
  'AC Milan': '/champions_league.png',
  'Inter Milan': '/champions_league.png',
  Liverpool: '/premier_league.png',
};

export function MatchesItem({ item, onClick }: MatchCardProps) {
  const isLive = item.Status.toLowerCase() === 'live';
  const isFinished = item.Status.toLowerCase() === 'finished';

  const homeIcon = teamIcons[item.HomeTeam] || '/logo.png';
  const awayIcon = teamIcons[item.AwayTeam] || '/logo.png';

  const formattedDate = item.StartAt
    ? format(new Date(item.StartAt), 'MMM d')
    : 'TBD';
  const formattedTime = item.StartAt
    ? format(new Date(item.StartAt), 'h:mm a')
    : '';

  return (
    <Card
      onClick={() => onClick(item.Id)}
      className="group relative cursor-pointer overflow-hidden border-none bg-card/40 transition-all duration-500 hover:bg-card hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 active:scale-[0.98] rounded-[32px] backdrop-blur-sm"
    >
      <CardContent className="relative p-6 md:p-8">
        {/* Main Scoreboard Area */}
        <div className="grid grid-cols-[1fr_auto_1fr] mt-6 items-center gap-4 md:gap-8">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-primary/10 blur-xl transition-all duration-500 group-hover:bg-primary/20" />
              <Avatar className="h-16 w-16 md:h-24 md:w-24 border-4 border-background bg-background p-3 shadow-xl transition-transform duration-500 group-hover:scale-110">
                <AvatarImage
                  src={homeIcon}
                  alt={item.HomeTeam}
                  className="object-contain"
                />
                <AvatarFallback className="text-xl font-black">
                  {item.HomeTeam.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="max-w-[120px] text-sm md:text-lg font-black leading-tight tracking-tight">
              {item.HomeTeam}
            </span>
          </div>

          {/* Time/Score Section */}
          <div className="flex flex-col items-center justify-center gap-3">
            {isLive || isFinished ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-4 text-3xl md:text-5xl font-black tracking-tighter">
                  <span className={isLive ? 'animate-pulse text-primary' : ''}>
                    {item.HomeTeamScore}
                  </span>
                  <span className="text-muted-foreground/30">:</span>
                  <span className={isLive ? 'animate-pulse text-primary' : ''}>
                    {item.AwayTeamScore}
                  </span>
                </div>
                {isLive && (
                  <div className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">
                      Live
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-black text-muted-foreground/40 tracking-wider">
                  VS
                </span>
                <span className="text-lg md:text-xl font-black tracking-tight">
                  {formattedTime}
                </span>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-secondary/10 blur-xl transition-all duration-500 group-hover:bg-secondary/20" />
              <Avatar className="h-16 w-16 md:h-24 md:w-24 border-4 border-background bg-background p-3 shadow-xl transition-transform duration-500 group-hover:scale-110">
                <AvatarImage
                  src={awayIcon}
                  alt={item.AwayTeam}
                  className="object-contain"
                />
                <AvatarFallback className="text-xl font-black">
                  {item.AwayTeam.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="max-w-[120px] text-sm md:text-lg font-black leading-tight tracking-tight">
              {item.AwayTeam}
            </span>
          </div>
        </div>

        {/* Bottom Status / CTA */}
        <div className="mt-10 flex justify-center">
          {!isLive && !isFinished && (
            <div className="h-1 w-12 rounded-full bg-border/50 transition-all duration-500 group-hover:w-24 group-hover:bg-primary/50" />
          )}
          {isFinished && (
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30">
              Final Score
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
