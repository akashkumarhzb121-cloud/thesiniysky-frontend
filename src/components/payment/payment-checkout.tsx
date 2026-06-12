'use client';

import { useState } from 'react';
import { paymentsApi } from '@/api/payments.api';

interface PaymentCheckoutProps {
  orderId: string;
  amount: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function RazorpayCheckout({ orderId, amount, onSuccess, onError }: PaymentCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await paymentsApi.process({ orderId, amount, method: 'razorpay' });
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'USD',
        name: 'TheSiniySky',
        description: 'Payment for Order #' + orderId,
        order_id: response.data.data.id,
        handler: async function (paymentResponse: any) {
          await paymentsApi.verify({
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,
          });
          onSuccess?.();
        },
      };
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      onError?.(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 w-full"
    >
      {loading ? 'Processing...' : 'Pay with Razorpay - $' + amount}
    </button>
  );
}

export function StripeCheckout({ orderId, amount, onSuccess, onError }: PaymentCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await paymentsApi.process({ orderId, amount, method: 'stripe' });
      const stripe = (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.data.id,
      });
      if (error) {
        onError?.(error.message);
      }
    } catch (err: any) {
      onError?.(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 w-full"
    >
      {loading ? 'Processing...' : 'Pay with Stripe - $' + amount}
    </button>
  );
}

export function PaymentMethodSelector({ orderId, amount }: { orderId: string; amount: number }) {
  const [method, setMethod] = useState<'razorpay' | 'stripe'>('razorpay');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <div className="bg-white p-6 rounded-lg border max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
      
      {status === 'success' ? (
        <div className="text-center py-8">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <p className="text-lg font-medium">Payment Successful!</p>
          <p className="text-gray-500 mt-2">Thank you for your purchase.</p>
        </div>
      ) : (
        <>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMethod('razorpay')}
              className={'flex-1 p-4 border-2 rounded-lg text-center transition-colors ' + (method === 'razorpay' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300')}
            >
              <span className="font-medium">Razorpay</span>
            </button>
            <button
              onClick={() => setMethod('stripe')}
              className={'flex-1 p-4 border-2 rounded-lg text-center transition-colors ' + (method === 'stripe' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300')}
            >
              <span className="font-medium">Stripe</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4">{errorMsg}</div>
          )}

          {method === 'razorpay' ? (
            <RazorpayCheckout
              orderId={orderId}
              amount={amount}
              onSuccess={() => setStatus('success')}
              onError={(msg) => { setStatus('error'); setErrorMsg(msg); }}
            />
          ) : (
            <StripeCheckout
              orderId={orderId}
              amount={amount}
              onSuccess={() => setStatus('success')}
              onError={(msg) => { setStatus('error'); setErrorMsg(msg); }}
            />
          )}
        </>
      )}
    </div>
  );
}
