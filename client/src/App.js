import React from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const App = () => {
  return (
    <div className="main">
      <BookList />
      <AddBook />
    </div>
  );
};

export default App;
