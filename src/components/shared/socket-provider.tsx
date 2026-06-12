'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/stores/auth-store';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  notifications: any[];
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  notifications: [],
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'https://thesiniysky-backend.onrender.com', {
      auth: { token: accessToken },
    });

    socketInstance.on('connect', () => setIsConnected(true));
    socketInstance.on('disconnect', () => setIsConnected(false));
    
    socketInstance.on('notification:received', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    socketInstance.on('lead:change', (data) => {
      console.log('Lead updated:', data);
    });

    socketInstance.on('payment:success', (data) => {
      console.log('Payment completed:', data);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [accessToken]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, notifications }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
