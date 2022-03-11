import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    league: {
        type: mongoose.Types.ObjectId,
        ref: 'League'
    },
    teams: {
        type: [{
            team_one: {
                type: mongoose.Types.ObjectId,
                ref: 'Team'
            },
            team_two: {
                type: mongoose.Types.ObjectId,
                ref: 'Team'
            }
        }]
    },
    start_time: {
        type: Date
    },
    challenge: {
        type: [Number]
    },
    bet_ammount: {
        type: Number
    },
    status: {
        type: Boolean
    },
    total_bet_quantity: {
        type: Number
    },
    team_bet_quantity: {
        type: [Number]
    },
    score: {
        type: [Number]
    }
})

const Match = mongoose.model('Match', matchSchema);

export default Match;
