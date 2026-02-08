type SlideProps = {
  children?: React.ReactNode;
  scrollable?: boolean;
};

import SlideBackground from "./SlideBackground";

export default function Slide({ children, scrollable = false }: SlideProps) {
  return (
    <section
      className={`snap-start snap-always w-screen flex items-center justify-center relative bg-background ${
        scrollable ? "min-h-screen overflow-y-auto" : "h-screen overflow-hidden"
      }`}
    >
      <div
        className={`relative z-10 w-full p-4 flex items-center justify-center ${
          scrollable ? "min-h-screen" : "h-full"
        }`}
      >
        {children}
      </div>
      <SlideBackground />
    </section>
  );
}
