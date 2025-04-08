import { useMutation } from "convex/react";
import AddBookForm from "../components/AddBook";
import BookList from "../components/BookList";
import LogoutButton from "../components/LogoutButton";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";
import { Library } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

export default function DashboardPage() {
  const syncUser = useMutation(api.users.syncUser);
  const { user } = useUser();

  useEffect(() => {
    syncUser()
      .then(() => console.log("User synced successfully"))
      .catch((err) => console.error("Error syncing user:", err));
  }, [syncUser]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <Library size={32} />
            <h1>My Book Collection</h1>
          </div>
          <div className="user-section">
            {user && (
              <span className="welcome-message">
                Hello,{" "}
                {user.firstName ||
                  user.emailAddresses[0].emailAddress.split("@")[0]}
              </span>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="add-book-section">
          <h2>Add a new book</h2>
          <AddBookForm />
        </section>

        <section className="book-list-section">
          <h2>Your books</h2>
          <BookList />
        </section>
      </main>
    </div>
  );
}
