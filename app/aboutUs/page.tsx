import WhatAbout from "../ui/about/WhatAbout";
import WhyAbout from "../ui/about/WhyAbout";
import Summer from "../ui/about/Summer";
export default function AboutPage() {
    return (
      <div className="px-6 lg:px-[60px] bg-background pt-14">
        <WhatAbout />
        <WhyAbout />
        <Summer />
      </div>
    )
  }