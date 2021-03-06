// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyC4-fRBUpK5EOetKTAeH0he9o5sfh71cJU",
    authDomain: "mis-letras-app.firebaseapp.com",
    projectId: "mis-letras-app",
    storageBucket: "mis-letras-app.appspot.com",
    messagingSenderId: "927513801269",
    appId: "1:927513801269:web:cae0015b8ec1b38eb6f77c"
  },
  // socketWebUrl: 'http://localhost:5000'
  socketWebUrl: 'https://mis-letras-api.azurewebsites.net/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
