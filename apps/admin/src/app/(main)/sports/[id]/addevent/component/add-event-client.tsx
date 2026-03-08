'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Info, Clock, Tag } from 'lucide-react';
import { showToast } from '@/components/shared/toast';
import { useAddMatchEvent } from '@/lib/api/event/addMatchEvent';
import UpdateWidthWrapper from '@/components/layout/update-width-wrapper';
import DetailHeader from '@/components/layout/detail-header';
import CreateEventHeader from './add-event-header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AddEventRequest } from '@/types/api/event/add-event';
import { CreateButton } from '@/components/shared/create-button';
import { MatchEventType } from '@/types/enums/sport';

const formSchema = z.object({
  title: z.string().min(1, 'Required'),
  type: z.string().min(1, 'Required'),
  time: z.string().min(1, 'Required'),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  id: string;
}

export default function CreateEventClient({ id }: Props) {
  const createMutation = useAddMatchEvent();

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      type: MatchEventType.Goal,
      time: '',
    },
    mode: 'all',
  });

  const isUpdating = createMutation.isPending;

  const handleUpdate = async (formData: FormValues) => {
    if (isUpdating) return;

    const payload: AddEventRequest = {
      MatchId: id,
      Title: formData.title,
      Time: new Date(formData.time),
      Type: formData.type,
    };

    try {
      const result = await createMutation.mutateAsync({ matchId: id, payload });

      if (result.Success) {
        reset();
        showToast({
          title: 'Success',
          type: 'success',
          description: 'Match event added.',
        });
      } else {
        showToast({
          title: 'Error',
          type: 'error',
          description: 'Add failed.',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      showToast({
        title: 'Error',
        type: 'error',
        description: e.message ?? 'Network error.',
      });
    }
  };

  return (
    <UpdateWidthWrapper>
      <DetailHeader />
      <CreateEventHeader />
      <Card className="mx-auto border-none">
        <form id="createform" onSubmit={handleSubmit(handleUpdate)}>
          <CardContent className="space-y-10 pt-6">
            {/* Event Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Event Details</h3>
              </div>

              <FieldGroup>
                <FieldLabel>Title</FieldLabel>
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      placeholder="Event Title (e.g. Goal by Messi)"
                      data-invalid={fieldState.invalid}
                    />
                  )}
                />
                {formState.errors.title && (
                  <FieldError>{formState.errors.title.message}</FieldError>
                )}
              </FieldGroup>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldGroup>
                  <FieldLabel>Event Type</FieldLabel>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          {Object.values(MatchEventType).map((type) => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                <span>{type}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Event Time</FieldLabel>
                  <Controller
                    name="time"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div className="relative">
                        <Input
                          type="datetime-local"
                          {...field}
                          data-invalid={fieldState.invalid}
                        />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    )}
                  />
                </FieldGroup>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>
      <div className="mt-8 flex justify-end px-6">
        <CreateButton
          form="createform"
          isDisabled={isUpdating}
          isLoading={isUpdating}
          label="Add Event"
          fullWidth
        />
      </div>
    </UpdateWidthWrapper>
  );
}
