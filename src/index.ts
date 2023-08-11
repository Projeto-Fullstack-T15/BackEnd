import app from "./app"
import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    app.listen(process.env.APP_PORT || 8000, () => {
        console.log("Server listening on port:", process.env.APP_PORT || 8000)
    });

}).catch((err) => {
    console.error(err);
});
