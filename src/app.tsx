import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/login';

export function App() {
  return (
    <Router basename="/plannerFront">
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}
