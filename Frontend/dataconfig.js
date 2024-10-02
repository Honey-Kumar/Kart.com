const VITE_BackendURL = import.meta.env.VITE_BackendURL
const VITE_RazorpayApi = import.meta.env.VITE_RZYPAYAPI
const VITE_RazorpaySecretKey = import.meta.env.VITE_RZTPAYSECRET
// RZYPAYAPI = rzp_test_yatp0pCPIUkHEI
// RZTPAYSECRET = aOE7o9J4OLFhA12N7QixNPWJ
console.log(VITE_BackendURL, VITE_RazorpayApi, VITE_RazorpaySecretKey)

export { VITE_BackendURL, VITE_RazorpayApi, VITE_RazorpaySecretKey }