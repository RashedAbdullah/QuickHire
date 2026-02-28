import { useJobs } from "@/context/JobContext";
import HeroSection from "@/components/home/HeroSection";
import CompanyLogos from "@/components/home/CompanyLogos";
import CtaBanner from "@/components/home/CtaBanner";
import CategorySection from "@/components/home/category-section";
import FeaturedJobsSection from "@/components/home/featured-jobs";
import LatestJobsSection from "@/components/home/latest.jobs";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <CompanyLogos />
      <CategorySection />
      <CtaBanner />
      <FeaturedJobsSection />
      <LatestJobsSection />
    </div>
  );
};

export default Home;
