// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // api: 'https://lobster-app-8k3k2.ondigitalocean.app/api/',
  // filepath: 'https://lobster-app-8k3k2.ondigitalocean.app',

  api: 'http://localhost:8000/api/',
  filepath: 'http://localhost:8000/uploads/files/',
  filepathstorage: "http://localhost/LarAng/laravel/public/"

  //api: 'http://165.232.88.206/backend/api/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
