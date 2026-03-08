'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoadingView from '@/components/layout/state/loading-view';
import EmptyView from '@/components/layout/state/empty-view';
import { Trophy } from 'lucide-react';
import { showToast } from '@/components/shared/toast';
import { useGetMatch } from '@/lib/api/sport/getMatch';
import { useUpdateMatchScore } from '@/lib/api/sport/updateMatchScore';
import UpdateWidthWrapper from '@/components/layout/update-width-wrapper';
import { UpdateButton } from '@/components/shared/update-button';
import DetailHeader from '@/components/layout/detail-header';
import UpdateMatchScoreHeader from './match-update-score-header';
import { UpdateMatchScoreRequest } from '@/types/api/sport/score';
import ErrorView from '@/components/layout/state/error-view';

const formSchema = z.object({
  homeTeamScore: z.number().min(0),
  awayTeamScore: z.number().min(0),
});

type FormScores = z.infer<typeof formSchema>;

interface Props {
  id: string;
}

export default function UpdateMatchScoreClient({ id }: Props) {
  const { data, isLoading, isError, error, refetch } = useGetMatch(id);
  const updateMutation = useUpdateMatchScore();

  const { control, handleSubmit, reset, formState } = useForm<FormScores>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homeTeamScore: 0,
      awayTeamScore: 0,
    },
    mode: 'all',
  });

  const isUpdating = updateMutation.isPending;

  useEffect(() => {
    if (!data) return;

    const values: FormScores = {
      homeTeamScore: data.HomeTeamScore ?? 0,
      awayTeamScore: data.AwayTeamScore ?? 0,
    };

    reset(values);
  }, [data, reset]);

  const handleUpdate = async (formData: FormScores) => {
    if (isUpdating) return;

    const payload: UpdateMatchScoreRequest = {
      MatchId: id,
      HomeTeamScore: formData.homeTeamScore,
      AwayTeamScore: formData.awayTeamScore,
    };

    try {
      const result = await updateMutation.mutateAsync(payload);
      if (result.Success) {
        showToast({
          title: 'Updated',
          type: 'success',
          description: 'Match score updated.',
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
      <UpdateMatchScoreHeader />

      <Card className="mx-auto max-w-4xl border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" /> Update Match Score
          </CardTitle>
          <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
            <span>{data.HomeTeam}</span>
            <span className="font-bold">VS</span>
            <span>{data.AwayTeam}</span>
          </div>
        </CardHeader>

        <form id="updateForm" onSubmit={handleSubmit(handleUpdate)}>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FieldGroup>
                <FieldLabel>{data.HomeTeam} Score</FieldLabel>
                <Controller
                  name="homeTeamScore"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="0"
                      className="text-center text-2xl h-16"
                      data-invalid={fieldState.invalid}
                    />
                  )}
                />
                {formState.errors.homeTeamScore && (
                  <FieldError>
                    {formState.errors.homeTeamScore.message}
                  </FieldError>
                )}
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>{data.AwayTeam} Score</FieldLabel>
                <Controller
                  name="awayTeamScore"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="0"
                      className="text-center text-2xl h-16"
                      data-invalid={fieldState.invalid}
                    />
                  )}
                />
                {formState.errors.awayTeamScore && (
                  <FieldError>
                    {formState.errors.awayTeamScore.message}
                  </FieldError>
                )}
              </FieldGroup>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end pt-6">
            <UpdateButton
              form="updateForm"
              isDisabled={isUpdating}
              isLoading={isUpdating}
              label="Update Score"
              fullWidth
            />
          </CardFooter>
        </form>
      </Card>
    </UpdateWidthWrapper>
  );
}
