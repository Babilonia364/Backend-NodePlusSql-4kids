module.exports = app => {
  app.get("/services", (req, res) => { res.send("Get test") });

  app.post("/services", (req, res) => {
    console.log("body: ", req.body);
    res.send("Post test");
  });
};