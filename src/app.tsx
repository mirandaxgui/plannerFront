import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import { LoginPage } from "./pages/login";
import { RegisterStep } from "./pages/login/register";

export function App() {
  return (
    <Router basename="/plannerFront"> {/* Base path para GitHub Pages */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/participant/register" element={<RegisterStep />} />
        {/* Temporariamente removi o PrivateRoute para testar */}
        <Route path="/trips" element={<CreateTripPage />} />
        <Route path="/trips/:tripId" element={<TripDetailsPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
