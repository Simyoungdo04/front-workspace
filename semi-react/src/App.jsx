import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import Signup from "./features/member/Signup";
import Login from "./features/member/Login";
import ChangePassword from "./features/member/ChangePassword";
import DeleteAccount from "./features/member/DeleteAccount";
import BoardList from "./features/board/BoardList";
import BoardDetail from "./features/board/BoardDetail";
import BoardForm from "./features/board/BoardForm";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<div style={{ height: "600px" }}></div>} />
        <Route path="/password" element={<ChangePassword />} />
        <Route path="/delete" element={<DeleteAccount />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boards" element={<BoardList />} />
        <Route path="/boards/:boardNo" element={<BoardDetail />} />
        <Route path="/boards/:boardNo/edit" element={<BoardForm />} />
        <Route path="/boards/write" element={<BoardForm />} />
        <Route path="/*" element={<h1>없는 페이지입니다.</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
