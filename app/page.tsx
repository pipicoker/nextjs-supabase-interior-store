import type { AppProps } from "next/app";
import AuthGuard from "./ui/AuthGuard";

import BestSellingWrapper from "./ui/home/BestSellingWrapper";
import TrendingWrapper from "./ui/home/TrendingWrapper";
import BenefitsWrapper from "./ui/home/BenefitsWrapper";
import HeroWrapper from "./ui/home/HeroWrapper";
import ClientsReviewWrapper from "./ui/home/ClientsReviewWrapper";


export default function Home() {
  
  return (
    <div>
      <HeroWrapper />
      <BenefitsWrapper />
      <BestSellingWrapper />
      <ClientsReviewWrapper />
      <TrendingWrapper />
      
    </div>
  );
}
