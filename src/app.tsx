import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { CreateTripPage } from './pages/create-trip';
import { TripDetailsPage } from './pages/trip-details';

export function App() {
  return (
    <Router basename="/plannerFront">
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trips" element={<CreateTripPage />} />
        <Route path="/trips/:tripId" element={<TripDetailsPage />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}
