import { Router, type IRouter } from "express";
import {
  ListCompaniesQueryParams,
  ListCompaniesResponse,
} from "@workspace/api-zod";
import { companies } from "../lib/demo-data";

const router: IRouter = Router();

router.get("/companies", (req, res) => {
  const { industry } = ListCompaniesQueryParams.parse(req.query);
  const filtered = industry
    ? companies.filter((company) => company.industry.toLowerCase() === industry.toLowerCase())
    : companies;
  res.json(ListCompaniesResponse.parse(filtered));
});

export default router;