type SlideProps = {
  children?: React.ReactNode;
};

import SlideBackground from "./SlideBackground";

export default function Slide({ children }: SlideProps) {
  return (
    <section className="snap-start snap-always h-screen w-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="relative z-10 w-full h-full p-4 flex items-center justify-center">
        {children}
      </div>
      <SlideBackground />
    </section>
  );
}
