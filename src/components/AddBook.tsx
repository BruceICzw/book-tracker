import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

export default function AddBookForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const addBook = useMutation(api.books.addBook);



    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!title || !author) return;
        
        addBook({ title, author, status: "unread" })
        setTitle("");
        setAuthor("");
    }


    return (
        <form onSubmit={handleSubmit} className="add-book-form">
            <input
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <button type="submit">Add Book</button>
        </form>
    )
}