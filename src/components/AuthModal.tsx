import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './AuthModal.css';

type AuthMode = 'login' | 'signup';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: AuthMode;
  onClose: () => void;
  onSuccess: (token: string, rememberMe: boolean) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export function AuthModal({ isOpen, initialMode, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [successState, setSuccessState] = useState<{ show: boolean; token: string | null }>({
    show: false,
    token: null,
  });

  useEffect(() => {
    setMode(initialMode);
    setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setRememberMe(false);
    setSuccessState({ show: false, token: null });
  }, [initialMode, isOpen]);

  useEffect(() => {
    if (successState.show && successState.token) {
      const timer = setTimeout(() => {
        // For signup, always remember (auto-login)
        onSuccess(successState.token!, mode === 'signup' ? true : rememberMe);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [successState, onSuccess, rememberMe, mode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (mode === 'signup') {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'El nombre es requerido';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'El apellido es requerido';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      let response;

      if (mode === 'login') {
        response = await api.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await api.register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
      }

      setSuccessState({ show: true, token: response.token });
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Ocurrió un error. Por favor intenta de nuevo.';
      setErrors({ general: message });
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setErrors({});
    setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {successState.show ? (
          <div className="success-state">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="success-title">
              {mode === 'login' ? '¡Bienvenido!' : '¡Cuenta creada!'}
            </h2>
            <p className="success-message">
              {mode === 'login'
                ? 'Inicio de sesión exitoso. Redirigiendo...'
                : 'Tu cuenta ha sido creada exitosamente. Redirigiendo...'}
            </p>
            <div className="success-loader">
              <div className="success-loader-bar"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <div className="modal-logo">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M19 17H21V18C21 18.55 20.55 19 20 19H19V17Z" fill="currentColor"/>
                  <path d="M3 17H5V19H4C3.45 19 3 18.55 3 18V17Z" fill="currentColor"/>
                  <path d="M21 11L19.25 5.5C19 4.65 18.2 4 17.3 4H6.7C5.8 4 5 4.65 4.75 5.5L3 11V16C3 16.55 3.45 17 4 17H20C20.55 17 21 16.55 21 16V11Z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
                  <circle cx="17" cy="14" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <h2 className="modal-title">
                {mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
              </h2>
              <p className="modal-subtitle">
                {mode === 'login'
                  ? 'Ingresa tus credenciales para acceder'
                  : 'Comienza a gestionar tus vehículos hoy'}
              </p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="form-error-banner">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {errors.general}
            </div>
          )}

          {mode === 'signup' && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">Nombre</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Juan"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    autoComplete="given-name"
                  />
                </div>
                {errors.firstName && <span className="form-error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">Apellido</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                    placeholder="Pérez"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    autoComplete="family-name"
                  />
                </div>
                {errors.lastName && <span className="form-error">{errors.lastName}</span>}
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20C7 20 2.73 16.11 1 12C1.69 10.24 2.79 8.69 4.19 7.48M9.88 9.88C10.42 9.34 11.17 9 12 9C13.66 9 15 10.34 15 12C15 12.83 14.66 13.58 14.12 14.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8.53 5.47C9.55 5.16 10.77 5 12 5C17 5 21.27 8.89 23 13C22.45 14.36 21.61 15.58 20.5 16.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M1 12C2.73 7.89 7 4 12 4C17 4 21.27 7.89 23 12C21.27 16.11 17 20 12 20C7 20 2.73 16.11 1 12Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                />
              </div>
              {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
            </div>
          )}

          {mode === 'login' && (
            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Recordarme</span>
              </label>
              <button type="button" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
            {isLoading ? (
              <span className="btn-loading">
                <svg className="spinner" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
                </svg>
                Procesando...
              </span>
            ) : (
              mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'
            )}
          </button>
        </form>

            <div className="modal-footer">
              <p>
                {mode === 'login' ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                <button type="button" className="switch-mode" onClick={switchMode}>
                  {mode === 'login' ? 'Regístrate' : 'Inicia Sesión'}
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
