import { useRouter } from 'next/router';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const GET_BOOK_BY_ID = gql`
  query GetBookById($id: ID!) {
    book(id: $id) {
      id
      title
      description
      published_date
      author {
        id
        name
      }
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String, $description: String, $published_date: String) {
    updateBook(id: $id, title: $title, description: $description, published_date: $published_date) {
      id
      title
      description
      published_date
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const [updateBook] = useMutation(UPDATE_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    variables: { id },
    onCompleted: () => router.push('/'),
  });

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    published_date: '',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading book details.</p>;
  if (!data || !data.book) return <p>No book found.</p>;

  const book = data.book;

  const handleUpdate = async () => {
    let formattedPublishedDate = book.published_date; // Default to existing date
  
    if (formState.published_date) {
      const parsedDate = new Date(formState.published_date);
      if (!isNaN(parsedDate.getTime())) {
        formattedPublishedDate = parsedDate.toISOString(); // Convert to ISO format
      }
    } else {
      // Convert from milliseconds if the user doesn't update the date
      formattedPublishedDate = new Date(parseInt(book.published_date)).toISOString();
    }
  
    await updateBook({
      variables: {
        id,
        title: formState.title || book.title,
        description: formState.description || book.description,
        published_date: formattedPublishedDate, // Ensure it is properly formatted
      },
    });
    alert("Book updated!");
  };
  

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this book?')) {
      await deleteBook();
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
      <button onClick={() => router.push('/')} style={{ background: 'black', color: 'white', padding: '8px', borderRadius: '5px', marginBottom: '20px' }}>
        ⬅️ Return to Home
      </button>
      <h1 style={{ textAlign: 'center' }}>{book.title}</h1>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Published Date:</strong> {book.published_date ? new Date(parseInt(book.published_date)).toDateString() : 'Unknown'}</p>
      <p><strong>Author:</strong> {book.author.name}</p>

      <h3>Update Book</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="New Title" defaultValue={book.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} />
        <textarea placeholder="New Description" defaultValue={book.description} onChange={(e) => setFormState({ ...formState, description: e.target.value })} />
        <input 
          type="date" 
          defaultValue={book.published_date ? new Date(parseInt(book.published_date)).toISOString().split('T')[0] : ''} 
          onChange={(e) => setFormState({ ...formState, published_date: e.target.value })}
        />
        <button onClick={handleUpdate} style={{ background: 'black', color: 'white', padding: '10px', borderRadius: '5px' }}>Update Book</button>
      </div>

      <h3 style={{ marginTop: '20px', color: 'red' }}>Danger Zone</h3>
      <button onClick={handleDelete} style={{ background: 'red', color: 'white', padding: '10px', borderRadius: '5px' }}>Delete Book</button>
    </div>
  );
}
