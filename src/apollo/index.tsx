import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";
import { ReactElement, ReactNode, useEffect, useState } from "react";

export const client = new ApolloClient({
  uri: "https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app/graphql",
  cache: new InMemoryCache(),
});

interface TokenList {
  position: number[];
  value: string;
}

interface PageList {
  pageIndex: number;
  content: string;
  tokens: TokenList[];
}

export interface BookData {
  book: {
    author: string;
    title: string;
    pages: PageList[];
  };
}

const GET_BOOK_DATA = gql`
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

export function Book() {
  const { loading, data } = useQuery<BookData>(GET_BOOK_DATA);
  const [content, setContent] = useState<ReactNode>();
  const [tk, setTk] = useState<TokenList[]>();

  useEffect(() => {
    if (data) {
      let obj = { ...data };
      let sentence = obj.book.pages[1].content;
      let tokens = obj.book.pages[1].tokens;

      let sortedTokens = tokens
        .slice()
        .sort((a, b) => b.position[1] - a.position[1]);

      setTk(sortedTokens);

      for (let token of sortedTokens) {
        sentence =
          sentence.slice(0, token.position[0]) +
          `<span id="${token.position[0]}">${sentence.slice(
            token.position[0],
            token.position[1]
          )}</span>` +
          sentence.slice(token.position[1]);
      }

      setContent(
        <div
          onClick={display()}
          dangerouslySetInnerHTML={{ __html: sentence }}
        ></div>
      );
    }
  }, [data]);

  const display = () => (e: any) => {
    console.log(e.target.id);
    if (e.target.id) {
      const item = tk?.find((a) => a.position[0] == e.target.id);
      console.log(item);
    }
  };

  return (
    <div>
      <h3>Available Books</h3>
      {loading ? <p>Loading ...</p> : <>{data && content}</>}
    </div>
  );
}
