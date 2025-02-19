import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK } from "../graphql/mutations";
import { GET_BOOKS_AND_AUTHORS } from "../graphql/queries";
import { useRouter } from "next/router";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [authorId, setAuthorId] = useState("");
  const router = useRouter();

  const { data } = useQuery(GET_BOOKS_AND_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS_AND_AUTHORS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook({ variables: { title, description, published_date: publishedDate, author_id: authorId } });
    router.push("/");
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} required />
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
          <option value="">Select an Author</option>
          {data?.authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
