import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetails from '@/components/product/ProductDetails';
import Reviews from '@/components/product/Reviews';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getProductBySlug, getRelatedProducts, products } from '@/data/products';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found | Where You From',
    };
  }

  return {
    title: `${product.name} | Where You From`,
    description: product.longDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <ProductDetails product={product} />
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-neutral-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">Premium Materials</h3>
                <p className="text-sm text-neutral-600">100% ring-spun cotton for ultimate comfort</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">Made in Minnesota</h3>
                <p className="text-sm text-neutral-600">Supporting local communities</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">Sustainably Sourced</h3>
                <p className="text-sm text-neutral-600">Eco-friendly production practices</p>
              </div>
            </div>

            <div className="prose prose-neutral max-w-none">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Product Details</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                {product.longDescription || product.description}
              </p>
              <ul className="text-neutral-700 space-y-2">
                <li>Premium {product.category.toLowerCase()} designed in Minnesota</li>
                <li>Soft, breathable fabric for all-day comfort</li>
                <li>Reinforced stitching for durability</li>
                <li>Pre-shrunk to maintain size after washing</li>
                <li>Machine washable - easy care</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reviews
              reviews={product.reviews}
              rating={product.rating || 0}
              reviewCount={product.reviewCount || 0}
            />
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </>
  );
}
