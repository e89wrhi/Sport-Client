import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LoadingView from '@/components/layout/state/loading-view';
import MatchDetailClient from './components/match-detail-client';
import { prefetchMatch } from '@/lib/api/sport/getMatch';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getMockMatchDetail } from '@/mock/sport';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// generate dynamic metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  //const match = await getArticle(slug);
  const match = await getMockMatchDetail(id);

  if (!match) {
    return {
      title: 'Match not found',
      description: 'The requested match could not be found.',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Sport - ${match.HomeTeam} vs ${match.AwayTeam}`,
    description: `${match.HomeTeam} vs ${match.AwayTeam}`,
    openGraph: {
      title: `${match.HomeTeam} vs ${match.AwayTeam}`,
      description: `${match.HomeTeam} vs ${match.AwayTeam}`,
      type: 'article',
      url: `/m/${id}`,
      images: `${match.HomeTeam} vs ${match.AwayTeam}`
        ? [
            {
              url: `${match.HomeTeam} vs ${match.AwayTeam}`,
              width: 1200,
              height: 630,
              alt: `${match.HomeTeam} vs ${match.AwayTeam}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${match.HomeTeam} vs ${match.AwayTeam}`,
      description: `${match.HomeTeam} vs ${match.AwayTeam}`,
      images: `${match.HomeTeam} vs ${match.AwayTeam}`
        ? [`${match.HomeTeam} vs ${match.AwayTeam}`]
        : undefined,
    },
  };
}

export default async function MatchDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<LoadingView />}>
        <DataLoader id={id} />
      </Suspense>
    </div>
  );
}

async function DataLoader({ id }: { id: string }) {
  const queryClient = new QueryClient();
  await prefetchMatch(queryClient, id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MatchDetailClient id={id} />
    </HydrationBoundary>
  );
}
