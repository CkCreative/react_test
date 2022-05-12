import { ApolloProvider } from "@apollo/client";

import { Book, client } from "./apollo";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <Book></Book>
    </ApolloProvider>
  );
}

export default App;
