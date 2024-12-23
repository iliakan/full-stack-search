import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AppWrapper } from "./components/AppWrapper";
import { LocationLayout } from "./components/layouts/LocationLayout";
import { HotelPage } from "./pages/HotelPage";
import { CityPage } from "./pages/CityPage";
import { CountryPage } from "./pages/CountryPage";

function App() {
  return (
    <StrictMode>
      <AppWrapper>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route element={<LocationLayout />}>
              <Route path={`/hotels/:id`} element={<HotelPage />} />
              <Route path={`/cities/:id`} element={<CityPage />} />
              <Route path={`/countries/:id`} element={<CountryPage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </StrictMode>
  );
}

export default App;
