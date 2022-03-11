import { Router } from 'express'
<<<<<<< HEAD
import authRouter from "../../module/Auth/routes/auth.route";
import teamRouter from "../../module/Team/routes/team.route";

const route = (app: Router) => {
    app.use('/api', authRouter);
    app.use('/api/team', teamRouter);
=======
import authRouter from "../../module/Auth/routes/auth.route"
import leageRouter from "../../module/League/routes/league.route"

const route = (app: Router) => {
    app.use('/api', authRouter);
    app.use('/api/league', leageRouter)
>>>>>>> 340335bbe2895b695b1e8289db604a0d5f101861
}

export default route;