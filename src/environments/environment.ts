// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  localStoragePrefix: 'dPortal-front',
  // apiUrl: "https://cors-anywhere.herokuapp.com/https://trhov.com/hosted_domains/dportal/back/api/",
  apiUrl: "http://noone21.test/backend/api/",
  // apiUrl: "http://192.168.0.28/deportal_back/api/",
  whitelistedDomains: ['http://localhost',"http://localhost:4200","cors-anywhere.herokuapp.com"],
  debugging: true,
  // mapKey: 'AIzaSyA8mccIl_8sNXC2yu1MZMXYcAU1d26ILZA',
  mapKey: 'AIzaSyA8mccIl_8sNXC2yu1MZMXYcAU1d26ILZA',
  googleId: '431834735221-n2s3o16qpj26s72e86fua44h75qp6es3.apps.googleusercontent.com',
  facebookId: '392491148378507',
  linkedInId: "78whmhu8glprqk",
  instagramId: '3376315992400294',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
