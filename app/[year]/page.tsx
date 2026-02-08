import { catalog } from "@/data/catalog";
import Wrapped from "../../components/Wrapped";
import Slide from "@/components/Slide";
import GiscusComments from "@/components/GiscusComments";

type PageProps = {
  params: Promise<{ year: string }>;
};

export default async function Page({ params }: PageProps) {
  const { year } = await params;
  const yearNum = Number(year);
  const data = catalog[yearNum];

  if (yearNum > new Date().getFullYear()) {
    return (
      <Slide>
        <div className="flex flex-col justify-between items-center x-6 max-w-4xl mx-auto gap-4">
          <h1 className="text-center text-3xl md:text-5xl sm:text-4xl font-black text-foreground mb-4 flex gap-3">
            {year} is coming soon...
          </h1>
        </div>
      </Slide>
    );
  }

  if (!data) {
    return (
      <Slide>
        <div className="flex flex-col justify-between items-center x-6 max-w-4xl mx-auto gap-4">
          <h1 className="text-center text-3xl md:text-5xl sm:text-4xl font-black text-foreground mb-4 flex gap-3">
            Opss... We might have missed {year}...
          </h1>
        </div>
      </Slide>
    );
  }

  return (
    <Wrapped data={data}>
      <Slide scrollable>
        <div className="flex flex-col gap-4 max-w-4xl mx-auto px-6">
          <GiscusComments
            term={`datasci-wrapped-${year}`}
            title={`Discussion on ${year} DataSci Wrapped`}
          />
        </div>
      </Slide>
    </Wrapped>
  );
}
