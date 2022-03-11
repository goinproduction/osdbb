import express from 'express'
import LeagueController from "../controllers/league.controller"

const leagueRouter = express.Router()
const leagueController = new LeagueController()

leagueRouter.get('/', leagueController.handleGetAllLeagues)
leagueRouter.post('/', leagueController.handleAddLeague)
leagueRouter.post('/:id/addteam', leagueController.handleAddTeamToLeague)
leagueRouter.delete('/:id', leagueController.handleDeleteLeague)

export default leagueRouter