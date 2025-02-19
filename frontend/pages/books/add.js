import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $description: String, $published_date: String, $author_id: ID!) {
    addBook(title: $title, description: $description, published_date: $published_date, author_id: $author_id) {
      id
      title
    }
  }
`;

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [authorId, setAuthorId] = useState('');
  const router = useRouter();

  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    onCompleted: () => router.push('/')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook({ variables: { title, description, published_date: publishedDate, author_id: authorId } });
  };

  return (
    <div>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>Published Date:
          <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} required />
        </label>
        <br />
        <label>Author ID:
          <input type="text" value={authorId} onChange={(e) => setAuthorId(e.target.value)} required />
        </label>
        <br />
        <button type="submit" disabled={loading}>Add Book</button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}
