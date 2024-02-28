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

export default class AppwriteService {
    account: Account;
    constructor() {
        appwriteClient.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwriteClient)
    }

    async createUser({name,email,password}: CreateUserAccount) {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            console.log(userAccount)
            if(userAccount) {
                return this.login({email,password})
            }
        } catch (error) {
            console.log("Appwrite service: createUser() - ",error)
        }
    }

    async login({email,password}: LoginUserAccount) {
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            console.log("Appwrite service: login() - ",error)
        }
    }

    async getCurentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service: getCurrentUser() - ",error)
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession("current")
        } catch (error) {
            console.log("Appwrite service: logout() - ",error)
        }
    }
}