import CategoryBubble from "../components/CategoryBubble";

export default function CategoriesPage() {
  return (
    <div className="w-full">
      <div className="w-4/5 m-auto flex flex-col gap-2">
        <CategoryBubble title="Web Development" />
        <CategoryBubble title="Data Science" />
        <CategoryBubble title="Machine Learning" />
      </div>
    </div>
  );
}
