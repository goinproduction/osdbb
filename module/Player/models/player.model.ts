import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    player_name: { type: String, require },
    player_number: { type: Number, require },
    player_avatar: { type: String, default: 'https://image.thanhnien.vn/w1024/Uploaded/2022/oqivotiw/2021_11_22/pedri-barcelona-4860.jpeg' },
    player_position: { type: String, require },
})

const Players = mongoose.model('Players', playerSchema);

export default Players;