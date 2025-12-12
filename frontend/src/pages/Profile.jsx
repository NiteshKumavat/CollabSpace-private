import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import ProfileHeader from "../components/ProfileHeader";
import ProfileInfo from "../components/ProfileInfo";
import ProfileLinks from "../components/ProfileLinks";
import ProfileProjects from "../components/ProfileProjects";
import ProfileRequests from "../components/ProfileRequests";
import ProfileActions from "../components/ProfileActions";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileStore } from "../store/useProfileStore";
import { useProjectStore } from "../store/useProjectStore";
import { Toaster } from "react-hot-toast";
import ProjectDescription from "../components/ProjectDescription.jsx";

export default function Profile() {
    const { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [selectedImage, setSelectedImage] = useState(null); 
    const [showCreateProject, setShowCreateProject] = useState(false); 

    const { authUser } = useAuthStore();
    const { profile, fetchProfile, updateProfile } = useProfileStore();
    // eslint-disable-next-line no-unused-vars
    const { fetchUserProjects, userProjects, createProject } = useProjectStore(); 

    const isOwner = authUser?._id === id;



    // ---------- LOCAL STATE ----------
    const [info, setInfo] = useState({
        fullName: "",
        userName: "",
        email: "",
        bio: "",
        skills: [],
        links: { linkedin: "", github: "", portfolio: "" },
        profilePicture: "",
        isAvailableForCollab: true,
        blockList: []
    });

    // ---------- FETCH PROFILE ----------
    useEffect(() => {
        fetchProfile(id);
        fetchUserProjects(id);
    }, [id, fetchProfile, fetchUserProjects]);

    useEffect(() => {
        if (profile?._id) {
            setInfo({
                fullName: profile.fullName || "",
                userName: profile.userName || "",
                email: profile.email || "",
                bio: profile.bio || "",
                skills: profile.skills || [],
                links: {
                    linkedin: profile.websites?.find(w => w.websiteName === "LinkedIn")?.websiteLink || "",
                    github: profile.websites?.find(w => w.websiteName === "GitHub")?.websiteLink || "",
                    portfolio: profile.websites?.find(w => w.websiteName === "Portfolio")?.websiteLink || ""
                },
                profilePicture: profile.profilePicture || "",
                isAvailableForCollab: profile.isAvailableForCollab ?? true,
                blockList: profile.blockList || []
            });
        }
    }, [profile]);

    // ---------- FIELD UPDATERS ----------
    const updateField = (field, value) => {
        setInfo(prev => ({ ...prev, [field]: value }));
    };

    const updateLink = (name, value) => {
        setInfo(prev => ({
            ...prev,
            links: { ...prev.links, [name]: value }
        }));
    };

    // ---------- SAVE CHANGES ----------
    const saveChanges = async () => {
        await updateProfile(info);
        setEditMode(false);
    };

    // ---------- HANDLE PROJECT CREATION ----------
    const handleCreateProject = () => {
        setShowCreateProject(true);
    };

    return (
        <div className="w-full">
            <Toaster />
            <Header />

            <div className="w-[80%] mx-auto mt-10 px-4">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl">

                    {/* HEADER */}
                    <ProfileHeader
                        info={info}
                        setInfo={setInfo}
                        isOwner={isOwner}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        saveChanges={saveChanges}
                        setSelectedImage={setSelectedImage}
                    />

                    <ProfileInfo
                        editMode={editMode}
                        info={info}
                        updateField={updateField}
                    />

                    <ProfileLinks
                        editMode={editMode}
                        info={info}
                        updateLink={updateLink}
                    />

                    {/* Fixed: Pass projects data and onCreate handler */}
                    {isOwner && (
                        <ProfileProjects 
                            projects={userProjects} 
                            isOwner={isOwner} 
                            onCreate={handleCreateProject}
                        />
                    )}

                    {isOwner && <ProfileRequests id={id}/>}

                    <ProfileActions isOwner={isOwner} profileId={id} />
                </div>
            </div>


            {showCreateProject && (
                <ProjectDescription
                    mode="create"
                    project={{}}
                    onClose={() => setShowCreateProject(false)}
                    userRole={isOwner ? "admin" : "viewer"}
                    setMode={() => {}} // Empty function for create mode
                />
            )}
        </div>
    );
}