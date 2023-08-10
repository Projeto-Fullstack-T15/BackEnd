import app from "./app";
import { AppDataSource } from "./data-source";

const PORT: number = Number(process.env.APP_PORT) || 8000;

async function initialize() {
  await AppDataSource.initialize()
    .then(() => {
      console.log(new Date().toLocaleString(), ": Database connected.");
    })
    .catch((err) => {
      console.error(err);
      console.log(
        new Date().toLocaleString(),
        ": Failed to connect with database."
      );
    });

  app.listen(PORT, () => {
    console.log(
      new Date().toLocaleString(),
      ": Server listening on port ",
      PORT
    );
  });
}

initialize();
