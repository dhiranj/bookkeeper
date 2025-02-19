import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const ADD_REVIEW = gql`
  mutation AddReview($bookId: ID!, $review: String!, $rating: Int!) {
    addReview(bookId: $bookId, review: $review, rating: $rating) {
      id
      review
      rating
    }
  }
`;

export default function ReviewForm({ bookId, onReviewAdded }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [addReview, { loading, error }] = useMutation(ADD_REVIEW);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReview({ variables: { bookId, review, rating } });
    setReview(""); // Clear form after submission
    onReviewAdded(); // Refresh reviews
  };

  return (
    <div>
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review"
          required
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
