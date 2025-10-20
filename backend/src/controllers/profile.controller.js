import Profile from '../models/Profile.js';

export const createProfile = async (req, res) => {
    console.log("Hello from createProfile");
    const {
        fullName,
        bio,
        location,
        skills,
        experienceLevel,
        rolePreference,
        lookingForTeam,
        availableForCollab,
        github,
        linkedin,
        portfolio,
        personalWebsite
    } = req.body;

    try {
        const profile = new Profile({
            user: req.user.id,
            fullName : req.user.fullName,
            bio,
            location,
            skills,
            experienceLevel,
            rolePreference,
            lookingForTeam,
            availableForCollab,
            github,
            linkedin,
            portfolio,
            personalWebsite
        });

        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['username', 'email']);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProfile = async (req, res) => {
    const {
        fullName,
        bio,
        location,
        skills,
        experienceLevel,
        rolePreference,
        lookingForTeam,
        availableForCollab,
        github,
        linkedin,
        portfolio,
        personalWebsite
    } = req.body;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.fullName = fullName || profile.fullName;
        profile.bio = bio || profile.bio;
        profile.location = location || profile.location;
        profile.skills = skills || profile.skills;
        profile.experienceLevel = experienceLevel || profile.experienceLevel;
        profile.rolePreference = rolePreference || profile.rolePreference;
        profile.lookingForTeam = lookingForTeam !== undefined ? lookingForTeam : profile.lookingForTeam;
        profile.availableForCollab = availableForCollab !== undefined ? availableForCollab : profile.availableForCollab;
        profile.github = github || profile.github;
        profile.linkedin = linkedin || profile.linkedin;
        profile.portfolio = portfolio || profile.portfolio;
        profile.personalWebsite = personalWebsite || profile.personalWebsite;

        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const updateProfilePicture = async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        };
        profile.profilePicture = req.body.profilePicture || profile.profilePicture;
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}