import app from "./app";
import { AppDataSource } from "./data-source";
import { logWithDate } from "./utils/logWithDate.util";


const PORT: number = Number(process.env.APP_PORT) || 8000;

async function initialize() {
    await AppDataSource.initialize()
        .then(() => {
            logWithDate("Database connected")
        }).catch((err) => {
            console.error(err);
            logWithDate("Failed to connect with database")
        });

    app.listen(PORT, () => {
        logWithDate("Server is running on PORT " + PORT)
    });
}

initialize();