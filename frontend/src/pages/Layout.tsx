import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import LoginPage from "./Login";
import { useState } from "react";

const Layout = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <main className="main-content">
      <Header setShowLogin={setShowLogin} />
      <Outlet />
      {showLogin ? <LoginPage setShowLogin={setShowLogin} /> : null}
    </main>
  );
};

export default Layout;
