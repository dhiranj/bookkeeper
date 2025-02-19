import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!, $biography: String!, $born_date: String!) {
    addAuthor(name: $name, biography: $biography, born_date: $born_date) {
      id
      name
    }
  }
`;

export default function AddAuthor() {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [addAuthor, { data, loading, error }] = useMutation(ADD_AUTHOR);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAuthor({ variables: { name, biography, born_date: bornDate } });
    router.push("/");
  };

  return (
    <div>
      <h1>Add Author</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Author Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          required
        />
        <input
          type="date"
          value={bornDate}
          onChange={(e) => setBornDate(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Author"}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
