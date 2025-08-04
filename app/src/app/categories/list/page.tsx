import Image from "next/image";

export default function Page() {
  return (
    <div className="w-4/5 h-full m-auto p-3 bg-black/20 border border-b-0 border-white/20 rounded-4xl shadow-lg shadow-black/30 text-center">
      <h2 className="font-bold cursor-pointer text-2xl">title</h2>

      <div>
        <ul className="mt-2 text-lg">
          <li className="p-1 px-4 border bg-gray-500/20 border-white/20 m-1 my-2 rounded-4xl">
            Link 1
          </li>
          <li className="p-1 px-4 border bg-gray-500/20 border-white/20 m-1 my-2 rounded-4xl">
            Link 2
          </li>
          <li className="p-1 px-4 border bg-gray-500/20 border-white/20 m-1 my-2 rounded-4xl">
            Link 3
          </li>
        </ul>
      </div>
    </div>
  );
}
