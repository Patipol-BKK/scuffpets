import { getAuthFirebase } from '/src/components/utils/firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";

function mapUsernameToEmail(username) {
  // Convert the username to lowercase
  const lowercaseUsername = username.toLowerCase();

  // Replace non-ASCII characters with their Unicode code points
  const emailName = lowercaseUsername.replace(/[^\x00-\x7F]/g, (char) => {
    // Convert non-ASCII characters to their Unicode code point
    return `u${char.codePointAt(0)}`;
  });

  return emailName;
}

export function registerUser(username, password, onAuthError, onAuthSuccess) {
    const uid = 'test-uid';
    const auth = getAuthFirebase()
    const convertedUsername = mapUsernameToEmail(username)
    // console.log(convertedUsername)
    const email = `${convertedUsername}@${process.env.NEXT_PUBLIC_EMAIL_BASE}`
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            onAuthSuccess(user);
        })
        .catch((error) => {
            var errorMsg = '';
            switch(error.code) {
                case 'auth/email-already-in-use':
                    errorMsg = 'This email has already been registered!'
                    break;
                case 'auth/invalid-email':
                    errorMsg = 'Someone fucked up some code in the backend'
                    break;
                case 'auth/operation-not-allowed':
                    errorMsg = 'Regal forgot to emable email/password accounts in the Firebase Console under the Auth tab.'
                    break;
                case 'auth/weak-password':
                    errorMsg = error.message.slice(10, -22)
                    break;
                default:
                    errorMsg = 'Unexpected Error: ' + error.message
            }
            onAuthError(errorMsg);
        });
    // return auth().createCustomToken(uid);
}

export function signInUser(username, password, onAuthError) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            const user = userCredential.user;
        // ...
        })
        .catch((error) => {
            var errorMsg = 'Unexpected Error: ' + error.message
            onAuthError(errorMsg);
        });
}