export default function ProfileInfo({ editMode, updateField, info}) {
  return (
    <div className="mt-8">
      
      {/* Bio */}
      <p className="font-semibold text-lg">Bio</p>

      {editMode ? (
        <textarea
          className="w-full bg-white/20 p-3 rounded-lg text-white outline-none border border-white/10"
          value={info.bio}
          onChange={(e) => updateField("bio", e.target.value)}
        />
      ) : (
        <div className="bg-white/20 p-3 rounded-lg">
          {info.bio || "No bio added"}
        </div>
      )}

      {/* Skills */}
      <div className="mt-6">
        <p className="font-semibold text-lg">Skills</p>

        {editMode ? (
          <input
            type="text"
            placeholder="e.g. React, Node.js, MongoDB"
            className="w-full bg-white/20 p-3 rounded-lg text-white outline-none border border-white/10"
            value={info.skills.join(", ")}
            onChange={(e) =>
              updateField(
                "skills",
                e.target.value.split(",").map(s => s.trim())
              )
            }
          />
        ) : (
          <div className="flex gap-3 flex-wrap mt-2">
            {info.skills.length > 0 ? (
              info.skills.map((skill, i) => (
                <span key={i} className="bg-white/10 px-3 py-1 rounded-lg">
                  {skill}
                </span>
              ))
            ) : (
              "No skills added"
            )}
          </div>
        )}
      </div>

      {/* Email (Always Read Only) */}
      <div className="mt-6">
        <p className="font-semibold text-lg">Email</p>
        <div className="bg-white/20 p-3 rounded-lg opacity-70 cursor-not-allowed">
          {info.email}
        </div>
      </div>
    </div>
  );
}
