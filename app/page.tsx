import Hero from "@/features/home/Hero";
import FeaturesBar from "@/features/home/FeaturesBar";
import CategoryBikes from "@/features/home/CategoryBikes";
import PromoBanner from "@/features/home/PromoBanner";
import FeaturedProductSpec from "@/features/home/FeaturedProductSpec";
import BrandMarquee from "@/features/home/BrandMarquee";
import UsedBikesBanner from "@/features/home/UsedBikesBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <FeaturesBar />
      <CategoryBikes />
      <BrandMarquee />
      <PromoBanner />
      <UsedBikesBanner />
    </main>
  );
}
