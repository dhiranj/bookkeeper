import Link from "next/link";

export default function AuthorList({ authors }) {
  if (!authors || authors.length === 0) {
    return <p>No authors available.</p>;
  }

  return (
    <div>
      <h2>Authors</h2>
      <ul>
        {authors.map((author) => (
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
