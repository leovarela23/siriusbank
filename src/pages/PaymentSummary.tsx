import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export default function PaymentSummary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // In a real app, we would fetch payment details using the token
  const paymentDetails = {
    InstructionIdentification: "TEST1736021657",
    Reference: "TEST1736021657",
    Amount: "1.00",
    Currency: "GBP",
    CreditorAccount: {
      Identification: "50000012345601",
      Name: "Tester Testarossa"
    }
  };

  const handleAction = (action: 'accept' | 'cancel') => {
    navigate('/processing', { state: { action, callbackUrl: 'https://example.com' } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center">
            <Rocket className="h-12 w-12 text-blue-400" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">Payment Summary</h2>
        </div>

        <div className="mt-8 space-y-6 text-white">
          <div className="bg-gray-700 p-6 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-400">From Account:</div>
              <div>Zythorax Nebulaar (123456789)</div>
              
              <div className="text-gray-400">To Account:</div>
              <div>{paymentDetails.CreditorAccount.Name} ({paymentDetails.CreditorAccount.Identification})</div>
              
              <div className="text-gray-400">Amount:</div>
              <div>{paymentDetails.Amount} {paymentDetails.Currency}</div>
              
              <div className="text-gray-400">Reference:</div>
              <div>{paymentDetails.Reference}</div>
              
              <div className="text-gray-400">Instruction ID:</div>
              <div>{paymentDetails.InstructionIdentification}</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleAction('cancel')}
              className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              onClick={() => handleAction('accept')}
              className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}