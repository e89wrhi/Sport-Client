'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Cpu, Info } from 'lucide-react';
import { toast } from 'sonner';
import { MatchDto } from '@/types/api/match';
import { usePredictMatch } from '@/lib/api/intelligence/predictMatch';
import { PredictMatchResponseDto } from '@/types/api/intelligence';
import { useSession } from 'next-auth/react';
import { AuthGuardDialog } from '@/components/shared/auth-guard-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { AIPredictionResult } from './ai-prediction-result';

interface PredictDialogProps {
  match: MatchDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PredictMatchDialog({
  match,
  open,
  onOpenChange,
}: PredictDialogProps) {
  const { mutateAsync: predictMatch, isPending: isProcessing } =
    usePredictMatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [predictionResult, setPredictionResult] =
    useState<PredictMatchResponseDto | null>(null);
  const [thinkingStep, setThinkingStep] = useState(0);
  const { status } = useSession();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authAction, setAuthAction] = useState<'predict'>('predict');

  const thinkingSteps = [
    'Analyzing team form and recent performance...',
    'Calculating head-to-head historical data...',
    'Factoring in player injuries and lineup changes...',
    'Processing weather conditions and pitch factors...',
    'Finalizing neural network prediction...',
  ];

  useEffect(() => {
    if (isProcessing) {
      setThinkingStep(0);
      const interval = setInterval(() => {
        setThinkingStep((prev) =>
          prev < thinkingSteps.length - 1 ? prev + 1 : prev
        );
      }, 1500);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProcessing]);

  const handlePrediction = async () => {
    if (status !== 'authenticated') {
      setAuthAction('predict');
      setShowAuthDialog(true);
      return;
    }

    try {
      const result = await predictMatch({
        MatchId: match.Id,
        ModelId: selectedModel,
      });

      if (result.Success) {
        setPredictionResult(result);
        toast.success('Prediction generated!');
      } else {
        toast.error('Prediction failed', {
          description: 'The AI could not process this match at this time.',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Prediction failed', {
        description: 'Please try again later.',
      });
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after a short delay to allow transition to finish
    setTimeout(() => {
      setPredictionResult(null);
      setThinkingStep(0);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-black">
            <Sparkles className="w-6 h-6 text-primary fill-primary/20" />
            Predict with AI
          </DialogTitle>
          <DialogDescription className="font-medium">
            {predictionResult
              ? `Dynamic analysis for ${match.HomeTeam} vs ${match.AwayTeam}`
              : `Generate an AI-powered prediction of "${match.HomeTeam}" vs "${match.AwayTeam}"`}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isProcessing && !predictionResult ? (
            <motion.div
              key="config"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 py-4"
            >
              <div className="p-5 bg-gradient-to-br from-muted/50 to-muted/20 border border-border/40 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                  <Cpu className="w-8 h-8" />
                </div>
                <p className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Match Context
                </p>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-black text-sm uppercase">
                    {match.HomeTeam}
                  </span>
                  <span className="text-xs font-black text-primary px-3 py-1 bg-primary/10 rounded-full">
                    VS
                  </span>
                  <span className="font-black text-sm uppercase text-right">
                    {match.AwayTeam}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <Info className="w-5 h-5 text-primary shrink-0" />
                <p className="text-xs font-medium text-primary/80 leading-relaxed">
                  Our advanced neural models analyze thousands of data points
                  including weather, form, and historical stats to give you the
                  edge.
                </p>
              </div>
            </motion.div>
          ) : isProcessing ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="py-12 flex flex-col items-center justify-center space-y-8"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                <div className="relative h-24 w-24 rounded-full border-b-2 border-primary animate-spin flex items-center justify-center"></div>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-black uppercase tracking-tighter animate-pulse">
                  Processing Intelligence
                </h3>
                <p className="text-sm font-bold text-muted-foreground h-5">
                  {thinkingSteps[thinkingStep]}
                </p>
              </div>
              <div className="w-full max-w-[200px] h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  animate={{
                    width: ['0%', '20%', '45%', '70%', '95%'],
                  }}
                  transition={{
                    duration: 7.5,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-2"
            >
              <AIPredictionResult
                prediction={predictionResult!}
                match={match}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AuthGuardDialog
          isOpen={showAuthDialog}
          onOpenChange={setShowAuthDialog}
          action={authAction}
        />

        <DialogFooter className="gap-2 sm:gap-0">
          {!predictionResult ? (
            <>
              <Button
                variant="ghost"
                onClick={handleClose}
                disabled={isProcessing}
                className="font-bold uppercase tracking-widest text-xs"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePrediction}
                disabled={isProcessing}
                className="relative overflow-hidden group px-8 h-12 rounded-full bg-primary hover:primary/90 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Predict
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </>
          ) : (
            <Button
              onClick={handleClose}
              className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs"
            >
              Close Analysis
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
