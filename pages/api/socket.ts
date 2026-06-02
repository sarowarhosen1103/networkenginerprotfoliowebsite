import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { NextApiResponse } from 'next';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: any & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

// Global maps to track online users
const onlineUsers = new Map<string, string>(); // socketId -> userId
const userSockets = new Map<string, string>(); // userId -> socketId

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = '/api/socket';
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    
    io.on('connection', socket => {
      socket.on('user_connected', (userId: string) => {
        onlineUsers.set(socket.id, userId);
        userSockets.set(userId, socket.id);
        
        // Broadcast online status to everyone
        io.emit('online_users', Array.from(new Set(onlineUsers.values())));
      });

      socket.on('send_message', (message) => {
        const receiverSocketId = userSockets.get(message.receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receive_message', message);
        }
      });

      socket.on('disconnect', () => {
        const userId = onlineUsers.get(socket.id);
        onlineUsers.delete(socket.id);
        
        if (userId) {
          let isStillOnline = false;
          for (const [_, uId] of Array.from(onlineUsers.entries())) {
            if (uId === userId) {
              isStillOnline = true;
              break;
            }
          }
          if (!isStillOnline) {
            userSockets.delete(userId);
            io.emit('online_users', Array.from(new Set(onlineUsers.values())));
          }
        }
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
