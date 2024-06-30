import RecentExpenses from "../components/RecentExpenses";
import Header from "../components/Header";
import Container from "../components/Container";

function HomePage() {
  return (
    <main className="min-h-screen w-full bg-blue-500">
      <Header />
      <section className="flex h-full min-h-[calc(100vh-60px)] w-full flex-col items-center justify-evenly gap-10 py-8 md:flex-row md:gap-0 md:p-0">
        <Container />
        <RecentExpenses />
      </section>
    </main>
  );
}

export default HomePage;
