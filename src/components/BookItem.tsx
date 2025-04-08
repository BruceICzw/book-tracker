import { useMutation } from "convex/react";
import {api} from "../../convex/_generated/api";
import { Book, ChevronRight, ChevronUpCircle } from "lucide-react";

export default function BookItem({ book }) {
    const updateStatus = useMutation(api.books.updateStatus);

    const statusIcons = {
        unread: <Book size={16} color="gray" />,
        reading: <ChevronRight size={16} color="blue" />,
        read: <ChevronUpCircle size={16} color="green" />,
    }

    return (
        <div className="book-item">
            <div className="book-info">
                <h3>{book.title}</h3>
                <p>by { book.author}</p>
            </div>
            <button
                onClick={() => {
                    const newStatus = book.status === "unread" ?
                        "reading" : book.status === "reading" ?
                            "read" : "unread";
                    updateStatus({ bookId: book.id, newStatus });
                }}
            >
                {statusIcons[book.status]}
            </button>
        </div>
    );
}