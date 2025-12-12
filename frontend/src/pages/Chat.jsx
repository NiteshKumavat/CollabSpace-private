import TeamSidebar from "../components/TeamSidebar.jsx";
import MemberSidebar from "../components/MemberSidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import { useMessageStore } from "../store/useMessageStore.js";
import { useState, useEffect } from "react";

export default function Chat() {

  const [side, setSide] = useState("Teams")
  const [selectedTab, setSelectedTab] = useState("Teams");
  const {projects , getMyProjects} = useMessageStore();
  const [selectedProject, setSelectedProject] = useState(null);
  

  useEffect(() => {
    getMyProjects();
  }, [getMyProjects])

  return (
    <div className="h-screen w-full bg-[#0B1630] text-white flex">


        <div className="w-1/3 border-r border-white/10 p-5">
            <h2 className="text-xl font-semibold mb-4">{side === "Teams" ? "All Teams" : "Team Members"}</h2>


            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => {setSelectedTab("members"); setSide("member")}}
                    className={`px-4 py-2 rounded-lg ${
                        selectedTab === "members"
                        ? "bg-blue-600"
                        : "bg-white/10"
                    }`}
                >
                    Members
                </button>
                <button
                    onClick={() => {setSelectedTab("Teams"); setSide("Teams")}}
                    className={`px-4 py-2 rounded-lg ${
                        selectedTab === "Teams"
                        ? "bg-blue-600"
                        : "bg-white/10"
                    }`}
                >
                    All Teams
                </button>
            </div>
            {side === "Teams" ? (
                <TeamSidebar projects={projects} setSelectedProject={setSelectedProject}/>
            ) : (
                <MemberSidebar project={selectedProject} />
            )}

      </div>



      {/* Right - Chat Window */}
      <div className="flex-1">
        <ChatWindow project={selectedProject}/>
      </div>
    </div>
  );
}


