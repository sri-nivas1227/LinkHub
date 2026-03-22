import { Toggle } from "@/app/components/Toggle";
import { Globe, PenLine, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { updateCategoryAction } from "@/app/actions";
import { toast } from "sonner";

export default function CategoryHeader({
  title,
  isPublic = false,
  categoryId,
}: {
  title: string | undefined;
  isPublic?: boolean;
  categoryId?: string;
}) {
  const [publicToggle, setPublicToggle] = useState<boolean>(isPublic);
  const [editCategoryName, setEditCategoryName] = useState<boolean>(false);
  const [categoryTitle, setCategoryTitle] = useState<string | undefined>(title);

  useEffect(() => {
    setEditCategoryName(false);
    setCategoryTitle(title);
    setPublicToggle(isPublic);
  }, [title, isPublic]);

  useEffect(() => {
    if (categoryId && publicToggle !== isPublic) {
      const promise = updateCategoryAction(categoryId, {
        isPublic: publicToggle,
      });
      toast.promise(promise, {
        loading: "Updating category...",
        success: "Category updated successfully",
        error: "Failed to update category",
      });
    }
  }, [publicToggle, categoryId, isPublic]);

  const handleSave = () => {
    if (categoryId && categoryTitle && categoryTitle !== title) {
      const promise = updateCategoryAction(categoryId, { name: categoryTitle });
      toast.promise(promise, {
        loading: "Updating category name...",
        success: "Category name updated successfully",
        error: "Failed to update category name",
      });
      setEditCategoryName(false);
    }
  };
  return (
    <div className="w-3/4 flex gap-2 justify-between items-center">
      <div className="w-3/4 flex items-center gap-2 justify-start">
        {editCategoryName && title ? (
          <div className="w-3/4">
            <input
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              type="text"
              name="categoryTitle"
              id="categoryTitle"
              autoFocus
              className=" text-sm py-1 px-2 border border-gray-500 outline-none rounded-lg"
            />
          </div>
        ) : (
          <p className="w-3/4 text-sm font-medium text-zinc-300">
            {categoryTitle ?? "All Links"}
          </p>
        )}
        {title && (
          <>
            {editCategoryName ? (
              <div className="w-1/4 flex gap-2">
                <X
                  onClick={() => setEditCategoryName(false)}
                  className="cursor-pointer"
                  size={20}
                />
                <Save
                  onClick={handleSave}
                  className="cursor-pointer"
                  size={20}
                />
              </div>
            ) : (
              <PenLine
                onClick={() => setEditCategoryName((prev) => !prev)}
                className="w-1/4 cursor-pointer"
                size={16}
              />
            )}
          </>
        )}
      </div>
      {title && (
        <div className="flex gap-2 items-center justify-center">
          <Globe
            className={`${publicToggle ? "text-indigo-500" : ""}`}
            size={16}
          />
          <Toggle
            onChange={setPublicToggle}
            checked={publicToggle}
            label="Public"
            size="sm"
          />
        </div>
      )}
    </div>
  );
}
