import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedArticles from "@/components/articles/FeaturedArticles";
import TrendingSection from "@/components/home/TrendingSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturedArticles />
        <TrendingSection />
        <CategoriesSection />
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;