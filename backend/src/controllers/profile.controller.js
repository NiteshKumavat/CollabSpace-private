import Profile from "../models/Profile.js";
import cloudinary from "../lib/cloudinary.js";
import Request from "../models/request.model.js";


export const getProfile = async (req, res) => {
    try {
        const ownerId = req.params.Id; 
        const viewerId = req.user._id; 


        const ownerProfile = await Profile.findOne({ user: ownerId });

        if (!ownerProfile) {
            return res.status(404).json({ message: "Profile Not Found" });
        }

        if (ownerId.toString() === viewerId.toString()) {
            return res.status(200).json({ profile: ownerProfile });
        }


        const isBlocked = ownerProfile.blockList?.some(
            user => user.toString() === viewerId.toString()
        );

        console.log(ownerProfile.blockList);
        console.log("isBlocked:", isBlocked);

        if (isBlocked) {
            return res.status(403).json({ message: "You are blocked by this user" });
        }

        const requests = null;
        if (ownerId.toString() !== viewerId.toString()) {
            requests = await Request.find({
                To: ownerId,
                status: "pending"
            });
        }


        return res.status(200).json({ profile: ownerProfile, Request : requests });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const Id = req.user._id;
        const updates = req.body;

        if(updates.profilePicture){
            const uploadResponse = await cloudinary.uploader.upload(updates.profilePicture);
            updates.profilePicture = uploadResponse.secure_url
        }

        const updateProfile = await Profile.findByIdAndUpdate(
            {user : Id}, updates, {new : true}
        );

        await updateProfile.save();

        return res.status(200).json(updateProfile)

        
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}


export const blockUser = async (req, res) => {
    try {
        const blockerId = req.user._id;
        const blockedId = req.params.userId;

        const blockedUser = await Profile.findOneAndUpdate(
            {
                user : blockerId
            },
            {
                $addToSet : { blockList : blockedId}
            }
        );

        await blockedUser.save();

        return res.json({ message: "User blocked successfully." });
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}

export const unblockUser = async (req, res) => {
    try {
        const blockerId = req.user._id;
        const blockedId = req.params.userId;

        const unblock = await Profile.findOneAndUpdate(
            {
                user : blockerId
            },
            {
                $pull : { blockList : blockedId}
            }
        );

        await unblock.save();
        return res.json({ message: "User Unblocked successfully." });
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}

export const availability = async (req, res) => {
    try {
        const {available} = req.body;
        const userId = req.user.id;

        const updateProfile = await Profile.findOneAndUpdate({user : userId}, {isAvailableForCollab : available}, {new : true});

        await updateProfile.save();
        return res.status(200).json(updateProfile);
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}