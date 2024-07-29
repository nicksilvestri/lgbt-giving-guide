// create an express app
const express = require("express")
const axios = require("axios");
const app = express()

// use the express-static middleware
app.use(express.static("public"))

// // define the first route
// app.get("/", function (req, res) {
//   res.send("<h1>Hello World!</h1>")
// })




app.get("/oauth", async function (req, res) {
    try {
        const response = await axios.post("https://accounts.google.com/o/oauth2/v2/auth", {
            // request body data
            // ...
        });

        // handle the response
        const oauthToken = response.data.oauthToken;
        res.send(`OAuth token generated successfully: ${oauthToken}`);
    } catch (error) {
        // handle the error
        // ...
        res.status(500).send("Error generating OAuth token");
    }
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));