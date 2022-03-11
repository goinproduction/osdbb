import { Router } from 'express'
import authRouter from "../../module/Auth/routes/auth.route";
import teamRouter from "../../module/Team/routes/team.route";

const route = (app: Router) => {
    app.use('/api', authRouter);
    app.use('/api/team', teamRouter);
}

export default route;