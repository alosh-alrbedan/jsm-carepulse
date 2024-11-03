import { ID, Query } from "node-appwrite";
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
    try {
        console.log("Project ID:", PROJECT_ID);
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );
        console.log({ newUser });
        return newUser;
    } catch (error: any) {
        if (error?.code === 409) {
            const documents = await users.list([
                Query.equal('email', user.email)
            ]);
            return documents.users[0];
        } else {
            console.error("Error creating user:", error);
            throw error;
        }
    }
};

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return user;
    } catch (error) {
        console.error(`Error retrieving user with ID ${userId}:`, error);
        throw error;
    }
};

export const getPatient = async (userId: string) => {
    console.log("Fetching patient with userId:", userId);
    try {
        const patients = await databases.listDocuments(
            DATABASE_ID,
            PATIENT_COLLECTION_ID,
            [Query.equal('userId', userId)]
        );
        return parseStringify(patients.documents[0]);
    } catch (error) {
        console.error(`Error retrieving patient data for userId ${userId}:`, error);
        throw error;
    }
};

export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
    try {
        let file;
        if (identificationDocument) {
            const blobFile = identificationDocument.get('blobFile') as Blob;
            const fileName = identificationDocument.get('fileName') as string;

            file = await storage.createFile(
                BUCKET_ID,
                ID.unique(),
                blobFile,
                fileName
            );
        }

        const newPatient = await databases.createDocument(
            DATABASE_ID,
            PATIENT_COLLECTION_ID,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: file
                    ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
                    : null,
                ...patient
            }
        );

        return parseStringify(newPatient);
    } catch (error) {
        console.error("Error registering patient:", error);
        throw error;
    }
};
