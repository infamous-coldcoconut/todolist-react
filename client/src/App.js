import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import NoPage from "./NoPage";

import OverviewList from "./Overview/OverviewList";
import OverviewProvider from "./Overview/OverviewProvider";

import UserProvider from "./User/UserProvider";

import ListDetail from "./ListDetail/ListDetail";
import ListDetailProvider from "./ListDetail/ListDetailProvider";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <ListDetailProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<OverviewProvider />} />
                <Route path="/ShoppingListDetail" element={<ListDetail />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </ListDetailProvider>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
