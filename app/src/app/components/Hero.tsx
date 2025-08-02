
export default function Hero(){
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">LinkHub🔗</h1>
        <p className="text-lg text-gray-600">
          Your personal bookmarking app to save, organize, and access links
          across devices.
        </p>
        <div className="m-[5%]">
            <input type="text" name="search" id="search" className="m-2 text-2xl p-2 rounded-lg border border-white text-center" placeholder="Search links..." />
            <span className="m-2 bg-gray-200 cursor-pointer text-2xl text-black font-semibold rounded-lg px-4 py-2">Add Link</span>
            {/* add few tags */}
            <div className="flex justify-center">
              <span className="m-1 cursor-pointer bg-blue-500 text-white font-semibold rounded-lg px-2 py-1">Tag1</span>
              <span className="m-1 cursor-pointer bg-green-500 text-white font-semibold rounded-lg px-2 py-1">Tag2</span>
              <span className="m-1 cursor-pointer bg-red-500 text-white font-semibold rounded-lg px-2 py-1">Tag3</span>
            </div>
        </div>
      </div>
    );
}