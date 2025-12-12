export default function ProfileLinks({ info, editMode, updateLink }) {
  return (
    <div className="mt-6">
      <p className="font-semibold text-lg">Website Links</p>

      <div className="bg-white/20 mt-3 p-4 rounded-xl space-y-4">
        {["LinkedIn", "GitHub", "Portfolio"].map((label) => {
          const key = label.toLowerCase();

          return (
            <div key={label}>
              <label className="text-sm text-gray-200">{label}</label>

              {editMode ? (
                <input
                  className="w-full mt-2 bg-white/10 p-2 rounded-lg text-white"
                  value={info?.links?.[key] || ""}
                  placeholder={`https://${key}.com/username`}
                  onChange={(e) => updateLink(key, e.target.value)}
                />
              ) : (
                <a
                  href={info?.links?.[key] || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block bg-white/10 p-2 rounded-lg hover:bg-white/20"
                >
                  {info?.links?.[key] || "Not added"}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

