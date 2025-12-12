import { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useMessageStore } from "../store/useMessageStore.js";
import {useAuthStore} from "../store/useAuthStore.js"

export default function ChatWindow({ project }) {
  const [message, setMessage] = useState("");
  const {messages, fetchMessages, loading, hasMore, sendMessage} = useMessageStore();
  const {authUser} = useAuthStore()

  useEffect(() => {
    if(project){
      fetchMessages(project._id, true);
    }
  }, [fetchMessages, project])


  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/60">
        <p className="text-lg">No project selected</p>
        <p className="text-sm">Please select a project to start chatting.</p>
      </div>
    );
  }


  const sendHandler = async() => {
    console.log(project._id);
    if(message.trim()){
      await sendMessage({teamId : project._id, message : message.trim(), image : null});
    };
    setMessage("");
  }

  

  const currentUser = authUser._id;
  console.log(project)



  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">{project.title}</h2>
        <p className="text-sm text-white/60">{project.team.length} members</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* 🔥 Empty Messages UI */}
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-white/50">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.userId === authUser._id;

            return (
              <div
                key={msg._id}
                className={`flex flex-col max-w-xs ${
                  isMe ? "ml-auto items-end text-right" : "items-start"
                }`}
              >

                {!isMe && (
                  <p className="text-sm text-white/60 mb-1">{project.team.find(user => user.userId === msg.userId)?.name}</p>
                )}

                {/* Text */}
                {msg.message && (
                  <div
                    className={`p-3 rounded-lg ${
                      isMe
                        ? "bg-blue-600 text-white"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    {msg.message}
                  </div>
                )}

                {msg.image && (
                  <img
                    src={msg.image}
                    className={`w-48 rounded-lg mt-2 shadow ${
                      isMe ? "ml-auto" : "mr-auto"
                    }`}
                    alt="sent"
                  />
                )}

                <p className="text-xs text-white/40 mt-1">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            );
          })
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-white/10 flex items-center gap-3">
        <input
          type="text"
          placeholder="Type your message…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow bg-white/10 px-4 py-2 rounded-lg outline-none"
        />

        <button className="p-3 bg-blue-600 rounded-full hover:bg-blue-700" onClick={sendHandler}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
