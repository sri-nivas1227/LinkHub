export default function SignUpPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center my-4">
      {/* <h1 className="text-3xl font-semibold mb-4">Sign Up</h1> */}
      <div className="flex flex-col bg-gray-800 gap-3 p-3 rounded-3xl text-xl font-semibold w-full max-w-md">
        <label className="flex gap-3 justify-between items-baseline">
          <span>Name:</span>
          <input
            type="text"
            name="name"
            className="border border-white outline-none rounded-3xl p-1 bg-gray-900 text-white"
          />
        </label>
        <label className="flex gap-3 justify-between items-baseline">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            className="border border-white outline-none rounded-3xl p-1 bg-gray-900 text-white"
          />
        </label>
        <label className="flex gap-3 justify-between items-baseline">
          <span>Password:</span>
          <input
            type="password"
            name="password"
            className="border border-white outline-none rounded-3xl p-1 bg-gray-900 text-white"
          />
        </label>
        <div className="flex justify-center items-center">
          <button className="p-2 px-4 bg-gray-200 text-black rounded-3xl border w-fit">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
