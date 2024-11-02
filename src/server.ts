import createApp from "./app";
import handleMongoConnection from "./db";

const app = createApp();

handleMongoConnection();

// START SERVER
app.listen(3000, () => {
  console.log("Server listening to port 3000.");
});
