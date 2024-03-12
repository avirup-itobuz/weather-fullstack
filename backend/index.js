import express from "express";
import weatherData from "./data.js";
import cors from "cors";
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/api/getData/:location", (req, res) => {
  const searchParam = req.params.location;
  let data = 0;
  weatherData.forEach((loc) => {
    if (loc.name.toLowerCase() === searchParam.toLowerCase()) {
      data = loc;
      return;
    }
  });
  if (data) {
    console.log(data);
    res.json({ data: data, status: 200, message: "success" });
  } else {
    res.json({ data: "null", status: 404, message: "data not found" });
  }
});
app.post("/api/writeData", (req, res) => {
  weatherData.push(req.body);
  console.log(weatherData);
  res.end();
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
