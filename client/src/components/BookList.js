import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS_QUERY } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const data = useQuery(GET_BOOKS_QUERY);

  const books = data.loading ? (
    <div>Loading books...</div>
  ) : (
    data.data.books.map((book) => {
      return <li onClick={(e) => {setSelectedId(book.id)}} key={book.id}>{book.name + book.genre}</li>;
    })
  );

  return (
    <div>
      <ul className="book-list">{books}</ul>
      <BookDetails bookId={selectedId}/>
    </div>
  );
};

export default BookList;
