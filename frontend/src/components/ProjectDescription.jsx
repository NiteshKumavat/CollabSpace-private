import { useState, useEffect } from "react";
import { X, Plus, Image as ImageIcon, Users, Trash2 } from "lucide-react";
import { useProjectStore } from "../store/useProjectStore.js";


const ProjectDescription = ({ onClose, project, mode, userRole, setMode }) => {
  const { createProject, updateProject, deleteProject } = useProjectStore();




  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");


  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: [],
    team: [],
    image: ""
  });

  // Initialize form when project changes
  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        skills: project.skills || [],
        team: project.team || [],
        image: project.image || ""
      });
      setImagePreview(project.image || "");
    }
  }, [project]);

  const isCreate = mode === "create";
  const isEdit = mode === "edit";
  const isView = mode === "view";

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;

    if (!form.skills.includes(skillInput.trim())) {
      setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
    }
    setSkillInput("");
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSkillRemove = (index) => {
    setForm({ ...form, skills: form.skills.filter((_, i) => i !== index) });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For now, just set a preview URL
      // In a real app, you would upload to a server
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      alert("Please enter a project title");
      return;
    }
    if (!form.description.trim()) {
      alert("Please enter a project description");
      return;
    }

    setLoading(true);
    try {
      if (isCreate) {
        console.log(form)
        const res = await createProject(form);
        if (res.success) {
          console.log(res)
          onClose();
        }
      } else if (isEdit) {
        console.log(form)
        const res = await updateProject(project._id, form);
        if (res.success) {
          onClose();
        }
      }
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      
      return;
    }

    setLoading(true);
    try {
      const res = await deleteProject(project._id);
      if (res.success) {
        onClose();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#5f75ff] to-[#582b84] rounded-2xl shadow-2xl text-white p-6 relative">

        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 p-2 rounded-full transition z-10"
          disabled={loading}
        >
          <X size={20} />
        </button>

        {/* TITLE & IMAGE */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow overflow-hidden bg-gray-200">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Project" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={40} className="text-gray-400" />
                </div>
              )}
            </div>
            
            {(isCreate || isEdit) && (
              <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 rounded-full p-2 cursor-pointer">
                <ImageIcon size={16} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </label>
            )}
          </div>

          {isView ? (
            <h1 className="text-2xl font-bold">{form.title}</h1>
          ) : (
            <input
              className="bg-white/20 p-3 rounded w-full outline-none placeholder-gray-300"
              placeholder="Project Title *"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              disabled={loading}
            />
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6 border-t border-white/20 pt-4">
          <h2 className="text-xl font-semibold">Description</h2>
          {isView ? (
            <p className="text-sm text-gray-200 mt-2 leading-relaxed whitespace-pre-wrap">
              {form.description}
            </p>
          ) : (
            <textarea
              className="bg-white/20 w-full p-3 rounded mt-2 outline-none placeholder-gray-300 min-h-[100px]"
              placeholder="Describe your project... *"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              disabled={loading}
            />
          )}
        </div>

        {/* SKILLS */}
        <div className="mt-6 border-t border-white/20 pt-4">
          <h2 className="text-xl font-semibold">Skills Required</h2>
          
          <div className="flex gap-3 mt-3 flex-wrap">
            {form.skills.map((skill, i) => (
              <span 
                key={i} 
                className="px-3 py-1 bg-white/20 rounded-full text-sm flex gap-2 items-center"
              >
                {skill}
                {!isView && (
                  <button 
                    onClick={() => handleSkillRemove(i)} 
                    className="text-red-300 hover:text-red-400"
                    disabled={loading}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}

            {(isCreate || isEdit) && (
              <div className="flex gap-2 items-center">
                <input
                  className="bg-white/25 p-2 rounded outline-none placeholder-gray-300"
                  placeholder="Add skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleSkillKeyPress}
                  disabled={loading}
                />
                <button 
                  onClick={handleAddSkill} 
                  className="w-9 h-9 bg-white/25 rounded-full flex items-center justify-center hover:bg-white/40 transition"
                  disabled={loading}
                >
                  <Plus size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* TEAM MEMBERS - Optional Section */}
        {form.team?.length > 0 && (
          <div className="mt-6 border-t border-white/20 pt-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users size={20} />
              Team Members
            </h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {form.team.map((member, i) => (
                <div 
                  key={i} 
                  className="px-3 py-1 bg-white/20 rounded-full text-sm flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <span>{member.name || `Member ${i + 1}`}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUTTONS */}
        <div className="border-t border-white/20 mt-8 pt-6 flex justify-center gap-4">
          {(isCreate || isEdit) && (
            <button 
              onClick={handleSubmit} 
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full shadow disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !form.title.trim() || !form.description.trim()}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isCreate ? "Creating..." : "Saving..."}
                </span>
              ) : (
                isCreate ? "Create Project" : "Save Changes"
              )}
            </button>
          )}

          {isView && userRole === "admin" && (
            <>
              <button 
                onClick={() => setMode("edit")}
                className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-full shadow flex items-center gap-2"
                disabled={loading}
              >
                Edit
              </button>

              <button 
                onClick={handleDelete} 
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full shadow flex items-center gap-2"
                disabled={loading}
              >
                <Trash2 size={18} />
                Delete
              </button>
            </>
          )}

          {isEdit && (
            <button 
              onClick={() => setMode("view")}
              className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-full shadow"
              disabled={loading}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;