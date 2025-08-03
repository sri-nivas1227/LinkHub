export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-3/5 min-h-2/3 flex flex-col justify-between items-center bg-black/15 rounded-[5rem] overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100/30 p-2 text-center ">
        <h1 className="text-white m-3 font-mono text-5xl font-bold">
          DropLinks
        </h1>
        <div className="flex flex-col justify-center gap-3">
          <button className="text-black m-auto text-xl p-2 px-8 font-bold bg-gradient-to-r shadow-md shadow-black/40 from-white to-[#b2b2b2] rounded-full">
            My Links
          </button>
          <button className="text-black m-auto text-xl p-2 px-12 font-bold bg-gradient-to-r shadow-md shadow-black/40 from-white via-[#d2d2d2] to-[#b2b2b2] rounded-full">
            Add New Link
          </button>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}
