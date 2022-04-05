const {google} = require('googleapis');
const {BigQuery} = require('@google-cloud/bigquery');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/iam','https://www.googleapis.com/auth/bigquery.readonly'];
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
  async function queryBigQuery() {
    // Queries a public Shakespeare dataset.

        // Create a client
        const bigqueryClient = new BigQuery();

        // The SQL query to run
        const sqlQuery = `SELECT tag.description FROM \`nodejsprototype.topset.toptable\` WHERE tag.description = "FA-7403 LIPEÄSÄILIÖ"`;

        const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        //location: 'US',
        //params: {corpus: 'romeoandjuliet', min_word_count: 250},
        };

        // Run the query
        const [rows] = await bigqueryClient.query(options);

        console.log('Rows:');
        rows.forEach(row => console.log(row));
    }

  queryBigQuery();
  
  const bigqUpdate = {
    spreadsheetId: spreadsheetId,
    auth: authClient,
    
    resource : {
      requests: [{
      "addDataSource":{
      "dataSource":{
         "spec":{
            "bigQuery":{
               "projectId":"nodejsprototype",
               "tableSpec":{
                  "tableProjectId":"nodejsprototype",
                  "datasetId":"topset",
                  "tableId":"toptable"
               }
            }
         }
      }
    } }]
  }
  };

  const sheetUpdate = {
        spreadsheetId: spreadsheetId,
        auth: authClient,
        valueInputOption: "RAW",
        range: 'nodejsprotosheet!A2:B2',   
        resource: { 
            values: [
            ["Item", "Wheel"]
        ]},
       
        };

  //try {
  //  const response = (await sheets.spreadsheets.values.update(sheetUpdate, spreadsheetId)).data;
  //  console.log(JSON.stringify(response, null, 2));
 // } catch (err) {
  //  console.error(err);
 // }
}

main();

