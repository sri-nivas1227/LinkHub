export default function AddLinkPage() {
  return (
    <div className="w-full h-full flex justify-center items-center font-ibm-plex-mono">
      <div className="w-3/5 min-h-2/3 flex flex-col justify-center items-center bg-black/15 rounded-[5rem] overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100/30 p-2 text-center ">
        <div className="flex flex-col justify-center items-center gap-5">
          <input
            type="text"
            name="link"
            id="link"
            className="w-full p-2 border border-gray-300 rounded-3xl"
            placeholder="Paste your link here"
          />
          <input
            type="text"
            name="title"
            id="title"
            className="w-full p-2 border border-gray-300 rounded-3xl"
            placeholder="Choose title..."
          />
          <input
            type="text"
            name="category"
            id="category"
            className="w-full p-2 border border-gray-300 rounded-3xl"
            placeholder="Choose category..."
          />

          <button className="p-1 px-8 w-fit text-black font-semibold rounded-full border border-black/30 bg-gradient-to-r shadow-md shadow-black/40 from-white via-[#c2c2c2] to-[#929292]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
