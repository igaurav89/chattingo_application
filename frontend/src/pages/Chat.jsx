import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Chat.css";

function Chat() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [users] = useState([
    { name: "Rahul", online: true },
    { name: "Priya", online: true },
    { name: "Amit", online: false },
    { name: "Sneha", online: true }
  ]);

  const [messages, setMessages] = useState([
    { sender: "them", text: "Hello Gaurav 👋", time: "10:30" },
    { sender: "me", text: "Hi bro 🔥", time: "10:31" }
  ]);

  // Protect Chat Page
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "me",
        text: message,
        time: "Now"
      }
    ]);

    setMessage("");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="chat-layout">

      {/* Sidebar */}
      <div className="sidebar">

        <div className="logo">
          💬 Chattingo
        </div>

        <input
          className="search-box"
          placeholder="Search user..."
        />

        <div className="user-list">

          {users.map((user, index) => (
            <div className="user-card" key={index}>
              <div className="avatar">
                {user.name.charAt(0)}
              </div>

              <div className="user-info">
                <h4>{user.name}</h4>
                <p>{user.online ? "Online 🟢" : "Offline ⚫"}</p>
              </div>
            </div>
          ))}

        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

      {/* Chat Area */}
      <div className="chat-box">

        <div className="chat-header">
          Rahul 🟢
        </div>

        <div className="chat-messages">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "me"
                  ? "my-msg"
                  : "other-msg"
              }
            >
              <p>{msg.text}</p>
              <span>{msg.time}</span>
            </div>
          ))}

        </div>

        <div className="chat-input">

          <button>😊</button>

          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter"
                ? sendMessage()
                : null
            }
          />

          <button>🎤</button>
          <button>📷</button>

          <button
            className="send-btn"
            onClick={sendMessage}
          >
            ➤
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;