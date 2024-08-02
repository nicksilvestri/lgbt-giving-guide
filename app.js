require('dotenv').config()

// create an express app
const express = require("express")
const path = require('path');
const { google } = require('googleapis');
const app = express()

// use the express-static middleware
app.use(express.static(__dirname + '/dist/lgbt-giving-guide/browser'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname)));

const googleAuth = google.auth.fromAPIKey(process.env.GOOGLE_API_KEY);
const googleSheetId = process.env.GOOGLE_SHEET_ID;
const googleSheetPage = 'Sheet1';

app.get("/getGays", async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    try {

        const sheetInstance = await google.sheets({ version: 'v4', auth: googleAuth});

        // read data in the range in a sheet
        const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
            auth: googleAuth,
            spreadsheetId: googleSheetId,
            range: `${googleSheetPage}!A2:AO100`
        });
        
        const valuesFromSheet = infoObjectFromSheet.data.values;
        // return the values
        res.json({data: valuesFromSheet});
      }
      catch(err) {
        console.log("readSheet func() error", err);  
        res.status(500).json({ error: "Error reading sheet" });
      }
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));