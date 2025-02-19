import Link from "next/link";

export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link href={`/books/${book.id}`}>
              {book.title} by {book.author.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
