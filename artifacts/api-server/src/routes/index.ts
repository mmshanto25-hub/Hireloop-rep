import { Router, type IRouter } from "express";
import healthRouter from "./health";
import jobsRouter from "./jobs";
import companiesRouter from "./companies";
import dashboardsRouter from "./dashboards";

const router: IRouter = Router();

router.use(healthRouter);
router.use(jobsRouter);
router.use(companiesRouter);
router.use(dashboardsRouter);

export default router;
