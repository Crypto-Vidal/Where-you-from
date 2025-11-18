import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Where You From',
  description: 'Get in touch with Where You From. Questions, feedback, or just want to say hi? We\'d love to hear from you!',
  openGraph: {
    title: 'Contact Us - Where You From',
    description: 'Get in touch with Where You From. We\'d love to hear from you!',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
