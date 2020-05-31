import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.db = app.database();
        this.auth = app.auth();

        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    doSignOut = () => this.auth.signOut();

    user = uid => this.db.ref(`users/${uid}`);

    player = uid => this.db.ref(`players/${uid}`);

    players = userId => this.db.ref(`players`).child('user').equalsTo(userId);

    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
        if (authUser) {
            this.user(authUser.uid)
            .once('value')
            .then(snapshot => {
                const dbUser = snapshot.val();

                // merge auth and db user
                authUser = {
                email: authUser.email,
                ...dbUser,
                };

                next(authUser);
            });
        } else {
            fallback();
        }
    });
}

export default Firebase;