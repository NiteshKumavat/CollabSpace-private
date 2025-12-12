export default function ProfileActions({ isOwner, profileId }) {
    return (
        <div className="flex justify-center mt-6">

            {isOwner ? (
                <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
                    Delete Profile
                </button>
            ) : (
                <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
                    Block User
                </button>
            )}

        </div>
    );
}
