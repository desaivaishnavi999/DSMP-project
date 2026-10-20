import { useEffect } from 'react';
import { socket } from '../services/socket';

export const useSocket = (event: string, callback: (data: any) => void) => {
  useEffect(() => {
    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);

  return {
    socket,
    emit: (event: string, data: any) => socket.emit(event, data),
  };
};
