import { Toggle } from "@/app/components/Toggle";
import { Copy, PenLine, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getCategoryDetailsAction,
  getCollectionPublicURLAction,
  updateCategoryAction,
} from "@/app/actions";
import { toast } from "sonner";
import { Category } from "@/app/types";

export default function CategoryHeader({
  title,
  categoryId,
}: {
  title: string | null;
  categoryId?: string;
}) {
  const [category, setCategory] = useState<Category>();
  const [publicToggle, setPublicToggle] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<boolean>(false);
  const [categoryTitle, setCategoryTitle] = useState<string | undefined>();

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
  const handlePublicToggle = (checked: boolean) => {
    if (category && categoryId && checked != publicToggle) {
      const promise = updateCategoryAction(categoryId, { isPublic: checked });
      toast.promise(promise, {
        loading: "Updating category ...",
        success: "Category updated successfully",
        error: "Failed to update category",
      });
      promise.then((data) => {
        if (data.success) {
          setPublicToggle(checked);
        }
      });
    }
  };
  const handleCopyPublicCollectionLink = async () => {
    if (categoryId) {
      const response = await getCollectionPublicURLAction({
        categoryId: categoryId,
      });
      if (!response.success) {
        toast.error("Failed to fetch Public URL");
      } else {
        handleCopy(`${window.location.origin}/${response.data.public_url}`);
      }
    }
  };
  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link Copied to Clipboard!");
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };
  useEffect(() => {
    const getCategoryDetails = async () => {
      if (categoryId == "all") {
        return;
      }
      try {
        const responseData = await getCategoryDetailsAction(categoryId!);
        if (responseData.success) {
          setCategory(responseData.data);
        }
      } catch (error) {
        toast.error("Failed to load links. Please try again.");
      } finally {
      }
    };
    getCategoryDetails();
  }, [categoryId, publicToggle]);
  useEffect(() => {
    if (category) {
      setPublicToggle(category.is_public);
      setCategoryTitle(category.name);
    }
  }, [category]);
  if (categoryId != "all" && !category) {
    return <div className="">Loading Category...</div>;
  }
  return (
    <div className="w-3/4 flex gap-2 items-center">
      <div className="transition-all ease-linear w-1/2 flex items-center gap-2 justify-start">
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
          <p className="text-sm font-medium text-zinc-300">
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
        <>
          <div className="flex gap-2 items-center justify-start">
            <Toggle
              onChange={handlePublicToggle}
              checked={publicToggle}
              label="Public"
              size="sm"
            />
            {/* <Globe
              className={`${publicToggle ? "text-indigo-500" : ""}`}
              size={16}
            /> */}
          </div>
          {publicToggle && <div
            onClick={handleCopyPublicCollectionLink}
            className="mx-2 flex items-center justify-center hover:text-indigo-500 cursor-pointer gap-1 text-xs whitespace-nowrap"
          >
            <Copy size={16} />
            <span>{"Copy Public Link"}</span>
          </div>}
        </>
      )}
    </div>
  );
}
