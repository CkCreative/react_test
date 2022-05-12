import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { client } from "./apollo";

function App() {
  let navigate = useNavigate();
  let { page } = useParams();

  useEffect(() => {
    if (!page) navigate("/1/");
  }, [page]);

  return (
    <>
      <ApolloProvider client={client}>
        <Outlet />
      </ApolloProvider>
    </>
  );
}

export default App;
