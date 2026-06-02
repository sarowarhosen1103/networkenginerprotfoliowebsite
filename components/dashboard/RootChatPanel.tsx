"use client";

import React, { useState, useEffect, useRef } from "react";
import LiveChatWindow from "./LiveChatWindow";
import { io, Socket } from "socket.io-client";

export default function RootChatPanel({ currentUser }: { currentUser: any }) {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Fetch users and their unread counts
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/chat");
        const data = await res.json();
        if (data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchUsers();

    // Setup socket
    fetch('/api/socket').finally(() => {
      const socket = io({
        path: '/api/socket',
        addTrailingSlash: false,
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        socket.emit('user_connected', currentUser.id);
      });

      socket.on('online_users', (onlineIds: string[]) => {
        setOnlineUsers(onlineIds);
      });

      socket.on('receive_message', (msg: any) => {
        setUsers(prevUsers => {
          return prevUsers.map(u => {
            // If we receive a message from someone we are not currently looking at
            // increment their unread count
            if (u._id === msg.senderId && u._id !== selectedUserId) {
              return { ...u, unreadCount: (u.unreadCount || 0) + 1 };
            }
            return u;
          });
        });
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [currentUser.id, selectedUserId]);

  const handleSelectUser = (id: string) => {
    setSelectedUserId(id);
    // Optimistically clear unread count since LiveChatWindow will mark as read
    setUsers(prevUsers => prevUsers.map(u => u._id === id ? { ...u, unreadCount: 0 } : u));
  };

  return (
    <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-6 flex flex-col flex-grow">
      <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined">forum</span>
        SECURE COMMUNICATIONS (ROOT)
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow">
        {/* User List Sidebar */}
        <div className="lg:col-span-1 border border-white/10 rounded-sm bg-black/20 overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-3 bg-white/5 border-b border-white/10 font-label-caps text-xs text-primary-container">
            ACTIVE CONNECTIONS
          </div>
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {users.length === 0 ? (
              <p className="p-4 font-label-mono text-xs text-outline">NO USERS FOUND</p>
            ) : (
              users.map((u) => {
                const isOnline = onlineUsers.includes(u._id);
                const hasUnread = u.unreadCount > 0;
                
                return (
                  <button
                    key={u._id}
                    onClick={() => handleSelectUser(u._id)}
                    className={`w-full text-left p-3 border-b border-white/5 font-label-mono transition-all hover:bg-primary/10 relative ${
                      selectedUserId === u._id ? "bg-primary/20 border-l-2 border-l-primary" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm flex items-center gap-2">
                          <span className={selectedUserId === u._id ? "text-primary" : "text-primary-container"}>
                            {u.name}
                          </span>
                          {isOnline && (
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" title="Online"></span>
                          )}
                        </div>
                        <div className="text-xs text-outline truncate">{u.email}</div>
                      </div>
                      
                      {hasUnread && (
                        <div className="bg-error text-on-error text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(255,84,73,0.5)]">
                          {u.unreadCount}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3 min-h-[500px] flex flex-col">
          {selectedUserId ? (
            <LiveChatWindow currentUser={currentUser} targetUserId={selectedUserId} />
          ) : (
            <div className="flex-grow border border-white/10 flex items-center justify-center font-label-mono text-outline bg-black/20">
              SELECT A CONNECTION TO INITIATE COMM LINK
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
