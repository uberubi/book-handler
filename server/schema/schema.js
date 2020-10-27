const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
let books = [
  { name: "War and Peace", genre: "Russian Classic", id: "1", authorId: "1" },
  {
    name: "Crime and Punishment",
    genre: "Russian Classic",
    id: "2",
    authorId: "2",
  },
  { name: "Metamorphozis", genre: "Abstract", id: "3", authorId: "3" },
  { name: "Gambler", genre: "Russian Classic", id: "4", authorId: "2" },
  { name: "Anna Karenina", genre: "Russian Classic", id: "5", authorId: "1" },
  { name: "Castle", genre: "Abstract", id: "6", authorId: "3" },
];

let authors = [
  { name: "Leo Tolstoy", age: 44, id: "1" },
  { name: "Fedyor Dostoevskiy", age: 41, id: "2" },
  { name: "Franz Kafka", age: 38, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other soure
        console.log(typeof args.id);
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
