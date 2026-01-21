import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { VehicleType, CreateVehicleRequest } from '../services/api';
import './VehicleFormModal.css';

interface VehicleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  brand: string;
  model: string;
  year: string;
  kilometers: string;
  vehicleTypeId: string;
}

interface FormErrors {
  brand?: string;
  model?: string;
  year?: string;
  kilometers?: string;
  vehicleTypeId?: string;
  general?: string;
}

export function VehicleFormModal({ isOpen, onClose, onSuccess }: VehicleFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    brand: '',
    model: '',
    year: '',
    kilometers: '',
    vehicleTypeId: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [successState, setSuccessState] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ brand: '', model: '', year: '', kilometers: '', vehicleTypeId: '' });
      setErrors({});
      setSuccessState(false);
      fetchVehicleTypes();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (successState) {
      const timer = setTimeout(() => {
        onSuccess();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [successState, onSuccess]);

  const fetchVehicleTypes = async () => {
    setLoadingTypes(true);
    try {
      const types = await api.getVehicleTypes();
      setVehicleTypes(types);
    } catch (error) {
      console.error('Error fetching vehicle types:', error);
    } finally {
      setLoadingTypes(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.brand.trim()) {
      newErrors.brand = 'La marca es requerida';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'El modelo es requerido';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'El año es requerido';
    } else {
      const yearNum = parseInt(formData.year);
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear + 1) {
        newErrors.year = `Ingresa un año válido (1900-${currentYear + 1})`;
      }
    }

    if (!formData.kilometers.trim()) {
      newErrors.kilometers = 'El kilometraje es requerido';
    } else {
      const kmNum = parseInt(formData.kilometers);
      if (isNaN(kmNum) || kmNum < 0) {
        newErrors.kilometers = 'Ingresa un kilometraje válido';
      }
    }

    if (!formData.vehicleTypeId) {
      newErrors.vehicleTypeId = 'Selecciona un tipo de vehículo';
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
      const request: CreateVehicleRequest = {
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        year: parseInt(formData.year),
        kilometers: parseInt(formData.kilometers),
        vehicleTypeId: parseInt(formData.vehicleTypeId),
      };

      await api.createVehicle(request);
      setSuccessState(true);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Ocurrió un error. Por favor intenta de nuevo.';
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container vehicle-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {successState ? (
          <div className="success-state">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="success-title">¡Vehículo registrado!</h2>
            <p className="success-message">Tu vehículo ha sido agregado exitosamente.</p>
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
              <h2 className="modal-title">Agregar Vehículo</h2>
              <p className="modal-subtitle">Ingresa los datos de tu vehículo</p>
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

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="brand" className="form-label">Marca</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 7H17M7 12H17M7 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      className={`form-input ${errors.brand ? 'error' : ''}`}
                      placeholder="Toyota"
                      value={formData.brand}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.brand && <span className="form-error">{errors.brand}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="model" className="form-label">Modelo</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 7H17M7 12H17M7 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <input
                      type="text"
                      id="model"
                      name="model"
                      className={`form-input ${errors.model ? 'error' : ''}`}
                      placeholder="Corolla"
                      value={formData.model}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.model && <span className="form-error">{errors.model}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="year" className="form-label">Año</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      className={`form-input ${errors.year ? 'error' : ''}`}
                      placeholder="2024"
                      value={formData.year}
                      onChange={handleInputChange}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                    />
                  </div>
                  {errors.year && <span className="form-error">{errors.year}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="kilometers" className="form-label">Kilometraje</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <input
                      type="number"
                      id="kilometers"
                      name="kilometers"
                      className={`form-input ${errors.kilometers ? 'error' : ''}`}
                      placeholder="50000"
                      value={formData.kilometers}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                  {errors.kilometers && <span className="form-error">{errors.kilometers}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="vehicleTypeId" className="form-label">Tipo de Vehículo</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M19 17H21V18C21 18.55 20.55 19 20 19H19V17Z" fill="currentColor"/>
                    <path d="M3 17H5V19H4C3.45 19 3 18.55 3 18V17Z" fill="currentColor"/>
                    <path d="M21 11L19.25 5.5C19 4.65 18.2 4 17.3 4H6.7C5.8 4 5 4.65 4.75 5.5L3 11V16C3 16.55 3.45 17 4 17H20C20.55 17 21 16.55 21 16V11Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
                    <circle cx="17" cy="14" r="1.5" fill="currentColor"/>
                  </svg>
                  <select
                    id="vehicleTypeId"
                    name="vehicleTypeId"
                    className={`form-input form-select ${errors.vehicleTypeId ? 'error' : ''}`}
                    value={formData.vehicleTypeId}
                    onChange={handleInputChange}
                    disabled={loadingTypes}
                  >
                    <option value="">
                      {loadingTypes ? 'Cargando...' : 'Selecciona un tipo'}
                    </option>
                    {vehicleTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.vehicleTypeId && <span className="form-error">{errors.vehicleTypeId}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={isLoading || loadingTypes}>
                {isLoading ? (
                  <span className="btn-loading">
                    <svg className="spinner" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
                    </svg>
                    Guardando...
                  </span>
                ) : (
                  'Agregar Vehículo'
                )}
              </button>
            </form>

            <div className="modal-footer">
              <p>Podrás editar los datos de tu vehículo en cualquier momento</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
