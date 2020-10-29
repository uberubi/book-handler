import { useQuery } from "@apollo/client";
import React from "react";
import { GET_BOOK_QUERY } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  if (bookId) {
    const { data } = useQuery(GET_BOOK_QUERY, {
      variables: { id: bookId },
    });
    console.log(data);

    return (
      <div className="book-details">
        <h2>{data?.book.name}</h2>
        <p>{data?.book.author.name}</p>
        <p>{data?.book.genre}</p>
        <p>Other books by the author:</p>
        <ul className="other-books">
          {data?.book.author.books.map((book) => {
            return <li key={book.id}>{book.name}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <div className="book-details">Click at book to see more details here</div>;
  }
};

export default BookDetails;
