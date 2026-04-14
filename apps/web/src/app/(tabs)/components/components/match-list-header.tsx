import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import React from 'react';

interface Props {
  topic: string;
  location: string;
  topics: { value: string; icon: string; label: string }[];
  locations: { value: string; label: string }[];
  onTopicChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

export default function MatchsListHeader(props: Props) {
  const {
    topic,
    topics,
    location,
    locations,
    onLocationChange,
    onTopicChange,
  } = props;

  return (
    <div className="relative pt-24 pb-12">
      {/* Background decoration */}
      <div className="absolute top-0' left-1/4 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute top-20 right-1/4 -z-10 h-64 w-64 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
            Live Rankings & Schedule
          </label>
          <h1 className="text-5xl font-black tracking-tighter md:text-8xl">
            MATCHES
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Select value={topic} onValueChange={onTopicChange}>
            <SelectTrigger
              className="h-11 w-[180px] rounded-full border-border/50 bg-card/50 px-4 text-sm font-medium backdrop-blur-sm transition-all hover:bg-accent/10 focus:ring-primary/20"
            >
              <div className="flex items-center gap-2">
                {topics.find((t) => t.value === topic)?.icon && (
                  <Image
                    height={20}
                    width={20}
                    alt={topic}
                    src={topics.find((t) => t.value === topic)!.icon}
                    className="h-4 w-4 rounded-full object-cover"
                  />
                )}
                <span>{topics.find((t) => t.value === topic)?.label}</span>
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
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <span className="font-medium">{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={onLocationChange}>
            <SelectTrigger
              className="h-11 w-[140px] rounded-full border-border/50 bg-card/50 px-4 text-sm font-medium backdrop-blur-sm transition-all hover:bg-accent/10 focus:ring-primary/20"
            >
              <span>{locations.find((l) => l.value === location)?.label}</span>
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-border/50 bg-background/80 backdrop-blur-xl">
              {locations.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="rounded-xl focus:bg-accent/50"
                >
                  <span className="font-medium">{option.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-8 h-px w-full bg-gradient-to-r from-border/0 via-border/50 to-border/0" />
    </div>
  );
}
