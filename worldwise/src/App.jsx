import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { ProvideContext } from "./context/Contextprovider";
function App() {
  return (
    <>
      <ProvideContext>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage></Homepage>}></Route>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="city" />}></Route>
              <Route path="city" element={<CityList></CityList>}></Route>
              <Route path="city/:id" element={<City></City>}></Route>
              <Route
                path="country"
                element={<CountryList></CountryList>}
              ></Route>
              <Route path="form" element={<Form />}></Route>
            </Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Routes>
        </BrowserRouter>
      </ProvideContext>
    </>
  );
}

export default App;
