"use client";

import ToolsSlide from "@/components/slides/ToolsSlide";
import DataVolumeSlide from "@/components/slides/DataVolumeSlide";
import IntroSlide from "@/components/slides/IntroSlide";
import LanguagesSlide from "@/components/slides/LanguagesSlide";
import MarketSizeSlide from "@/components/slides/MarketSizeSlide";
import OutroSlide from "@/components/slides/OutroSlide";
import RolesSlide from "@/components/slides/RolesSlide";
import { WrappedData } from "@/types/wrapped";

export default function Wrapped({ data }: { data: WrappedData }) {
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll bg-purple-700">
      <IntroSlide data={data} />
      <DataVolumeSlide data={data} />
      <MarketSizeSlide data={data} />
      <RolesSlide data={data} />
      <ToolsSlide data={data} />
      <LanguagesSlide data={data} />
      <OutroSlide data={data} />
    </div>
  );
}
