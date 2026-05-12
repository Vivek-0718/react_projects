import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";

import {cities} from "./../data/cities.json"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage></Homepage>}></Route>
          <Route path="/product" element={<Product></Product>}></Route>
          <Route path="/pricing" element={<Pricing></Pricing>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<p>Index</p>}></Route>
            <Route path="city" element={<p>City</p>}></Route>
            <Route path="contry" element={<p>contry</p>}></Route>
            <Route path="form" element={<p>Form</p>}></Route>
          </Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
