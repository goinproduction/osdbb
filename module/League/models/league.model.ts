import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    lg_name: {
        type: String
    },
    lg_teams: {
        type: [{
            type: String,
            ref: 'Team'
        }]
    }
})

const League = mongoose.model('League', leagueSchema);

export default League;