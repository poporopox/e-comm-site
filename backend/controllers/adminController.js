// Assuming you're using Express.js
import express from "express";
import userModel from "./userModel";

const router = express.Router();

router.post("/admin", async (req, res) => {
    const { token } = req.body;
    try {
        // Find the user by token and update the adminActions field
        const user = await userModel.findOneAndUpdate(
            { token: token },
            { $push: { adminActions: token } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Admin action recorded" });
    } catch (error) {
        console.error("Error recording admin action:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
