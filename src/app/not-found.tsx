import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral-600">
            Looks like you've wandered off the beaten path. Let's get you back to Minnesota!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
          <Link href="/collections/all">
            <Button variant="outline" size="lg">
              Shop All Products
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 mb-4">
            Popular destinations:
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/collections/bestsellers" className="text-brand-green-600 hover:underline">
              Bestsellers
            </Link>
            <Link href="/collections/new-drops" className="text-brand-green-600 hover:underline">
              New Drops
            </Link>
            <Link href="/collections/local-pride" className="text-brand-green-600 hover:underline">
              Minnesota Pride
            </Link>
            <Link href="/about" className="text-brand-green-600 hover:underline">
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
