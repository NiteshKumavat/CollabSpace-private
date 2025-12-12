import React from 'react';
import { Toaster } from "react-hot-toast";
import { useProjectStore } from '../store/useProjectStore.js';
import { useAuthStore } from '../store/useAuthStore.js';

function ProjectBox({ onStart, project, isOwner }) { // Added isOwner prop
    const { requestToJoin, loading } = useProjectStore();
    const { authUser } = useAuthStore();
    

    const hasRequested = project.requests?.some(req => req.userId === authUser?._id);
    

    const isTeamMember = project.team?.some(member => member._id === authUser?._id);
    

    const showJoinButton = !isOwner && !isTeamMember && !hasRequested && authUser?._id;

    const onJoin = () => {
        requestToJoin(project._id);
    };

    return (
        <div className="w-[250px] bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={onStart}>
            <Toaster />
            {/* Use project image if available, otherwise use default */}
            <img 
                src={project.image || "/default-project-image.png"}
                alt={project.title || "project"}
                className="w-full h-40 object-cover"
            />

            <div className="p-4">
                <h2 className="text-xl font-bold text-black">{project.title}</h2>

                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {project.description}
                </p>

                <div className="mt-3">
                    <h3 className="font-semibold text-gray-700 text-sm">Skills Required:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.skills?.slice(0, 3).map((skill, index) => (
                            <span 
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md" 
                                key={index}
                            >
                                {skill}
                            </span>
                        ))}
                        {project.skills?.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                +{project.skills.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Show join button only if conditions are met */}
                {showJoinButton && (
                    <button
                        className={`w-full mt-5 py-2 text-white font-semibold rounded-lg transition 
                            ${hasRequested 
                                ? "bg-gray-500 cursor-not-allowed" 
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the card click
                            onJoin();
                        }}
                        disabled={loading || hasRequested}
                    >
                        {loading
                            ? "Sending..."
                            : hasRequested
                            ? "Request Sent"
                            : "Join Project"}
                    </button>
                )}

                {/* Show status for team members */}
                {isTeamMember && (
                    <div className="w-full mt-5 py-2 bg-green-100 text-green-700 font-semibold rounded-lg text-center">
                        Team Member
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectBox;