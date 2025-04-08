import AddBookForm from "../components/AddBook";
import BookList from "../components/BookList";
import LogoutButton from "../components/LogoutButton";

export default function DashboardPage() {
    return (
        <div>
            <h1>My Book Collection</h1>
            <LogoutButton />
            <AddBookForm />
            <BookList />
        </div>
    )
}