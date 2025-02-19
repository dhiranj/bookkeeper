import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_BOOKS_AND_AUTHORS } from "../graphql/queries";

export default function Home() {
  const { loading, error, data } = useQuery(GET_BOOKS_AND_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <h1>Books</h1>
      <Link href="/add-book">
        <button>Add Book</button>
      </Link>
      <ul>
        {data.books.map((book) => (
          <li key={book.id}>
            <Link href={`/books/${book.id}`}>
              {book.title} by {book.author.name}
            </Link>
          </li>
        ))}
      </ul>

      <h1>Authors</h1>
      <Link href="/add-author">
        <button>Add Author</button>
      </Link>
      <ul>
        {data.authors.map((author) => (
          <li key={author.id}>
            <Link href={`/authors/${author.id}`}>
              {author.name} - {author.biography}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
