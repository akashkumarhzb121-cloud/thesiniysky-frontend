'use client';

export default function AdminPaymentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Payments</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
          Payment processing is handled via Razorpay and Stripe integration.
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm">
          Payment records are created when clients complete checkout.
          No historical payment list is available yet.
        </p>
      </div>
    </div>
  );
}
