module.exports = {
  NODE_ENV: '"production"',
  DEBUG_MODE: false,
  'API_BASE_PATH': JSON.stringify(process.env.API_BASE_PATH),
  'API_AUTHORIZATION': JSON.stringify(process.env.AUTHORIZATION)
}
