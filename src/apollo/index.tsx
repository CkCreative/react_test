import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql",
  cache: new InMemoryCache(),
});

export const GET_BOOK_DATA = gql`
  query getBookData {
    book {
      author
      title
      pages {
        pageIndex
        content
        tokens {
          position
          value
        }
      }
    }
  }
`;
