const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const https = require("https");
const cors = require("cors");
const fs= require("fs");
require("dotenv").config();
const options = {
  key: fs.readFileSync("./keys/domain.key"),
  cert: fs.readFileSync("./keys/domain.crt"),
  passphrase:process.env.PASSPHASE
};

const helmet = require("helmet");
const User = require("./model/User");
const Furniture = require("./model/Furniture");
const { stMonitor } = require('sematext-agent-express')
stMonitor.start()
const app = express();
app.use(cors({
  origin:"https://localhost",
}))
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
// app.use(cors())
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/orders", require("./routes/orders.routes"));
app.use("/api", require("./routes/contact.routes"));
app.use("/api", require("./routes/items.routes"));

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
Sentry.init({
  dsn: "https://c1dfda377fde449fab0e6346a3054db8@o4504332530876416.ingest.sentry.io/4504338508742656",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());


if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to Mongo");
    // app.listen(PORT, () =>
    //   console.log(`App has been started on port ${PORT}...`)
    // );
    https.createServer(options, app).listen(8080);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
  mongoose.connection.on('error', err => {
    logError(err);
  });
  // mongoose.connection.on('disconnected', err => {
  //   logError(err);
  // });

}

start();
