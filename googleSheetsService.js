// googleSheetsService.js

const {google} = require('googleapis');
const gal = require('google-auth-library');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/iam'];
const KEYFILEPATH = './credentials.json';

const auth = new gal.GoogleAuth({
    scopes: SCOPES,
    keyFile: KEYFILEPATH
  });
const sheets = google.sheets({version: 'v4', auth: auth});

async function generateAccessToken() {
    const auth = new gal.GoogleAuth({
      scopes: SCOPES,
      keyFile: KEYFILEPATH
    });
    const authToken = await auth.getClient();
    return authToken;
  }
//async function getAuthToken() {
  //  const auth = new google.auth.GoogleAuth({
    //  scopes: SCOPES
    //});
    //const authToken = await auth.getClient();
    //return authToken;
  //}

async function getSpreadSheet({spreadsheetId, token}) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    token,
  });
  return res;
}

async function getSpreadSheetValues({spreadsheetId, token, sheetName}) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    token,
    range: sheetName
  });
  return res;
}


module.exports = {
  generateAccessToken,
  getSpreadSheet,
  getSpreadSheetValues
}