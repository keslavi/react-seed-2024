/*
  note: values are set for local development. 
  eventually, public/config-override.js 
  will be used to adjust with celestial variables in deployment.
*/
export const config= {
  api:"/api",
  reduxLogger:false,
  env:"local",
  debug: import.meta.env.VITEST ? false : true,
  msw:true,
}

export default config;
