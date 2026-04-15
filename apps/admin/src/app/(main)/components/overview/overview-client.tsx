'use client';

import React from 'react';
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Activity,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

import ListWidthWrapper from '@/components/layout/list-width-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';

// --- Mock Data ---

const PERFORMANCE_DATA = [
  { month: 'Jan', active: 4000, new: 2400 },
  { month: 'Feb', active: 3000, new: 1398 },
  { month: 'Mar', active: 2000, new: 9800 },
  { month: 'Apr', active: 2780, new: 3908 },
  { month: 'May', active: 1890, new: 4800 },
  { month: 'Jun', active: 2390, new: 3800 },
  { month: 'Jul', active: 3490, new: 4300 },
];

const STATS = [
  {
    title: 'Total Users',
    value: '24,512',
    description: '+12% from last month',
    icon: Users,
    trend: 'up',
    color: 'blue',
  },
  {
    title: 'Active Matches',
    value: '156',
    description: '45 live right now',
    icon: Activity,
    trend: 'up',
    color: 'emerald',
  },
  {
    title: 'Tournaments',
    value: '12',
    description: '3 upcoming this week',
    icon: Trophy,
    trend: 'neutral',
    color: 'amber',
  },
  {
    title: 'Net Revenue',
    value: '$43,212',
    description: '+18% from last month',
    icon: DollarSign,
    trend: 'up',
    color: 'purple',
  },
];

const RECENT_MATCHES = [
  {
    id: '1',
    teams: 'Warriors vs Lakers',
    status: 'Live',
    score: '84 - 72',
    tier: 'Pro',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    id: '2',
    teams: 'Manchester City vs Liverpool',
    status: 'Finished',
    score: '2 - 1',
    tier: 'Elite',
    color: 'bg-slate-500/10 text-slate-500',
  },
  {
    id: '3',
    teams: 'Nadal vs Djokovic',
    status: 'Upcoming',
    score: '0 - 0',
    tier: 'Grand Slam',
    color: 'bg-blue-500/10 text-blue-500',
  },
];

const chartConfig = {
  active: {
    label: 'Active Users',
    color: 'hsl(45, 93%, 47%)', // Amber/Yellow
  },
  new: {
    label: 'New Registrations',
    color: 'hsl(var(--chart-2))',
  },
};

export function DashboardOverview() {
  return (
    <ListWidthWrapper className="py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Real-time analytics and performance tracking.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex border-dashed">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button size="sm" className="shadow-lg shadow-primary/20">
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                <stat.icon size={64} className={`text-${stat.color}-500`} />
              </div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-500`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center mt-1">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
                  ) : stat.trend === 'down' ? (
                    <ArrowDownRight className="h-4 w-4 text-rose-500 mr-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-slate-400 mr-1" />
                  )}
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-4 border-border/50 shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between text-card-foreground">
              <div>
                <CardTitle className="text-xl">Performance Insight</CardTitle>
                <CardDescription>User engagement over the last 6 months</CardDescription>
              </div>
              <Badge variant="secondary" className="font-mono">
                +24.5%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-2 pt-4">
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <AreaChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-active)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-active)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-new)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-new)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  className="text-muted-foreground font-medium"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  className="text-muted-foreground font-medium"
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="active"
                  stroke="var(--color-active)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorActive)"
                />
                <Area
                  type="monotone"
                  dataKey="new"
                  stroke="var(--color-new)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorNew)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Matches */}
        <Card className="lg:col-span-3 border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Matches</CardTitle>
              <CardDescription>Latest updates from current competitions</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {RECENT_MATCHES.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center justify-between group p-3 rounded-xl hover:bg-accent/50 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-semibold group-hover:text-primary transition-colors">
                    {match.teams}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={`text-[10px] uppercase font-bold py-0 h-4 border-none ${match.color}`}>
                      {match.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">
                      {match.tier}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold font-mono tracking-tighter">
                    {match.score}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase">
                    Current Score
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Call to action card */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="font-bold text-sm">Grow your audience</h4>
                <p className="text-xs text-muted-foreground mt-1">Promote your upcoming tournaments to 20k+ active users.</p>
                <Button size="sm" className="w-full mt-3 h-8 text-[11px] font-bold uppercase tracking-wider">
                  Create Tournament
                </Button>
              </div>
              <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Trophy size={100} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ListWidthWrapper>
  );
}
