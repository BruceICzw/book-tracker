import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Book, ChevronRight, CheckCircle } from "lucide-react";
import { Doc } from "../../convex/_generated/dataModel";

interface BookItemProps {
  book: Doc<"books">;
}

export default function BookItem({ book }: BookItemProps) {
  const updateStatus = useMutation(api.books.updateStatus);

  const statusInfo = {
    unread: {
      icon: <Book size={20} />,
      label: "Unread",
      color: "var(--color-status-unread)",
    },
    reading: {
      icon: <ChevronRight size={20} />,
      label: "Reading",
      color: "var(--color-status-reading)",
    },
    read: {
      icon: <CheckCircle size={20} />,
      label: "Completed",
      color: "var(--color-status-read)",
    },
  };

  const currentStatus = statusInfo[book.status];

  const handleStatusChange = () => {
    const newStatus =
      book.status === "unread"
        ? "reading"
        : book.status === "reading"
          ? "read"
          : "unread";
    updateStatus({ bookId: book._id, newStatus });
  };

  return (
    <div className="book-card">
      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
      </div>

      <div className="book-status-section">
        <div
          className="status-indicator"
          style={{ backgroundColor: currentStatus.color }}
        >
          <span className="status-icon">{currentStatus.icon}</span>
          <span className="status-label">{currentStatus.label}</span>
        </div>
        <button className="status-change-button" onClick={handleStatusChange}>
          Change status
        </button>
      </div>
    </div>
  );
}
