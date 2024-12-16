import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import { LoginPage } from "./pages/login";
import { RegisterStep } from "./pages/login/register";
import { PrivateRoute } from "./components/PrivateRoute";

const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/participant/register",
      element: <RegisterStep />,
    },
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "/trips/",
      element: <PrivateRoute />,
      children: [
        {
          path: "/trips/",
          element: <CreateTripPage />,
        },
        {
          path: "/trips/:tripId",
          element: <TripDetailsPage />,
        },
      ],
    },
  ]
);

export function App() {
  return <RouterProvider router={router} />;
}
