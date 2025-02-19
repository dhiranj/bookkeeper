import { useRouter } from 'next/router';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const GET_AUTHOR_BY_ID = gql`
  query GetAuthorById($id: ID!) {
    author(id: $id) {
      id
      name
      biography
      born_date
      books {
        id
        title
      }
    }
  }
`;

const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $name: String, $biography: String, $born_date: String) {
    updateAuthor(id: $id, name: $name, biography: $biography, born_date: $born_date) {
      id
      name
      biography
      born_date
    }
  }
`;

const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id)
  }
`;

export default function AuthorDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_AUTHOR_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const [updateAuthor] = useMutation(UPDATE_AUTHOR);
  const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
    variables: { id },
    onCompleted: () => router.push('/'),
  });

  const [formState, setFormState] = useState({
    name: '',
    biography: '',
    born_date: '',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading author details.</p>;
  if (!data || !data.author) return <p>No author found.</p>;

  const author = data.author;

  const handleUpdate = async () => {
    const updatedName = formState.name.trim() ? formState.name : author.name;
    const updatedBiography = formState.biography.trim() ? formState.biography : author.biography;
  
    let formattedBornDate = author.born_date; // Default to existing date
  
    if (formState.born_date) {
      const parsedDate = new Date(formState.born_date);
      if (!isNaN(parsedDate.getTime())) {
        formattedBornDate = parsedDate.toISOString(); // Convert to ISO format
      }
    } else {
      formattedBornDate = new Date(parseInt(author.born_date)).toISOString();
    }
  
    try {
      await updateAuthor({
        variables: {
          id,
          name: updatedName,
          biography: updatedBiography,
          born_date: formattedBornDate,
        },
      });
      alert("Author updated!");
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };
  
  
  
  
  
  

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this author?')) {
      await deleteAuthor();
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
      <button onClick={() => router.push('/')} style={{ background: 'black', color: 'white', padding: '8px', borderRadius: '5px', marginBottom: '20px' }}>
        ⬅️ Return to Home
      </button>
      <h1 style={{ textAlign: 'center' }}>{author.name}</h1>
      <p><strong>Biography:</strong> {author.biography}</p>
      <p><strong>Born Date:</strong> {author.born_date ? new Date(parseInt(author.born_date)).toDateString() : 'Unknown'}</p>

      <h2>Books by this Author</h2>
      {author.books.length === 0 ? (
        <p>No books listed for this author.</p>
      ) : (
        <ul>
          {author.books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      )}

      <h3>Update Author</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="New Name" defaultValue={author.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
        <textarea placeholder="New Biography" defaultValue={author.biography} onChange={(e) => setFormState({ ...formState, biography: e.target.value })} />
        <input 
        type="date" 
        defaultValue={
            author.born_date && !isNaN(parseInt(author.born_date)) 
            ? new Date(parseInt(author.born_date)).toISOString().split('T')[0] 
            : ''
        }
        onChange={(e) => setFormState({ ...formState, born_date: e.target.value })}
        />
        <button onClick={handleUpdate} style={{ background: 'black', color: 'white', padding: '10px', borderRadius: '5px' }}>Update Author</button>
      </div>

      <h3 style={{ marginTop: '20px', color: 'red' }}>Danger Zone</h3>
      <button onClick={handleDelete} style={{ background: 'red', color: 'white', padding: '10px', borderRadius: '5px' }}>Delete Author</button>
    </div>
  );
}
