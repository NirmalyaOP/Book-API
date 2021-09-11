const express = require("express")

const OurApp = express();

OurApp.get("/", (req, res) => {
    res.json({message: "Request Served!!!"})
})

OurApp.listen(4000, () => console.log("Server is running"))