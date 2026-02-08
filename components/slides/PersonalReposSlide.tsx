import Slide from "@/components/Slide";
import RepoChart from "../charts/RepoChart";
import { fadeInUp } from "@/lib/animations";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ScrollAnimate } from "../ScrollAnimate";
import { PersonalWrappedData } from "@/types/wrapped";

export default function PersonalReposSlide({
  data,
}: {
  data: PersonalWrappedData;
}) {
  const totalRepos = data.repo.reduce((sum, d) => sum + d.count, 0);
  const currentYearData = data.repo.filter((d) =>
    d.month.startsWith(data.year.toString()),
  );
  const currentYearRepos = currentYearData.reduce((sum, d) => sum + d.count, 0);

  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ScrollAnimate animation={() => fadeInUp()}>
          <h1 className="flex flex-col gap-1 text-center text-3xl md:text-6xl sm:text-5xl font-black text-white mb-4">
            <AnimatedCounter value={totalRepos} duration={3} />
            <span className="text-xl md:text-3xl text-purple-200">
              Public Repositories
            </span>
          </h1>
        </ScrollAnimate>
        <RepoChart data={data.repo} />
        <ScrollAnimate animation={() => fadeInUp(0.2)}>
          <h1 className="text-center text-lg md:text-xl font-semibold text-purple-200 mb-4">
            {currentYearRepos > 0
              ? `You created ${currentYearRepos} ${currentYearRepos === 1 ? "repository" : "repositories"} in ${data.year}`
              : "Your GitHub contribution journey over the years"}
          </h1>
        </ScrollAnimate>
      </div>
    </Slide>
  );
}
