
import BestSellingWrapper from "./ui/home/BestSellingWrapper";
import TrendingWrapper from "./ui/home/TrendingWrapper";
import BenefitsWrapper from "./ui/home/BenefitsWrapper";
import HeroWrapper from "./ui/home/HeroWrapper";
import ClientsReviewWrapper from "./ui/home/ClientsReviewWrapper";
import WelcomeBanner from "./ui/home/WelcomeBanner";


export default function Home() {
  
  return (
    <div className="bg-white">
      <WelcomeBanner />
      <HeroWrapper />
      <BenefitsWrapper />
      <BestSellingWrapper />
      <ClientsReviewWrapper />
      <TrendingWrapper />
      
    </div>
  );
}
