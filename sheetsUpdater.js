const {google} = require('googleapis');
const {BigQuery} = require('@google-cloud/bigquery');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/iam','https://www.googleapis.com/auth/bigquery.readonly'];
const KEYFILEPATH = './credentials.json';
const gal = require('google-auth-library');
const { generateAccessToken, getSpreadSheetValues } = require('./googleSheetsService');
const auth = new gal.GoogleAuth({
    scopes: SCOPES,
    keyFile: KEYFILEPATH
  });
const sheets = google.sheets({version: 'v4', auth: auth});
const spreadsheetId = "14F6fmnBnuB9YtlFfWA9SVyebjyl7emnsovuUUQTktok";
const authClient = generateAccessToken();

async function main () {
    // Queries a public Shakespeare dataset.

        // Create a client
        const bigqueryClient = new BigQuery();

        // The SQL query to run
        const sqlQuery = `SELECT (value, tag, timestamp) FROM \`nodejsprototype.topset.toptable\` WHERE tag.description = "FA-7401 LIPEÄSÄILIÖ" ORDER BY timestamp limit 1`;
        const sqlQuery2 = `SELECT (value, tag, timestamp) FROM \`nodejsprototype.topset.toptable\` WHERE tag.description = "FA-7403 LIPEÄSÄILIÖ" ORDER BY timestamp limit 1`;
        const options = {
        query: sqlQuery
        };
      
        // Run the query
        const rows = await bigqueryClient.query(options);
        //const rows2 = await bigqueryClient.query(options2);
        //console.log(rows[0][0].f0_._field_1);
        const sheetUpdate = {
          spreadsheetId: spreadsheetId,
          auth: auth,
          valueInputOption: "RAW",
          range: 'nodejsprotosheet!A2:B2',   
          resource: { 
              values: [
              [rows[0][0].f0_._field_2.description, rows[0][0].f0_._field_1]
          ]},
         
          };
  
      try {
        //const response = (await sheets.spreadsheets.values.update(sheetUpdate, spreadsheetId)).data;
        //console.log(JSON.stringify(response, null, 2));
      } catch (err) {
        //console.error(err);
      }

        const request = {
          auth: auth,
          // The spreadsheet to apply the updates to.
          spreadsheetId: spreadsheetId,  // TODO: Update placeholder value.
         
          resource: {
            // A list of updates to apply to the spreadsheet.
            // Requests will be applied in the order they are specified.
            // If any request is not valid, no requests will be applied.
            requests: [
                
                {
                  "addChart": {
                    "chart": {
                      "spec": {
                        "title": "Säiliön 1 täyttötilanne",
                        "basicChart": {
                          "chartType": "COLUMN",
                          "legendPosition": "BOTTOM_LEGEND",
                          "axis": [
                            {
                              "position": "BOTTOM_AXIS",
                              "title": "Lipeäsäiliö"
                            },
                            {
                              "position": "LEFT_AXIS",
                              "title": "Täyttöaste (tonneissa)"
                            }
                          ],
                          "domains": [
                            {
                              "domain": {
                                "sourceRange": {
                                  "sources": [
                                    {
                                      "sheetId": 0,
                                      "startRowIndex": 1,
                                      "endRowIndex": 2,
                                      "startColumnIndex": 0,
                                      "endColumnIndex": 2
                                    }
                                  ]
                                }
                              }
                            }
                          ],
                          "series": [
                            {
                              "series": {
                                "sourceRange": {
                                  "sources": [
                                    {
                                      "sheetId": 0,
                                      "startRowIndex": 1,
                                      "endRowIndex": 2,
                                      "startColumnIndex": 0,
                                      "endColumnIndex": 2
                                    }
                                  ]
                                }
                              },
                              "targetAxis": "LEFT_AXIS"
                            },
                          ],
                          "headerCount": 1
                        }
                      },
                      "position": {
                        "overlayPosition": {
                          "anchorCell": {
                            "sheetId": 0,
                            "rowIndex": 4,
                            "columnIndex": 0
                          },
                          "offsetXPixels": 50,
                          "offsetYPixels": 50
                        }
                      }
                    }
                  }
                }
              ],  // TODO: Update placeholder value.
        
              // TODO: Add desired properties to the request body.
            },
        };
        try {
          const response = (await sheets.spreadsheets.batchUpdate(request, spreadsheetId )).data;
          console.log(JSON.stringify(response, null, 2));
        } catch (err) {
          console.error(err);
        }
    }

  

main();

