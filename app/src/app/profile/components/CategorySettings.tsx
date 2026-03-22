import { getCategoriesAction } from "@/app/actions";
import { motion } from "framer-motion";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  is_public: boolean;
}

export default function CategorySettings() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] =
    useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false)
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await getCategoriesAction();
        const nextCategories = Array.isArray(response?.data)
          ? response.data
          : [];
        setCategories(nextCategories);
      } catch (error) {
        toast.error("Failed to load categories. Please try again.");
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);
  console.log(categories);
  if (!isLoadingCategories) {
    <div className="">Loading Categories...</div>;
  }
  const handleEdit = ()=>{

  }
  const handleDelete = ()=>{

  }
  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-lg bg-zinc-900/30 text-zinc-200 shadow-md"
      >
        <h2 className="text-2xl font-bold">Categories</h2>
        <div className="mt-2">
          {categories.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 justify-between  border-gray-400 rounded-2xl p-2"
            >
              <div className="col-span-1">{item.name}</div>
              <div className="col-span-1 flex justify-center items-center gap-2">
                <span className="">Public</span>
                <input
                  type="checkbox"
                  checked={item.is_public}
                  value=""
                  className=""
                />
              </div>
              
              <div className="col-span-1 flex gap-3 justify-end items-center">
                <Pencil onClick={handleEdit} size={18}/>
                <Trash onClick={handleDelete} size={18} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
