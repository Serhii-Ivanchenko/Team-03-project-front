import { Route, Routes } from "react-router-dom";
import SharedLayout from "../SharedLayout/SharedLayout.jsx";
import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import RestrictedRoute from "../RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/user/operations.js";
import { selectIsRefreshing } from "../../redux/user/selectors.js";
import Loader from "../Loader/Loader.jsx";
import { Toaster } from "react-hot-toast";
import GoogleAuthCallback from "../GoogleAuthCallback/GoogleAuthCallback.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage.jsx"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage.jsx"));
const TrackerPage = lazy(() =>
  import("../../pages/TrackerPage/TrackerPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const isRefreshing = useSelector(selectIsRefreshing);

  return isRefreshing ? (
    <Loader />
  ) : (
    <SharedLayout>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<Loader/>}>
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
              <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
            }
          />
          <Route path="/confirm-google-auth" element={<GoogleAuthCallback />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
}
