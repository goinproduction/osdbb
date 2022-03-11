import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const betSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth'
    },
    match: {
        type: mongoose.Types.ObjectId,
        ref: 'Match'
    },
    team_bet: {
        type: mongoose.Types.ObjectId
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const Bet = mongoose.model('Bet', betSchema);

export default Bet;
