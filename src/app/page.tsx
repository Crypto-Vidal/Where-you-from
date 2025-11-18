import Hero from '@/components/home/Hero';
import Bestsellers from '@/components/home/Bestsellers';
import NewDrops from '@/components/home/NewDrops';
import ShirtOfTheMonth from '@/components/home/ShirtOfTheMonth';
import LocalPride from '@/components/home/LocalPride';
import SocialGallery from '@/components/home/SocialGallery';
import { getBestsellers, getNewDrops, getLocalPrideProducts, socialPosts, shirtOfMonth } from '@/data/products';

export default function HomePage() {
  const bestsellers = getBestsellers();
  const newDrops = getNewDrops();
  const localPride = getLocalPrideProducts();

  return (
    <>
      <Hero />
      <ShirtOfTheMonth shirtData={shirtOfMonth} />
      <Bestsellers products={bestsellers} />
      <NewDrops products={newDrops} />
      <LocalPride products={localPride} />
      <SocialGallery posts={socialPosts} />
    </>
  );
}
