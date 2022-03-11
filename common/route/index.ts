import { Router } from 'express'
import authRouter from "../../module/Auth/routes/auth.route";
const route = (app: Router) => {
    app.use('/api', authRouter);
}

export default route;