let API_BASE_URL;

const env = import.meta.env.MODE;

const envUrls = {
  dev: import.meta.env.VITE_DEV_API_URL,
  qa: import.meta.env.VITE_QA_API_URL,
  prod: import.meta.env.VITE_PROD_API_URL
};

if (env === 'development' || env === 'dev') {
  API_BASE_URL = envUrls.dev;
} else if (env === 'qa') {
  API_BASE_URL = envUrls.qa;
} else if (env === 'production' || env === 'prod') {
  API_BASE_URL = envUrls.prod;
}

// Fallback to default if no environment URL is set
if (!API_BASE_URL) {
  console.warn('No API URL configured for environment:', env);
  API_BASE_URL = 'http://localhost:3000/api'; // Default fallback
}

export { API_BASE_URL };
export default API_BASE_URL;