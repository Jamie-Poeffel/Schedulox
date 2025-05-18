import express from "express"
import handlerRouter from "./routes/handler";

const app = express();
const PORT = process.env.PORT || 3000

app.use(handlerRouter);

app.listen(PORT, () => {
    console.log("http://localhost:3000");
})