import {User} from "../models/user.model.js";
export const authCallback =async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;
        const user = await User.findOne({ clerkId: id });

        if (!user) {
            await User.create({
                clerkId: id,
                firstName: `${firstName} ${lastName}`,
                imageUrl

            })
        }
        res.status(200).send("user authenticated")
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
};
