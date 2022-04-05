const {google} = require('googleapis');
const {BigQuery} = require('@google-cloud/bigquery');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/iam','https://www.googleapis.com/auth/bigquery.readonly'];
const KEYFILEPATH = './credentials.json';
const gal = require('google-auth-library');
const { generateAccessToken } = require('./googleSheetsService');
const auth = new gal.GoogleAuth({
    scopes: SCOPES,
    keyFile: KEYFILEPATH
  });
const sheets = google.sheets({version: 'v4', auth: auth});
const spreadsheetId = "14F6fmnBnuB9YtlFfWA9SVyebjyl7emnsovuUUQTktok";
const authClient = generateAccessToken;

async function main () {
  async function queryBigQuery() {
    // Queries a public Shakespeare dataset.

        // Create a client
        const bigqueryClient = new BigQuery();

        // The SQL query to run
        const sqlQuery = `SELECT (value, tag, timestamp) FROM \`nodejsprototype.topset.toptable\` WHERE tag.description = "FA-7401 LIPEÄSÄILIÖ" ORDER BY timestamp limit 1`;
        const sqlQuery2 = `SELECT (value, tag, timestamp) FROM \`nodejsprototype.topset.toptable\` WHERE tag.description = "FA-7403 LIPEÄSÄILIÖ" ORDER BY timestamp limit 1`;
        const options = {
        query: sqlQuery
        };
        const options2 = {
          query: sqlQuery2
          };
        // Run the query
        const rows = await bigqueryClient.query(options);
        //const rows2 = await bigqueryClient.query(options2);
        
        const sheetUpdate = {
          spreadsheetId: spreadsheetId,
          auth: auth,
          valueInputOption: "RAW",
          range: 'nodejsprotosheet!A2:B2',   
          resource: { 
              values: [
              [rows[0][0].f0_._field_1, rows[0][0].f0_._field_2.description]
          ]},
         
          };
  
    try {
      const response = (await sheets.spreadsheets.values.update(sheetUpdate, spreadsheetId)).data;
      console.log(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(err);
    }
    }

  queryBigQuery();
  
  
}

main();

