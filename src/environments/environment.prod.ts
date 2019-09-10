export const environment = {
  production: true,
  apiUrl: 'https://prova-apollus-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('prova-apollus-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
