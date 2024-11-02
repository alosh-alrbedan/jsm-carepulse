import * as sdk from 'node-appwrite';

// Define the environment variables with default values
export const {
    PROJECT_ID = '66f67c940002c77d7c17',
    API_KEY = 'standard_62ef2d9bb283ea55c5c3f7f59f049c914020b200ab32d165e9ae4a1a1c8077c90329f0afce03caaa9f028f8ac1f576fe4f5db1fe767411ae072f17acbddeeb46ece1be341806f527238edd95e27747181f6d0ffdbae33550c043fbc2d0977eb41e549f25c2b666c82f8c24ab696417cb5e99101e017cde9ac5a6c92fbf30010e',
    DATABASE_ID = '66f67ee9002efeb78aee',
    PATIENT_COLLECTION_ID = '66f67f57002eb9cb75e7',
    DOCTOR_COLLECTION_ID = '66f67fa1002e4afb7110',
    APPOINTMENT_COLLECTION_ID = '66f67ff8000e0237cb4d',
    BUCKET_ID = '66f682a4003a712c64c9',
    ENDPOINT = 'https://cloud.appwrite.io/v1'
} = process.env;

const client = new sdk.Client();
client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
