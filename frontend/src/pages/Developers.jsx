import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import UserInfo from '../components/UserInfo.jsx';
import { useProfileStore } from '../store/useProfileStore.js';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Developers() {

    const navigate = useNavigate();

    const [text, setText] = useState("");

    const { allusers, getUsers } = useProfileStore();

    const texthandler = (event) => {
        setText(event.target.value);
        console.log(allusers)
    };


    useEffect(() => {
        getUsers();

    }, [getUsers]);

    const filteredUsers = allusers?.filter((user) =>
        user.fullName?.toLowerCase().includes(text.toLowerCase()) ||
        user.userName?.toLowerCase().includes(text.toLowerCase())
    );

    return (
        <div>

            <Toaster />
            <Header />

            <div className="w-[90%] mx-auto mt-10 px-4">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[100%]">
                    <div>
                        <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        value={text}
                        onChange={texthandler}
                        />
                    </div>

                    <div className="mt-5">
                        {filteredUsers?.length > 0 ? (
                        filteredUsers.map((user) => (
                            
                            <UserInfo key={user._id} user={user} click={() => navigate(`/profile/${user.user}`)}/>
                        ))
                        ) : (
                        <p className="text-gray-400 text-center">No users found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Developers;
