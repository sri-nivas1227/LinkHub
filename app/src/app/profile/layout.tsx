import NavBar from "../components/NavBar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
          <NavBar />
          <div className="mx-auto w-full max-w-md pb-24 pt-6">
            {children}
          </div>
        </section>
  );
}
