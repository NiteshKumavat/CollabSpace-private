import TeamSidebar from "../components/TeamSidebar.jsx";
import MemberSidebar from "../components/MemberSidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import { useMessageStore } from "../store/useMessageStore.js";
import { useState, useEffect } from "react";
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

export default function Chat() {

  const [side, setSide] = useState("Teams")
  const [selectedTab, setSelectedTab] = useState("Teams");
  const {projects , getMyProjects} = useMessageStore();
  const [selectedProject, setSelectedProject] = useState(null);
  

  useEffect(() => {
    getMyProjects();
  }, [getMyProjects])

  return (
    <div>
        <Header />
        <div className="relative bg-[#0B1630] text-white flex m-5 rounded-2xl p-[3px]">
            {/* Animated shiny border */}
            <div className="absolute inset-0 [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.cyan.500)_86%,_theme(colors.cyan.300)_90%,_theme(colors.cyan.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border flex overflow-hidden"></div>
            
            {/* Main content container */}
            <div className="relative w-full bg-[#0B1630] rounded-2xl flex z-10">


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




                <div className="flex-1">
                    <ChatWindow project={selectedProject}/>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
}