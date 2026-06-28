import DataPanel from "@/app/home/components/DataPanel";

interface Props {
  params: Promise<{ username: string; slug: string }>;
}

export default async function PublicCollectionPage({ params }: Props) {
  const { username, slug } = await params;

  return (
    <div className="flex flex-col gap-6">
      <DataPanel username={username} collectionSlug={slug} showPublic />
    </div>
  );
}
