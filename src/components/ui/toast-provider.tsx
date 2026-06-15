"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      expand={false}
      toastOptions={{
        style: {
          borderRadius: "12px",
          border: "1px solid var(--border)",
          background: "var(--background)",
          color: "var(--foreground)",
        },
      }}
    />
  );
}