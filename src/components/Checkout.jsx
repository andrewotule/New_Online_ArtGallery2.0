import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircleIcon, LockClosedIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { items: cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    phone: '',
    // Shipping Address
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zipCode: '',
    saveInfo: false,
    // Billing Information
    sameAsShipping: true,
    billingAddress: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      country: 'United States',
      state: '',
      zipCode: '',
    },
    // Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
  });
  const [errors, setErrors] = useState({});

  // Calculate order summary
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 49.99) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Form handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress,
        [name]: value
      }
    }));
  };

  // Validation
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (step === 2) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
      else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
        newErrors.zipCode = 'Please enter a valid ZIP code';
      }
    }

    // ... rest of the validation logic

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      // Process payment logic here
      console.log('Processing payment...', formData);
      
      // Simulate API call
      setTimeout(() => {
        clearCart();
        setCurrentStep(5); // Show success screen
      }, 1500);
    }
  };

  // Steps configuration
  const steps = [
    { id: '01', name: 'Contact Info', description: 'Your contact information' },
    { id: '02', name: 'Shipping', description: 'Shipping address' },
    { id: '03', name: 'Billing', description: 'Payment method' },
    { id: '04', name: 'Review', description: 'Review your order' },
  ];

  // Render empty cart state
  if (cartItems.length === 0 && currentStep !== 5) {
    return <EmptyCartView onContinueShopping={() => navigate('/gallery')} />;
  }

  // Render success state
  if (currentStep === 5) {
    return <SuccessView 
      cartItems={cartItems} 
      subtotal={subtotal}
      shipping={shipping}
      tax={tax}
      total={total}
      onContinueShopping={() => navigate('/gallery')}
      onViewOrderStatus={() => navigate('/orders')}
    />;
  }

  // Main checkout form
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <CheckoutHeader />
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg overflow-hidden">
              <ProgressSteps 
                steps={steps} 
                currentStep={currentStep} 
              />
              
              <div className="p-6">
                {currentStep === 1 && (
                  <ContactInfoStep 
                    formData={formData} 
                    errors={errors} 
                    onChange={handleChange} 
                  />
                )}
                
                {currentStep === 2 && (
                  <ShippingStep 
                    formData={formData} 
                    errors={errors} 
                    onChange={handleChange} 
                  />
                )}
                
                {currentStep === 3 && (
                  <BillingStep 
                    formData={formData} 
                    errors={errors} 
                    onChange={handleChange} 
                    onBillingChange={handleBillingChange} 
                    setFormData={setFormData}
                  />
                )}
                
                {currentStep === 4 && (
                  <PaymentStep 
                    formData={formData} 
                    errors={errors} 
                    onChange={handleChange} 
                  />
                )}
                
                <Navigation 
                  currentStep={currentStep}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  totalSteps={steps.length}
                />
              </div>
            </form>
          </div>
          
          <OrderSummary 
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

// Sub-components
const EmptyCartView = ({ onContinueShopping }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h2 className="mt-3 text-2xl font-bold text-gray-900">Your cart is empty</h2>
      <p className="mt-2 text-gray-600">Looks like you haven't added any items to your cart yet.</p>
      <div className="mt-6">
        <button
          onClick={onContinueShopping}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
);

const SuccessView = ({ 
  cartItems, 
  subtotal, 
  shipping, 
  tax, 
  total, 
  onContinueShopping,
  onViewOrderStatus
}) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
    <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-md text-center">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
        <CheckCircleIcon className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="mt-6 text-3xl font-bold text-gray-900">Order Confirmed!</h2>
      <p className="mt-2 text-lg text-gray-600">Thank you for your purchase.</p>
      <p className="text-gray-500 mt-4">Your order has been placed and is being processed. You'll receive a confirmation email shortly.</p>
      
      <OrderDetails 
        cartItems={cartItems}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
      />

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onContinueShopping}
          className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue Shopping
        </button>
        <button
          onClick={onViewOrderStatus}
          className="flex-1 bg-white border border-gray-300 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View Order Status
        </button>
      </div>
    </div>
  </div>
);

// ... Additional sub-components (ProgressSteps, ContactInfoStep, ShippingStep, BillingStep, PaymentStep, Navigation, OrderSummary) would be defined here

export default Checkout;