import mongoose from "mongoose";

const DB_URL = `mongodb+srv://betbb:${process.env.DB_PASSWORD}@cluster0.vi88l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const Connect = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('Database connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default Connect;