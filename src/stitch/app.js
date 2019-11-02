import {
    Stitch,
    UserPasswordAuthProviderClient
} from "mongodb-stitch-browser-sdk";

const APP_ID = "whatelse-mnnww";
const app = Stitch.hasAppClient(APP_ID) ? Stitch.getAppClient(APP_ID) : Stitch.initializeAppClient(APP_ID);

const getClient = function () {
    return Stitch.getAppClient(APP_ID)
};

const userPasswordClient = UserPasswordAuthProviderClient.factory


export {app, getClient, userPasswordClient};


