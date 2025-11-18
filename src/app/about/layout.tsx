import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story - Born in Minnesota | Where You From',
  description: 'Learn about Where You From - a Minnesota-born clothing brand celebrating local pride, community, and the North Star State\'s unique spirit.',
  openGraph: {
    title: 'Our Story - Born in Minnesota',
    description: 'Learn about Where You From - a Minnesota-born clothing brand celebrating local pride',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
