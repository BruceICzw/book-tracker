import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Plus } from "lucide-react";

export default function AddBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addBook = useMutation(api.books.addBook);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;

    setIsSubmitting(true);
    addBook({ title, author, status: "unread" })
      .then(() => {
        setTitle("");
        setAuthor("");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <div className="form-group">
        <label htmlFor="title">Book Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          placeholder="Enter author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="form-input"
        />
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={isSubmitting || !title || !author}
      >
        <Plus size={16} />
        {isSubmitting ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
}
