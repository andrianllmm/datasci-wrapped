import Slide from "@/components/Slide";
import { fadeInUp } from "@/lib/animations";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ScrollAnimate } from "../ScrollAnimate";
import RolesChart from "../charts/RolesChart";
import { WrappedData } from "@/types/wrapped";

export default function RolesSlide({ data }: { data: WrappedData }) {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ScrollAnimate animation={() => fadeInUp()}>
          <h1 className="text-center text-4xl md:text-7xl sm:text-6xl font-black text-foreground mb-4 flex gap-3">
            $
            <AnimatedCounter
              value={
                data.roles.find((d) => d.role === "Data Scientist")?.salary ?? 0
              }
              duration={3}
            />
            Annually
          </h1>
        </ScrollAnimate>
        <RolesChart data={data.roles} />
        <ScrollAnimate animation={() => fadeInUp(0.2)}>
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 max-w-2xl">
            The industry offers a wide range of roles, from analytical thinkers
            to technical engineers.
          </h1>
        </ScrollAnimate>
      </div>
    </Slide>
  );
}
