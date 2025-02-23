import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import { binTask, createSubTask, createTask, dashboardStatistics, deleteRestoreTask, duplicateTask, getTask, getTasks, postTaskActivities, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivities);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
router.put("/:id", protectRoute, isAdminRoute, binTask);

router.delete("/delete-restore/:id?", protectRoute, isAdminRoute, deleteRestoreTask);

export default router;