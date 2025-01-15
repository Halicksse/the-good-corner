import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import AdDetailsPage from "./pages/AdDetailsPage";
import CounterPage from "./pages/CounterPage";
import NewAdFormPage from "./pages/NewAdForm";
import NewCategoryFormPage from "./pages/NewCategoryForm";
import AdSearchPage from "./pages/AdSearchPage";
import AdsByCategoryPage from "./pages/AdsByCategoryPage";
import EditAdForm from "./pages/EditAdForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import UpdateAdPage from "./pages/UpdateAdPage";
import SingleFileUploader from "./pages/TestFileUpload";
import RegisterPage from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="ad/new" element={<NewAdFormPage />} />
          <Route path="ad/update/:id" element={<UpdateAdPage />} />
          <Route path="ad/search/:keyword" element={<AdSearchPage />} />
          <Route path="ad/category/:keyword" element={<AdsByCategoryPage />} />
          <Route path="ad/:id" element={<AdDetailsPage />} />
          <Route path="ad/edit/:id" element={<EditAdForm />} />
          <Route path="category/new" element={<NewCategoryFormPage />} />
          <Route path="counter" element={<CounterPage />} />
          <Route path="testimg" element={<SingleFileUploader />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
