'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Card, CardContent } from '@/components/ui/card';
import LoadingView from '@/components/layout/state/loading-view';
import EmptyView from '@/components/layout/state/empty-view';
import { showToast } from '@/components/shared/toast';
import { useGetMatch } from '@/lib/api/sport/getMatch';
import { useUpdateMatch } from '@/lib/api/sport/updateMatch';
import UpdateWidthWrapper from '@/components/layout/update-width-wrapper';
import { UpdateButton } from '@/components/shared/update-button';
import { UpdateMatchRequest } from '@/types/api/sport/update';
import DetailHeader from '@/components/layout/detail-header';
import UpdateMatchInfoHeader from './match-update-info-header';
import { MatchStatus, MatchLeague } from '@/types/enums/sport';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Info, Users, Trophy, Calendar } from 'lucide-react';
import ErrorView from '@/components/layout/state/error-view';

const formSchema = z.object({
  homeTeam: z.string().min(1, 'Required'),
  awayTeam: z.string().min(1, 'Required'),
  league: z.string().min(1, 'Required'),
  status: z.string().min(1, 'Required'),
  startAt: z.string().min(1, 'Required'),
  finishAt: z.string().min(1, 'Required'),
  referee: z.string().min(1, 'Required'),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  id: string;
}

export default function UpdateMatchInfoClient({ id }: Props) {
  const { data, isLoading, isError, error, refetch } = useGetMatch(id);
  const updateMutation = useUpdateMatch();

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homeTeam: '',
      awayTeam: '',
      league: MatchLeague.PremierLeague,
      status: MatchStatus.Upcoming,
      startAt: '',
      finishAt: '',
      referee: '',
    },
    mode: 'all',
  });

  const isUpdating = updateMutation.isPending;

  useEffect(() => {
    if (!data) return;

    const values: FormValues = {
      homeTeam: data.HomeTeam ?? '',
      awayTeam: data.AwayTeam ?? '',
      league: data.League ?? MatchLeague.PremierLeague,
      status: data.Status ?? MatchStatus.Upcoming,
      startAt: data.StartAt
        ? new Date(data.StartAt).toISOString().slice(0, 16)
        : '',
      finishAt: data.FinishAt
        ? new Date(data.FinishAt).toISOString().slice(0, 16)
        : '',
      referee: data.Referee ?? '',
    };

    reset(values);
  }, [data, reset]);

  const handleUpdate = async (formData: FormValues) => {
    if (isUpdating) return;

    const payload: UpdateMatchRequest = {
      MatchId: id,
      HomeTeam: formData.homeTeam,
      AwayTeam: formData.awayTeam,
      League: formData.league,
      Status: formData.status,
      StartAt: new Date(formData.startAt),
      FinishAt: new Date(formData.finishAt),
      Referee: formData.referee,
    };

    try {
      const result = await updateMutation.mutateAsync({
        matchId: id,
        payload: payload,
      });

      if (result.Success) {
        showToast({
          title: 'Updated',
          type: 'success',
          description: 'Match info updated successfully.',
        });
      } else {
        showToast({
          title: 'Failed',
          type: 'error',
          description: 'Update failed.',
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

  if (isLoading && !data) {
    return <LoadingView itemsname="match" />;
  }

  if (isError && !data) {
    return (
      <ErrorView
        itemsname="match"
        error={error.message}
        onRetry={refetch}
        className=""
      />
    );
  }

  if (!data) return <EmptyView itemsname="match" />;

  return (
    <UpdateWidthWrapper>
      <DetailHeader />
      <UpdateMatchInfoHeader />
      <Card className="mx-auto border-none">
        <form id="updateForm" onSubmit={handleSubmit(handleUpdate)}>
          <CardContent className="space-y-10 pt-6">
            {/* Teams Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Teams</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldGroup>
                  <FieldLabel>Home Team</FieldLabel>
                  <Controller
                    name="homeTeam"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        placeholder="Home Team Name"
                        data-invalid={fieldState.invalid}
                      />
                    )}
                  />
                  {formState.errors.homeTeam && (
                    <FieldError>{formState.errors.homeTeam.message}</FieldError>
                  )}
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Away Team</FieldLabel>
                  <Controller
                    name="awayTeam"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        placeholder="Away Team Name"
                        data-invalid={fieldState.invalid}
                      />
                    )}
                  />
                  {formState.errors.awayTeam && (
                    <FieldError>{formState.errors.awayTeam.message}</FieldError>
                  )}
                </FieldGroup>
              </div>
            </div>

            {/* League & Status Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Competition</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldGroup>
                  <FieldLabel>League</FieldLabel>
                  <Controller
                    name="league"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select League" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          {Object.values(MatchLeague).map((league) => (
                            <SelectItem key={league} value={league}>
                              {league}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Status</FieldLabel>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                          {Object.values(MatchStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldGroup>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Schedule</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldGroup>
                  <FieldLabel>Start Time</FieldLabel>
                  <Controller
                    name="startAt"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        type="datetime-local"
                        {...field}
                        data-invalid={fieldState.invalid}
                      />
                    )}
                  />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>Finish Time</FieldLabel>
                  <Controller
                    name="finishAt"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        type="datetime-local"
                        {...field}
                        data-invalid={fieldState.invalid}
                      />
                    )}
                  />
                </FieldGroup>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Additional Details</h3>
              </div>
              <FieldGroup>
                <FieldLabel>Referee</FieldLabel>
                <Controller
                  name="referee"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      placeholder="Referee Name"
                      data-invalid={fieldState.invalid}
                    />
                  )}
                />
              </FieldGroup>
            </div>
          </CardContent>
        </form>
      </Card>
      <div className="mt-8 flex justify-end px-6">
        <UpdateButton
          form="updateForm"
          isDisabled={isUpdating}
          isLoading={isUpdating}
          label="Update Match Info"
          fullWidth
        />
      </div>
    </UpdateWidthWrapper>
  );
}
