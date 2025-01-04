import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export default function RedirectPage() {
  const location = useLocation();
  const { action, callbackUrl } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = callbackUrl;
    }, 3000);

    return () => clearTimeout(timer);
  }, [callbackUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl text-center">
        <div className="flex justify-center">
          <Rocket className="h-12 w-12 text-blue-400 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-white">Processing Your Payment</h2>
        <p className="text-gray-400">Please wait while we process your {action === 'accept' ? 'payment' : 'cancellation'}...</p>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}