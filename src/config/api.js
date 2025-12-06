let API_BASE_URL;

const env = import.meta.env.MODE;

// Environment URL mapping
const envUrls = {
  dev: import.meta.env.VITE_DEV_API_URL,
  qa: import.meta.env.VITE_QA_API_URL,
  prod: import.meta.env.VITE_PROD_API_URL
};

console.log('Environment URLs:');
console.log('DEV:', envUrls.dev);
console.log('QA:', envUrls.qa);
console.log('PROD:', envUrls.prod);

if (env === 'development' || env === 'dev') {
  API_BASE_URL = envUrls.dev;
} else if (env === 'qa') {
  API_BASE_URL = envUrls.qa;
} else if (env === 'production' || env === 'prod') {
  API_BASE_URL = envUrls.prod;
}

console.log(`API Base URL set to: ${API_BASE_URL} for environment: ${env}`);

export { API_BASE_URL };
export default API_BASE_URL;