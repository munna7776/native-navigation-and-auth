import { ID, Account, Client } from "appwrite"
import config from "react-native-config";
import Snackbar from "react-native-snackbar"

const appwriteClient = new Client()

const APPWRITE_ENDPOINT = config.APPWRITE_ENDPOINT!
const APPWRITE_PROJECT_ID = config.APPWRITE_PROJECT_ID!

type LoginUserAccount = {
    email: string;
    password: string;
}

type Prettify<T extends Record<string, any>> = {
    [K in keyof T]: T[K]
}

type CreateUserAccount = Prettify<{
    name: string
} & LoginUserAccount>