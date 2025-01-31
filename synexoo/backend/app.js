require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const AuthRouter = require("../backend/routes/AuthRouter");
const path = require("path");
require("../backend/models/db");



const ProgressRouter = require("../backend/routes/ProgressRouter");
const AdminRouter = require("../backend/routes/adminRouter");
const dsaProgressRoutes = require("../backend/routes/onefiftydsa");
const weeklyseriesProgress= require("../backend/routes/weeklyseries")
const JobPostRouter = require("../backend/routes/companypost");
const port = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



const _dirname = path.resolve();





app.use("/auth", AuthRouter);
app.use("/api", ProgressRouter); 
app.use("/auth", AdminRouter);
app.use("/api", dsaProgressRoutes);
app.use("/api", weeklyseriesProgress);
app.use("/auth", JobPostRouter);


app.use(express.static(path.join(_dirname,"synexoo/frontend/dist")));
app.get("*", (req,res)=>{
  res.sendFile(
    path.resolve(_dirname, "synexoo/frontend", "dist", "index.html")
  );
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
