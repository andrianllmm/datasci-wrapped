import Slide from "@/components/Slide";

export default function NotFound() {
  return (
    <Slide>
      <div className="flex flex-col justify-between items-center x-6 max-w-4xl mx-auto">
        <h1 className="text-center text-3xl md:text-5xl sm:text-4xl font-black text-white mb-4 flex gap-3">
          404 - Page Not Found :(
        </h1>
        <p className="text-center text-lg text-white">
          The page you are looking for does not exist.
        </p>
      </div>
    </Slide>
  );
}
