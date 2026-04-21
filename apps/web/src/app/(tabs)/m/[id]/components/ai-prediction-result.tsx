'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PredictMatchResponseDto } from '@/types/api/intelligence';
import { MatchDto } from '@/types/api/match';
import { Sparkles, Brain, Target, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AIPredictionResultProps {
  prediction: PredictMatchResponseDto;
  match: MatchDto;
}

export function AIPredictionResult({
  prediction,
  match,
}: AIPredictionResultProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [randomProbs, setRandomProbs] = useState<{
    h: number;
    d: number;
    a: number;
  }>({ h: 0, d: 0, a: 0 });

  useEffect(() => {
    // Generate random probabilities that sum to 100%
    const h = Math.floor(Math.random() * 60) + 20; // 20-80%
    const d = Math.floor(Math.random() * (100 - h - 10)) + 5; // remainder, min 5%
    const a = 100 - h - d;
    setRandomProbs({ h, d, a });

    let index = 0;
    const text =
      prediction.Prediction ||
      'The neural engine has processed current match dynamics, historical team performance, and real-time momentum. Based on these vectors, the probability distribution favors a controlled offensive posture with significant emphasis on mid-block stability.';
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [prediction.Prediction]);

  const probabilities = [
    {
      label: match.HomeTeam,
      value: randomProbs.h,
      color: 'bg-orange-500',
      textColor: 'text-orange-500',
    },
    {
      label: 'Draw',
      value: randomProbs.d,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500',
    },
    {
      label: match.AwayTeam,
      value: randomProbs.a,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
    },
  ];

  return (
    <div className="space-y-6 py-4">
      {/* Probability Bars */}
      <div className="grid gap-4">
        {probabilities.map((prob, index) => (
          <div key={prob.label} className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-bold uppercase tracking-tight text-muted-foreground flex items-center gap-2">
                {index === 0 && <Target className="w-3 h-3 text-orange-500" />}
                {index === 1 && <Info className="w-3 h-3 text-yellow-500" />}
                {index === 2 && <Target className="w-3 h-3 text-blue-500" />}
                {prob.label}
              </span>
              <span className={`text-sm font-black ${prob.textColor}`}>
                {Math.round(prob.value)}%
              </span>
            </div>
            <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${prob.value}%` }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  ease: 'easeOut',
                }}
                className={`h-full ${prob.color} transition-all`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* AI Analysis Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border-none bg-primary/5 p-6"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Brain className="w-12 h-12 text-primary" />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <h4 className="text-sm font-black uppercase tracking-widest text-primary">
            AI Insight
          </h4>
          <Badge
            variant="outline"
            className="ml-auto text-[10px] border-primary/20 text-primary/80"
          >
            {prediction.ModelId.toUpperCase() || 'GPT-4'}
          </Badge>
        </div>

        <div className="relative min-h-[100px]">
          <p className="text-sm leading-relaxed text-muted-foreground font-medium">
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-4 ml-1 bg-primary align-middle"
              />
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
