import { Router, type IRouter } from "express";
import {
  GetAdminDashboardResponse,
  GetPlatformStatsResponse,
  GetRecruiterDashboardResponse,
  GetSeekerDashboardResponse,
} from "@workspace/api-zod";
import {
  adminDashboard,
  platformStats,
  recruiterDashboard,
  seekerDashboard,
} from "../lib/demo-data";

const router: IRouter = Router();

router.get("/stats", (_req, res) => {
  res.json(GetPlatformStatsResponse.parse(platformStats));
});

router.get("/dashboard/seeker", (_req, res) => {
  res.json(GetSeekerDashboardResponse.parse(seekerDashboard));
});

router.get("/dashboard/recruiter", (_req, res) => {
  res.json(GetRecruiterDashboardResponse.parse(recruiterDashboard));
});

router.get("/dashboard/admin", (_req, res) => {
  res.json(GetAdminDashboardResponse.parse(adminDashboard));
});

export default router;