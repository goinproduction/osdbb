import { Router } from 'express'
import authRouter from "../../module/Auth/routes/auth.route"
import leageRouter from "../../module/League/routes/league.route"

const route = (app: Router) => {
    app.use('/api', authRouter);
    app.use('/api/league', leageRouter)
}

export default route;