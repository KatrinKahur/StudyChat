jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('firebase/app', () => {
    return {
        initializeApp: jest.fn()
    }
});
jest.mock("@react-native-async-storage/async-storage", () => {
    return {
        AsyncStorage: {}
    }
});
jest.mock("firebase/auth/react-native", () => {
    return {
        getReactNativePersistence: jest.fn()
    }
})
jest.mock('firebase/auth', () => {
    return {
        getAuth: jest.fn(),
        initializeAuth: jest.fn(),
        onAuthStateChanged: jest.fn((auth, cb) => {
            cb(global.user);
        }),
        signOut: jest.fn(() => {
            return new Promise((doResolve) => {
                global.user = null;
                doResolve(true);
            })
        }),
        signInWithEmailAndPassword: jest.fn((auth, email, password) => {
            return new Promise((doResolve, doReject) => {
                if((email === global.FAKE_EMAIL) && (password === global.FAKE_PASSWORD)){
                    doResolve(true);
                } else {
                    if(email.indexOf("@") === -1) {
                        doReject({message: "Firebase: Error (auth/invalid-email)."})
                    } else if(email !== global.FAKE_EMAIL) {
                        doReject({message: "Firebase: Error (auth/user-not-found)."})
                    } else {
                        doReject({message: "Firebase: Error (auth/wrong-password)."})
                    }
                }
            })
        })
    }
})
jest.mock('firebase/database', () => {
    return {
        getDatabase: jest.fn(),
        ref: jest.fn(),
        set: jest.fn(),
        push: jest.fn(),
        child: jest.fn(),
        get: jest.fn()
    }
});