import { Route, Routes } from "react-router-dom";
import SharedLayout from "../SharedLayout/SharedLayout.jsx";
import "./App.css";
import { lazy, Suspense } from "react";
import RestrictedRoute from "../RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage.jsx"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage.jsx"));
const TrackerPage = lazy(() =>
  import("../../pages/TrackerPage/TrackerPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  return (
    <SharedLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<SignUpPage />}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<SignInPage />}
              />
            }
          />
          <Route
            path="/tracker"
            element={
              <PrivateRoute redirectTo="/login" component={<TrackerPage />} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
}

export default App;
