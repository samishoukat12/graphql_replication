import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "rxdb-hooks";
import { initialize } from "./db/db";
import TestPage from "./pages/pages";

function App() {
  const [db, setDb] = useState<any>(null);

  useEffect(() => {
    // RxDB instantiation can be asynchronous
    initialize().then((database) => setDb(database));
  }, []);
  return (
    <Provider db={db}>
      <TestPage />
    </Provider>
  );
}

export default App;
