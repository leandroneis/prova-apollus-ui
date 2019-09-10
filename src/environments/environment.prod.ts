export const environment = {
  production: true,
  apiUrl: 'https://prova-apollus-usuario-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('prova-apollus-usuario-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
