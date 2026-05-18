import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { ProvideContext } from "./context/Contextprovider";
const Homepage = lazy(() => import("./pages/Homepage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
function App() {
  return (
    <>
      <ProvideContext>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
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
          </Suspense>
        </BrowserRouter>
      </ProvideContext>
    </>
  );
}

export default App;
