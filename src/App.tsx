import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './pages/Dashboard';
import './App.css';

type AuthMode = 'login' | 'signup';

function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsModalOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthMode('signup');
    setIsModalOpen(true);
  };

  const handleAuthSuccess = (token: string, rememberMe: boolean) => {
    login(token, rememberMe);
    setIsModalOpen(false);
    navigate('/dashboard');
  };

  return (
    <div className="app">
      <Navbar onLoginClick={handleOpenLogin} onSignupClick={handleOpenSignup} />
      <main>
        <Hero onGetStarted={handleOpenSignup} />
        <Features />
      </main>
      <AuthModal
        isOpen={isModalOpen}
        initialMode={authMode}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function DashboardPage() {
  const { logout } = useAuth();

  return <Dashboard onLogout={logout} />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
