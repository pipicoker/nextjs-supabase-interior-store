import WhatAbout from "../ui/about/WhatAbout";
import WhyAbout from "../ui/about/WhyAbout";
import Summer from "../ui/about/Summer";

export default function AboutPage() {
    return (
      <div className="min-h-screen bg-[#F5F5F5] px-6 lg:px-[60px] pt-14 pb-20">
        <WhatAbout />
        <WhyAbout />
        <Summer />
      </div>
    )
  }