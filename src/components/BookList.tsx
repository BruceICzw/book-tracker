import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import BookItem from "./BookItem";

export default function BookList() { 
    const books = useQuery(api.books.getBooks) || [];

    return (
        <div className="book-list">
            {
                books.map(book => (
                    <BookItem
                        key={book.id}
                        book={book}
                    />
                ))
            }
        </div>
    )
}