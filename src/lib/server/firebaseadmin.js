// Import the Firebase Admin SDK
var admin = require("firebase-admin");

// Import your service account key
var serviceAccount = require("./path/to/your/serviceAccountKey.json");

// Initialize the Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

// Now you can use the Firebase Admin SDK to interact with Firebase services
// For example, you can verify ID tokens sent by the client-side code
admin
	.auth()
	.verifyIdToken(idToken)
	.then((decodedToken) => {
		var uid = decodedToken.uid;
		// ...
	})
	.catch((error) => {
		// Handle error
	});
