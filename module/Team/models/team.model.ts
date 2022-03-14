import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    team_name: { type: String, require },
    logo: { type: String, default: 'https://www.kindpng.com/picc/m/113-1130604_fc-barcelona-png-logo-barcelona-logo-png-transparent.png' },
    player_list: { type: Array }
})

const Teams = mongoose.model('Teams', teamSchema);

export default Teams;