import { useEffect } from "react";
import axios from "axios";

function AppleLoginButton() {
  useEffect(() => {
    if (window.AppleID && window.AppleID.auth) {
      window.AppleID.auth.init({
        clientId: "com.akash.myapp.web", // your service id
        scope: "name email",
        redirectURI: "http://localhost:3000/callback",
        usePopup: true,
      });
    }
  }, []);

  const handleAppleLogin = async () => {
    if (!window.AppleID || !window.AppleID.auth) {
      console.error('Apple ID SDK not loaded');
      return;
    }
    
    try {
      const response = await window.AppleID.auth.signIn();

      const idToken = response.authorization.id_token;

      // send to backend
      const res = await axios.post("http://localhost:3000/auth/apple", {
        identityToken: idToken,
      });

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleAppleLogin}>
      Sign in with Apple
    </button>
  );
}

export default AppleLoginButton;