import  express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { router as usersRouter } from "./routes/users.route";

config()

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
}

const app = express();

app.use('/users', usersRouter)

app.listen(3000, () => {
    console.log('Server running on port 3000');
})