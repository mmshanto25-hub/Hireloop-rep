import { Router, type IRouter } from "express";
import {
  GetJobParams,
  GetJobResponse,
  ListJobsQueryParams,
  ListJobsResponse,
} from "@workspace/api-zod";
import { jobs } from "../lib/demo-data";

const router: IRouter = Router();

router.get("/jobs", (req, res) => {
  const query = ListJobsQueryParams.parse(req.query);
  const search = query.search?.toLowerCase();
  const filtered = jobs.filter((job) => {
    if (search && !`${job.title} ${job.company} ${job.category}`.toLowerCase().includes(search)) return false;
    if (query.location && !job.location.toLowerCase().includes(query.location.toLowerCase())) return false;
    if (query.category && job.category.toLowerCase() !== query.category.toLowerCase()) return false;
    if (query.type && job.type.toLowerCase() !== query.type.toLowerCase()) return false;
    if (query.featured !== undefined && job.featured !== query.featured) return false;
    return true;
  });
  res.json(ListJobsResponse.parse(filtered));
});

router.get("/jobs/:jobId", (req, res) => {
  const { jobId } = GetJobParams.parse(req.params);
  const job = jobs.find((item) => item.id === jobId);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json(GetJobResponse.parse(job));
});

export default router;