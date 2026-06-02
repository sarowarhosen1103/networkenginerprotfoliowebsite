"use client";

import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface LiveChatWindowProps {
  currentUser: any;
  targetUserId?: string;
}

export default function LiveChatWindow({ currentUser, targetUserId }: LiveChatWindowProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // Mark messages as read
  const markAsRead = async () => {
    // If we are root, the sender is targetUserId. If we are user, we need to know who sent it, but typically we just mark all unread from the person we are talking to.
    if (!targetUserId && currentUser.role === "user") {
      // Normal user needs to find root ID, but server can figure it out or we just mark anything targeted to us.
      // Actually, our read endpoint needs senderId. Let's just fetch messages, which is fine, or we skip read receipts for user since they only talk to root.
    } else if (targetUserId) {
      fetch("/api/chat/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId: targetUserId }),
      }).catch(console.error);
    }
  };

  useEffect(() => {
    // 1. Initial fetch of message history
    const fetchMessages = async () => {
      try {
        const url = targetUserId ? `/api/chat?userId=${targetUserId}` : "/api/chat";
        const res = await fetch(url);
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
    markAsRead();

    // 2. Setup Socket.IO
    fetch('/api/socket').finally(() => {
      const socket = io({
        path: '/api/socket',
        addTrailingSlash: false,
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        socket.emit('user_connected', currentUser.id);
      });

      socket.on('receive_message', (msg: any) => {
        // Only append if it belongs to this conversation
        const isFromTarget = targetUserId && msg.senderId === targetUserId;
        const isToTarget = targetUserId && msg.receiverId === targetUserId;
        const isRoot = currentUser.role === "root";
        
        if (!isRoot || isFromTarget || isToTarget) {
          setMessages((prev) => [...prev, msg]);
          markAsRead();
        }
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [targetUserId, currentUser.id, currentUser.role]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input, receiverId: targetUserId }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
        // Emit via socket
        if (socketRef.current) {
          socketRef.current.emit('send_message', data.message);
        }
        setInput("");
      } else {
        setMessages((prev) => [...prev, {
          _id: Math.random().toString(),
          senderId: { _id: "system", name: "SYSTEM_ALERT" },
          content: data.error || "Transmission failed.",
          createdAt: new Date().toISOString()
        }]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMessageType = (msg: any) => {
    // msg.senderId can be an object (populated) or a string (from socket sometimes if not populated fully, but our POST returns populated)
    const senderId = typeof msg.senderId === 'object' ? msg.senderId._id : msg.senderId;
    if (senderId === "system") return "alert";
    if (senderId === currentUser.id) return "sent";
    return "received";
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="flex flex-col h-full bg-surface/50 border-r border-outline-variant/30 flex-grow relative">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-primary-container/10 border border-primary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-container">shield_person</span>
          </div>
          <div>
            <h1 className="text-headline-md font-headline-md text-primary-container leading-none mb-1">
              {currentUser?.role === 'root' ? 'SECURE UPLINK TO CLIENT' : 'SECURE UPLINK TO ROOT'}
            </h1>
            <p className="text-label-mono font-label-mono text-xs text-on-surface-variant uppercase">
              CHANNEL: ENCRYPTED // STATUS: {loading ? 'CONNECTING...' : 'ONLINE'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface/50 via-background to-background"
      >
        {messages.map((msg, index) => {
          const type = getMessageType(msg);
          const senderName = typeof msg.senderId === 'object' ? msg.senderId.name : (type === 'sent' ? currentUser.name : 'USER');
          
          return (
            <div key={msg._id || index} className={`flex flex-col ${type === 'sent' ? 'items-end' : 'items-start'}`}>
              <div className={`text-[10px] font-label-mono mb-1 ${type === 'alert' ? 'text-error' : 'text-on-surface-variant'}`}>
                {type === 'alert' ? 'SYSTEM' : senderName} // {msg.createdAt ? formatTime(msg.createdAt) : 'NOW'}
              </div>
              <div className={`max-w-[80%] p-3 rounded-sm font-label-mono text-sm leading-relaxed ${
                type === "sent" 
                  ? "bg-primary-container/20 text-primary border border-primary-container/30" 
                  : type === "alert"
                  ? "bg-error/20 text-error border border-error/50 font-bold"
                  : "bg-surface-variant/50 text-on-surface border border-white/5"
              }`}>
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 bg-black/40 border-t border-white/5">
        <div className="flex gap-2 items-center bg-surface p-2 rounded-sm border border-outline-variant/30 focus-within:border-primary-container/50 transition-colors">
          <span className="material-symbols-outlined text-primary-container/50 pl-2">terminal</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent border-none outline-none text-label-mono text-primary-container text-sm placeholder:text-primary-container/30"
            placeholder="ENTER_MESSAGE..."
            type="text"
          />
          <div className="flex items-center gap-3">
            <button type="submit" className="bg-primary-container text-on-primary-container px-3 py-1.5 rounded text-[10px] font-label-caps font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_10px_rgba(0,242,255,0.3)]">
              SEND
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
