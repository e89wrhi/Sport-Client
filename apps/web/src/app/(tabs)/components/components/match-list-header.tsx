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
    <div className="mt-8 md:mt-12">
      {/* list header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-black w-full pt-6 space-y-8">
        {/* Bottom Row: Title and Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-7xl font-black tracking-tight">
              Matches
            </h1>
          </div>
        </div>

        <Separator className="mt-7 md:mt-10" />
      </div>

      {/* Filters (Topic + Location) */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 mb-6">
        <Select value={topic} onValueChange={onTopicChange}>
          <SelectTrigger
            className="shadow-none rounded-full w-full sm:w-56 h-12 border-none 
          bg-neutral-200 dark:bg-neutral-800 
          text-gray-800 dark:text-gray-100 hover:bg-gray-200
          text-lg"
          >
            {topic}
          </SelectTrigger>
          <SelectContent>
            {topics.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <Image
                  height={40}
                  width={40}
                  alt={topic}
                  src={option.icon}
                  className="h-6 w-6 object-cover rounded-full"
                />{' '}
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={location} onValueChange={onLocationChange}>
          <SelectTrigger
            className="shadow-none rounded-full w-full sm:w-56 h-12 border-0 
          bg-neutral-200 dark:bg-neutral-800 
          text-gray-800 dark:text-gray-100 hover:bg-gray-200
          text-lg"
          >
            {location}
          </SelectTrigger>
          <SelectContent>
            {locations.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
