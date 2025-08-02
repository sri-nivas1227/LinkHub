import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="font-mono flex flex-col justify-between items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Hero />
      <div className="">
        <p className="cursor-pointer text-xl">Show all links</p>
      </div>
    </div>
  );
}
