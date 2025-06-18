import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ['websocket'], // fallback to polling if websocket fails
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
