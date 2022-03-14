import { Router } from 'express'
import authRouter from "../../module/Auth/routes/auth.route"
import teamRouter from "../../module/Team/routes/team.route"
import leageRouter from "../../module/League/routes/league.route"
import playerRouter from "../../module/Player/routes/player.route"

const route = (app: Router) => {
    app.use('/api', authRouter);
    app.use('/api/team', teamRouter);
    app.use('/api/league', leageRouter)
    app.use('/api/player', playerRouter)
}

export default route;