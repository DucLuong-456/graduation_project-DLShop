import expres from "express";
const app = expres();
const PORT = process.env.PORT || 3000;

app.use("/", (req, res) => {
  res.json({ msg: "abc" });
});

app.listen(3000, () => {
  console.log(`app running on port: ${PORT}`);
});
