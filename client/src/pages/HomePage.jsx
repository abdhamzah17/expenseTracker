import RecentExpenses from "../components/RecentExpenses";
import Header from "../components/Header";

function HomePage() {
  return (
    <main className="min-h-screen w-full bg-blue-500">
      <Header />
      <RecentExpenses />
    </main>
  );
}

export default HomePage;
