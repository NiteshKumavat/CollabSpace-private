import Profile from "../models/Profile.js";
import cloudinary from "../lib/cloudinary.js";


export const getAllUsers = async (req, res) => {
  try {
    const viewerId = req.user._id;

    const profiles = await Profile.find({
      user: { $ne: viewerId },
      blockList: { $nin: [viewerId] }
    })
      .sort({ isAvailableForCollab: -1 });

    if (!profiles.length) return res.status(404).json({ message: "No profiles found" });

    res.status(200).json({ profiles });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getProfile = async (req, res) => {
  try {
    const ownerId = req.params.Id;
    const viewerId = req.user._id;

    const ownerProfile = await Profile.findOne({ user: ownerId });


    if (!ownerProfile) return res.status(404).json({ message: "Profile Not Found" });

    const isBlocked = ownerProfile.blockList.includes(viewerId.toString());
    if (isBlocked) return res.status(403).json({ message: "You are blocked by this user" });

    return res.status(200).json({ profile: ownerProfile });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const updateProfile = async (req, res) => {
  
  try {
    const userId = req.user._id;
    const updates = req.body;


    if (updates?.profilePicture) {
      const upload = await cloudinary.uploader.upload(updates.profilePicture);
      updates.profilePicture = upload.secure_url;
    }

    const updated = await Profile.findOneAndUpdate(
      { user: userId },
      updates,
      { new: true }
    );

    console.log(updated);
    res.status(200).json(updated);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const blockUser = async (req, res) => {
  try {
    const blockerId = req.user._id;
    const blockedId = req.params.userId;

    await Profile.findOneAndUpdate(
      { user: blockerId },
      { $addToSet: { blockList: blockedId } }
    );

    res.json({ message: "User blocked successfully." });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const unblockUser = async (req, res) => {
  try {
    const blockerId = req.user._id;
    const blockedId = req.params.userId;

    await Profile.findOneAndUpdate(
      { user: blockerId },
      { $pull: { blockList: blockedId } }
    );

    res.json({ message: "User unblocked successfully." });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const availability = async (req, res) => {
  try {
    const { available } = req.body;
    const userId = req.user._id;

    const updated = await Profile.findOneAndUpdate(
      { user: userId },
      { isAvailableForCollab: available },
      { new: true }
    );

    res.status(200).json({
      isAvailableForCollab: updated.isAvailableForCollab,
      profile: updated
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const deleted = await Profile.findOneAndDelete({ user: userId });

    if (!deleted) return res.status(400).json({ message: "Profile deletion failed" });

    res.status(200).json({ message: "Profile deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
