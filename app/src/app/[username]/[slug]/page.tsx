import DataPanel from "@/app/home/components/DataPanel";
import NavBar from "@/app/components/NavBar";

interface Props {
  params: Promise<{ username: string; slug: string }>;
}

export default async function PublicCollectionPage({ params }: Props) {
  const { username, slug } = await params;

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto w-md md:w-2/3 px-4 pb-24 pt-6">
        <DataPanel username={username} collectionSlug={slug} showPublic />
      </main>
    </div>
  );
}
