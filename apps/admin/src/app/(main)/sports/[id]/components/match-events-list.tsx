'use client';

import React, { useState } from 'react';
import { EventDto } from '@/types/api/event/events';
import { MatchEventType } from '@/types/enums/sport';
import { format } from 'date-fns';
import { Trash2, Tag, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDeleteMatchEvent } from '@/lib/api/event/deleteMatchEvent';
import { showToast } from '@/components/shared/toast';
import { useQueryClient } from '@tanstack/react-query';

interface MatchEventsListProps {
  events: EventDto[];
  matchId: string;
}

export function MatchEventsList({ events, matchId }: MatchEventsListProps) {
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const deleteMutation = useDeleteMatchEvent();
  const queryClient = useQueryClient();

  const getEventIcon = (type: string) => {
    switch (type) {
      case MatchEventType.Goal:
        return <span className="text-2xl">⚽</span>;
      case MatchEventType.RedCard:
        return (
          <span className="text-2xl text-red-600 font-bold italic">R</span>
        );
      case MatchEventType.YellowCard:
        return (
          <span className="text-2xl text-yellow-500 font-bold italic text-shadow">
            Y
          </span>
        );
      case MatchEventType.Substitution:
        return <span className="text-2xl">🔄</span>;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;

    try {
      // Since we are using mock data in useGetMatchEvents, we might not see the deletion reflected
      // unless we also mock the delete behavior or invalidate correctly.
      // However, for UI demonstration, we simulate the success.
      await deleteMutation.mutateAsync({ eventId: eventToDelete });

      showToast({
        title: 'Deleted',
        type: 'success',
        description: 'Event has been removed.',
      });

      // Invalidate events list
      queryClient.invalidateQueries({ queryKey: ['match-events', matchId] });
      setEventToDelete(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast({
        title: 'Error',
        type: 'error',
        description: 'Failed to delete event.',
      });
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-2xl font-black tracking-tight">Match Timeline</h3>
        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
          {events.length} Events
        </div>
      </div>

      <div className="relative space-y-4">
        {/* Timeline Line */}
        <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-border/50 hidden md:block" />

        {events.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground italic bg-muted/20 rounded-3xl">
            No events recorded for this match yet.
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.Id}
              className="group relative flex items-start gap-6 p-4 rounded-3xl hover:bg-muted/50 transition-all duration-300"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {getEventIcon(event.Type)}
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black tracking-tight">
                      {event.Title}
                    </span>
                    <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                      {event.Type}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                    onClick={() => setEventToDelete(event.Id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{format(new Date(event.Time), 'HH:mm')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>ID: {event.Id.substring(0, 8)}...</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <AlertDialog
        open={!!eventToDelete}
        onOpenChange={() => setEventToDelete(null)}
      >
        <AlertDialogContent className="rounded-3xl border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black tracking-tight">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This will permanently delete this match event. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-full">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete Event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
