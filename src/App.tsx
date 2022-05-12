import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  let { page } = useParams();

  useEffect(() => {
    if (!page) navigate("/1/");
  }, [page]);

  return <Outlet />;
}

export default App;
