// Imports the Google Cloud client library

const {IAMCredentialsClient} = require('@google-cloud/iam-credentials');

// TODO(developer): replace with your prefered project values.
// The service account must be granted the roles/iam.serviceAccountTokenCreator role
const serviceAccount = 'nodeuser@nodejsprototype.iam.gserviceaccount.com'
const scopes = 'https://www.googleapis.com/auth/iam'
// Creates a client

const client = new IAMCredentialsClient();

async function generateAccessToken() {
  const [token] = await client.generateAccessToken({
    name: `projects/-/serviceAccounts/${serviceAccount}`,
    scope: [scopes],
  });
  console.info(token);
}
generateAccessToken();