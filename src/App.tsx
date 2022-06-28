import "./App.css";
import Users from "./pages/Users";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<Users />} />

      <Route path="/new-user" element={<NewUser />} />
      <Route path="/users/:userId" element={<User />} />
    </Routes>
  );
}

export default App;
