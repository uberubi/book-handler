import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_AUTHORS_QUERY,
  GET_BOOKS_QUERY,
  ADD_BOOK_MUTATION,
} from "../queries/queries";

const AddBook = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const data = useQuery(GET_AUTHORS_QUERY);

  const authors = data.loading ? (
    <option>Loading authors...</option>
  ) : (
    data.data.authors.map((author) => {
      return <option key={author.id} value={author.id}>{author.name}</option>;
    })
  );

  const [addBook, { error }] = useMutation(ADD_BOOK_MUTATION, {
    variables: { name, genre, authorId },
    update(proxy, result) {
      const cacheBooks = proxy.readQuery({ query: GET_BOOKS_QUERY });
      proxy.writeQuery({
        query: GET_BOOKS_QUERY,
        data: { books: [result.data.addBook, ...cacheBooks.books] },
      });
      setName('')
      setGenre('')
    },
  });

  function onForm(e) {
    e.preventDefault();
    addBook();
  }
  // console.log(error)
  return (
      <form className="add-book" onSubmit={onForm}>
      <div className="add-book__field">
        <label>Book name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="add-book__field">
        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className="add-book__field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {authors}
        </select>
        {/* {error && <p>{error}</p>} */}
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
