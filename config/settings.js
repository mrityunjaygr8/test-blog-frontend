export const STRAPI_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://egt-strapi-db.herokuapp.com'
    : 'http://localhost:1337';
