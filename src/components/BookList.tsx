import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import BookItem from "./BookItem";
import { BookX, Loader } from "lucide-react";

export default function BookList() {
  const books = useQuery(api.books.getBooks);

  if (books === undefined) {
    return (
      <div className="loading-container">
        <Loader size={32} className="spinner" />
        <p>Loading your books...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <BookX size={48} />
        <h3>No books found</h3>
        <p>Add your first book using the form above</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem key={book._id} book={book} />
      ))}
    </div>
  );
}
