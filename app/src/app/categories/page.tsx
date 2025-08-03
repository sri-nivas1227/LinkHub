import CategoryBubble from "../components/CategoryBubble";

export default function CategoriesPage() {
  return (
    <div className="w-full">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search categories..."
          className="w-4/5 px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2"
        />
      </div>
      <div className="w-3/5 m-auto flex flex-col gap-2">
        <CategoryBubble title="Web Development" />
        <CategoryBubble title="Data Science" />
        <CategoryBubble title="Machine Learning" />
      </div>
    </div>
  );
}
