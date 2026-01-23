import { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useMessageStore } from "../store/useMessageStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

export default function ChatWindow({ project }) {
  const [text, setText] = useState("");
  const { messages, fetchMessages, sendMessage, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // 1. Setup Subscription
  useEffect(() => {
    if (project?._id) {
      console.log("🔗 Connecting to Chat Room:", project.title);
      fetchMessages(project._id);
      subscribeToMessages(project._id);
      return () => unsubscribeFromMessages();
    }
  }, [project?._id]);

  // 2. Auto-scroll
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. The Handler
  const handleSend = async (e) => {
    e.preventDefault(); // Prevents page reload
    console.log("👆 Attempting to send:", text);

    if (!text.trim()) {
        console.log("⚠️ Text is empty");
        return;
    }
    
    if (!project?._id) {
        console.error("❌ No Project ID found!");
        return;
    }

    try {
        console.log("🚀 Calling API...");
        await sendMessage({ 
            teamId: project._id, 
            message: text.trim(), 
            image: null 
        });
        console.log("✅ API Called successfully");
        setText(""); // Clear input
    } catch (error) {
        console.error("❌ Send Failed:", error);
    }
  };

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/60 bg-[#151725]">
        <p className="text-lg">No project selected</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#151725] rounded-r-2xl overflow-hidden relative">
      
      {/* HEADER */}
      <div className="p-4 border-b border-white/10 bg-[#0B0C15]/30 flex items-center gap-4 z-10">
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-indigo-600 flex items-center justify-center">
            {project.image ? (
                <img src={project.image} alt="Project" className="w-full h-full object-cover" />
            ) : (
                <span className="text-white font-bold">{project.title.charAt(0)}</span>
            )}
        </div>
        <div>
            <h2 className="text-lg font-bold text-white">{project.title}</h2>
            <p className="text-xs text-gray-400">{project.team.length} Members</p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar z-0">
        {messages.length === 0 ? (
           <div className="h-full flex flex-col items-center justify-center opacity-40">
             <p className="text-gray-400">No messages yet.</p>
           </div>
        ) : (
          messages.map((msg, idx) => {
            // Robust check for ID (handles populated object or raw ID)
            const msgUserId = msg.userId?._id || msg.userId; 
            const isMe = msgUserId === authUser._id;
            const senderName = msg.userId?.fullName || "User";

            return (
              <div key={idx} className={`flex flex-col max-w-[70%] ${isMe ? "ml-auto items-end" : "items-start"}`}>
                {!isMe && <span className="text-[10px] text-gray-500 mb-1 ml-1">{senderName}</span>}
                
                <div className={`px-4 py-2 rounded-2xl text-sm break-words ${
                  isMe ? "bg-indigo-600 text-white rounded-br-none" : "bg-white/10 text-gray-200 rounded-bl-none"
                }`}>
                  {msg.message}
                </div>
                
                <span className="text-[10px] text-gray-600 mt-1">
                    {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            );
          })
        )}
        <div ref={messageEndRef} />
      </div>

      {/* INPUT FORM (Fixed z-index) */}
      <form 
        onSubmit={handleSend}
        className="p-4 bg-[#0B0C15]/50 border-t border-white/10 flex items-center gap-3 z-20 relative"
      >
        <input
          type="text"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition placeholder-gray-600"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button 
            type="submit"
            className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white transition shadow-lg shadow-indigo-500/20"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}