// BEFORE RUNNING:
// ---------------
// 1. If not already done, enable the Google Sheets API
//    and check the quota for your project at
//    https://console.developers.google.com/apis/api/sheets
// 2. Install the Node.js client library by running
//    `npm install googleapis --save`
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/iam'];
const KEYFILEPATH = './credentials.json';
const gal = require('google-auth-library');
const auth = new gal.GoogleAuth({
    scopes: SCOPES,
    keyFile: KEYFILEPATH
  });
const sheets = google.sheets({version: 'v4', auth: auth});

const {
    generateAccessToken,
    getSpreadSheet,
    //getSpreadSheetValues
  } = require('./googleSheetsService.js');


async function main () {
  const authClient = await generateAccessToken();
  //const sheet = getSpreadSheet({spreadsheetId, authClient})
  const spreadsheetId = "14F6fmnBnuB9YtlFfWA9SVyebjyl7emnsovuUUQTktok";

  const sheetUpdate = {
        spreadsheetId: spreadsheetId,
        auth: authClient,
        valueInputOption: "RAW",
        range: 'nodejsprotosheet!A2:A3',

        resource: { 
            values: [
            ["Item"],
            ["Wheel"]
        ]},
       
        };
   
  try {
    const response = (await sheets.spreadsheets.values.update(sheetUpdate, spreadsheetId)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}

main();

