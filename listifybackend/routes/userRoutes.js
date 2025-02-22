import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import { getTeamList, loginUser, logoutUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectRoute, getNotifications);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/cahnge-password", protectRoute, changeUserPassword);

router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteuserProfile);

export default router;