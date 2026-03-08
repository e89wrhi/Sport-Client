'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { MatchDto } from '@/types/api/match';
import { usePredictMatch } from '@/lib/api/intelligence/predictMatch';
import { useSession } from 'next-auth/react';
import { AuthGuardDialog } from '@/components/shared/auth-guard-dialog';

interface PredictDialogProps {
  match: MatchDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AI_MODELS = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'claude-3', label: 'Claude 3' },
];

export function PredictMatchDialog({
  match,
  open,
  onOpenChange,
}: PredictDialogProps) {
  const { mutateAsync: predictMatch, isPending: isProcessing } =
    usePredictMatch();
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const { status } = useSession();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authAction, setAuthAction] = useState<'predict'>('predict');

  const handlePrediction = async () => {
    if (status !== 'authenticated') {
      setAuthAction('predict');
      setShowAuthDialog(true);
      return;
    }

    try {
      await predictMatch({
        MatchId: match.Id,
        ModelId: selectedModel,
      });

      toast.success('Prediction generated!', {
        description: 'Your AI prediction has been created successfully.',
      });
      onOpenChange(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Prediction failed', {
        description: 'Please try again later.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Predict with AI</DialogTitle>
          <DialogDescription>
            Generate an AI-powered prediction of &quot;{match.HomeTeam}&quot; vs
            &quot;{match.AwayTeam}&quot;
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="ai-model">Select AI Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger id="ai-model">
                <SelectValue placeholder="Choose an AI model" />
              </SelectTrigger>
              <SelectContent>
                {AI_MODELS.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <p className="font-medium text-sm">Match Preview</p>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {match.HomeTeam} vs {match.AwayTeam}
            </p>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>
              The AI will analyze the match content and generate a concise
              prediction.
            </p>
          </div>
        </div>
        <AuthGuardDialog
          isOpen={showAuthDialog}
          onOpenChange={setShowAuthDialog}
          action={authAction}
        />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button onClick={handlePrediction} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Prediction
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
