"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DataPanel from "../home/components/DataPanel";

interface LinkType {
  _id: string;
  title: string;
  url: string;
  visits: number;
  category_id: string;
  updated_id: string;
  tags: string[];
}

function Share() {
  const urlParams = useSearchParams();
  const categoryId = urlParams.get("categoryId");
  console.log("Received categoryId from URL:", categoryId);
  return (
    <div className="flex flex-col gap-6">
      <DataPanel categoryId={categoryId!} showPublic />
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense>
      <Share />
    </Suspense>
  );
}
