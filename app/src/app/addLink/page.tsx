"use client";
import { useEffect, useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getCategoriesAction, postAddURLAction } from "../actions";
import { ROUTES } from "@/config/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface Category {
  id: string | null;
  name: string;
}

export default function AddLinkPage() {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    category_id: "",
    new_category: "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const response = await getCategoriesAction();
      if (!response.success) {
        setError(response.message);
        return;
      }
      if (response && Array.isArray(response.data)) {
        setCategoryList(response.data);
      } else {
        setCategoryList([]);
      }
    } catch (error) {
      setCategoryList([]);
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.url ||
      !formData.title ||
      (!formData.category_id && !formData.new_category)
    ) {
      toast.error("All Fields are required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const response = await postAddURLAction(formData);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      setFormData({
        url: "",
        title: "",
        category_id: "",
        new_category: "",
      });
      // setMessage(response.message);
      router.push(ROUTES.HOME);
      toast.success(response.message);
    } catch (error) {
      console.error("Error adding link:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  console.log("form-data:", formData);
  return (
    <div className="">
      <main className="mx-auto w-full max-w-md px-4 pb-24 pt-6">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Link href={ROUTES.HOME} className="flex items-center gap-1">
            <ArrowLeft size={14} />
            Back
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.6)]">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Add a new link
            </h2>
            <p className="text-sm text-zinc-400">
              Save it to the perfect collection in seconds.
            </p>
          </div>

          <label className="flex flex-col gap-2 text-sm text-zinc-300">
            Link URL
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              id="url"
              placeholder="Paste your URL here"
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500/60"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-zinc-300">
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              id="title"
              placeholder="Choose a title"
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500/60"
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-zinc-300">Category</span>
            <CategoryDropdown
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              selectedCategory={formData.category_id}
              setSelectedCategory={handleInputChange}
              newCategory={formData.new_category}
              setNewCategory={handleInputChange}
            />
          </div>
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-full border border-indigo-500/60 bg-indigo-500/20 px-4 py-3 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/30 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save link"}
          </button>
        </div>
      </main>
    </div>
  );
}
