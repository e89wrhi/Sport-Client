import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import Image from 'next/image';
import React from 'react';
import {
  Trophy,
  Dribbble,
  Gamepad2,
  Swords,
  Activity,
  Flame,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  topic: string;
  location: string;
  topics: { value: string; icon: string; label: string }[];
  locations: { value: string; label: string }[];
  onTopicChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  activeSport: string;
  onSportChange: (id: string) => void;
}

const SPORTS = [
  { id: 'football', label: 'Football', icon: Trophy, active: true },
  { id: 'nba', label: 'NBA', icon: Dribbble, active: false },
  { id: 'nfl', label: 'NFL', icon: Activity, active: false },
  { id: 'ufc', label: 'UFC', icon: Swords, active: false },
  { id: 'esports', label: 'eSports', icon: Gamepad2, active: false },
  { id: 'f1', label: 'F1', icon: Flame, active: false },
];

export default function MatchsListHeader(props: Props) {
  const {
    topic,
    topics,
    location,
    locations,
    onLocationChange,
    onTopicChange,
    activeSport,
    onSportChange,
  } = props;

  return (
    <div className="relative">
      <div className="flex flex-col gap-8 md:gap-10">
        {/* Sport Navigation Tabs */}
        <div className="w-full overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-4">
            {SPORTS.map((sport) => {
              const isActive = activeSport === sport.id;
              return (
                <button
                  key={sport.id}
                  onClick={() => onSportChange(sport.id)}
                  className={`
                    relative group flex items-center gap-3 px-6 py-4 rounded-[2rem] border transition-all duration-500
                    ${
                      isActive
                        ? 'bg-primary border-primary shadow-[0_10px_30px_rgba(var(--primary),0.3)]'
                        : 'bg-card/40 border-border/40 hover:border-primary/50'
                    }
                  `}
                >
                  <sport.icon
                    className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary'}`}
                  />
                  <span
                    className={`text-sm font-black uppercase tracking-widest ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                  >
                    {sport.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-[2rem] bg-primary -z-10"
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-muted/30 p-2 md:p-2 rounded-3xl md:rounded-[2rem] border border-border/40 backdrop-blur-md">
            <Select value={topic} onValueChange={onTopicChange}>
              <SelectTrigger className="h-11 sm:w-[180px] rounded-2xl md:rounded-full border-none bg-background shadow-sm px-4 text-sm font-bold backdrop-blur-sm transition-all hover:bg-accent/10 focus:ring-primary/20">
                <div className="flex items-center gap-2">
                  {topics.find((t) => t.value === topic)?.icon && (
                    <Image
                      height={20}
                      width={20}
                      alt={topic}
                      src={topics.find((t) => t.value === topic)!.icon}
                      className="h-4 w-4 bg-white rounded-full object-cover"
                    />
                  )}
                  <span className="truncate">
                    {topics.find((t) => t.value === topic)?.label}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-border/50 bg-background/80 backdrop-blur-xl">
                {topics.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="rounded-xl focus:bg-accent/50"
                  >
                    <div className="flex items-center gap-3 py-1">
                      <Image
                        height={24}
                        width={24}
                        alt={option.label}
                        src={option.icon}
                        className="h-5 w-5 bg-white rounded-full object-cover"
                      />
                      <span className="font-bold">{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={location} onValueChange={onLocationChange}>
              <SelectTrigger className="h-11 sm:w-[120px] rounded-2xl md:rounded-full border-none bg-background shadow-sm px-4 text-sm font-bold backdrop-blur-sm transition-all hover:bg-accent/10 focus:ring-primary/20">
                <span>
                  {locations.find((l) => l.value === location)?.label}
                </span>
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-border/50 bg-background/80 backdrop-blur-xl">
                {locations.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="rounded-xl focus:bg-accent/50"
                  >
                    <span className="font-bold">{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="mt-8 h-px w-full bg-gradient-to-r from-border/0 via-border/50 to-border/0" />
    </div>
  );
}
