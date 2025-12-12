import React from 'react';
import { Toaster } from "react-hot-toast";
import { useProjectStore } from '../store/useProjectStore.js';
import { useAuthStore } from '../store/useAuthStore.js';

function ProjectBox({ onStart, project, isOwner }) { 
    const { requestToJoin, leaveProject, loading } = useProjectStore();
    const { authUser } = useAuthStore();
    
    const hasRequested = project.requests?.some(req => req.userId === authUser?._id);
    const isTeamMember = project.team?.some(member => member.userId === authUser?._id && member.userId !== project.adminId);

    const showJoinButton = !isOwner && !isTeamMember && !hasRequested && authUser?._id;

    const onJoin = async () => await requestToJoin(project._id);
    const onLeave = async () => await leaveProject(project._id);

    return (
        <div 
            className="
                w-[260px] bg-gradient-to-br from-indigo-50 via-white to-rose-50 rounded-2xl shadow-lg 
                border border-indigo-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-100/50 
                hover:-translate-y-1 transition-all duration-300 cursor-pointer
                backdrop-blur-sm bg-white/30
            " 
            onClick={onStart}
        >
            <Toaster />


            <div className="relative h-40 overflow-hidden">
                <img 
                    src={project.image || `https://api.dicebear.com/7.x/shapes/svg?seed=${project.title}&backgroundColor=6d28d9,7c3aed,8b5cf6&size=80`}
                    alt={project.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-all duration-500"
                />


                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-transparent to-transparent opacity-80"></div>
                

                <h2 className="absolute bottom-3 left-3 text-white font-bold text-lg tracking-wide drop-shadow-lg">
                    {project.title}
                </h2>
            </div>

            <div className="p-4">

                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {project.description}
                </p>

                <div className="mt-3">
                    <h3 className="font-semibold text-gray-700 text-sm mb-2">
                        Skills Required
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {project.skills?.slice(0, 3).map((skill, index) => (
                            <span 
                                key={index}
                                className="px-2.5 py-1 text-xs rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 
                                         text-indigo-700 font-medium border border-indigo-200/50 shadow-sm"
                            >
                                {skill}
                            </span>
                        ))}

                        {project.skills?.length > 3 && (
                            <span className="px-2.5 py-1 bg-gradient-to-r from-gray-100 to-gray-50 
                                            text-gray-600 text-xs rounded-full border border-gray-200 shadow-sm">
                                +{project.skills.length - 3} more
                            </span>
                        )}
                    </div>
                </div>


                {showJoinButton && (
                    <button
                        className={`
                            w-full mt-5 py-2.5 text-white font-semibold rounded-xl 
                            transition-all duration-300 shadow-md hover:shadow-lg
                            ${hasRequested 
                                ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed shadow-inner" 
                                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                            }
                        `}
                        onClick={(e) => {
                            e.stopPropagation();
                            onJoin();
                        }}
                        disabled={loading || hasRequested}
                    >
                        {loading ? "Sending..." : hasRequested ? "Request Sent ✓" : "Join Project"}
                    </button>
                )}

                {/* LEAVE BUTTON */}
                {isTeamMember && (
                    <button
                        className="w-full mt-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 
                                 hover:to-pink-700 text-white font-semibold rounded-xl transition-all 
                                 shadow-md hover:shadow-lg"
                        onClick={(e) => {
                            e.stopPropagation();
                            onLeave();
                        }}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Leave Project"}
                    </button>
                )}

            </div>
        </div>
    );
}

export default ProjectBox;
