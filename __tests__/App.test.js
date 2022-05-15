import App from "../App";
import {fireEvent, render, cleanup, waitFor} from "@testing-library/react-native";
import {initializeApp} from "firebase/app";
import {getAuth, initializeAuth, onAuthStateChanged, signOut} from "firebase/auth";

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('firebase/app', () => {
    return {
        initializeApp: jest.fn((config) => {})
    }
});
jest.mock("@react-native-async-storage/async-storage", () => {
    return {
        AsyncStorage: {}
    }
});
jest.mock("firebase/auth/react-native", () => {
    return {
        getReactNativePersistence: jest.fn((arg) => {
        })
    }
})
jest.mock('firebase/auth', () => {
    return {
        getAuth: jest.fn(),
        initializeAuth: jest.fn((app, persistence) => {}),
        onAuthStateChanged: jest.fn((auth, cb) => {
            cb(global.user);
        }),
        signOut: jest.fn((auth) => {
            return new Promise((doResolve) => {
                global.user = null;
                doResolve(true);
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
})

beforeEach(() => {
    global.user = null;
})
afterEach(() => {
    cleanup();
})

describe('App', () => {
    it('should initialize firebase app and firebase auth', () => {
        render(<App />);
        expect(initializeApp).toHaveBeenCalled();
        expect(initializeAuth).toHaveBeenCalled();
        expect(onAuthStateChanged).toHaveBeenCalled();
        expect(getAuth).toHaveBeenCalled();
    });

    it('should render SignInScreen when user is null', async () => {
        const {getByText, getByPlaceholderText} = render(<App />);
        await waitFor(() => {
            expect(getByText('Welcome to StudyChat!')).toBeTruthy();
            expect(getByText('Sign in')).toBeTruthy();
            expect(getByText('Click here to create one!')).toBeTruthy();
            expect(getByPlaceholderText('Email..')).toBeTruthy();
            expect(getByPlaceholderText('Password..')).toBeTruthy();
        })
    });

    it('should render SignUpScreen when pressing the "Click here to create one!" button', async () => {
        const { getByText, getByPlaceholderText } = render(<App />);
        fireEvent.press(getByText('Click here to create one!'));
        await waitFor(() => {
            expect(getByText('Create a new account')).toBeTruthy();
            expect(getByPlaceholderText('Full name')).toBeTruthy();
            expect(getByPlaceholderText('Email')).toBeTruthy();
            expect(getByPlaceholderText('Password')).toBeTruthy();
        })
    });

    it('should render MainScreen when user is true', async () => {
        global.user = {uid: "mocked_uid"};
        const { getByText } = render(<App />);
        await waitFor(() => {
            expect(getByText('Go to ChatScreen')).toBeTruthy();
            expect(getByText('Go to ContactListScreen')).toBeTruthy();
            expect(getByText('Logout')).toBeTruthy();
        })
    });

    it('should render ChatScreen when pressing the "Go to ChatScreen"-button', async () => {
        global.user = {uid: "mocked_uid"};
        const { getByText } = render(<App/>);
        fireEvent.press(getByText('Go to ChatScreen'));
        await waitFor(() => {
            expect(getByText('Send message')).toBeTruthy();
        })
    });

    it('should render ContactListScreen when pressing the "Go to ContactListScreen"-button', async () => {
        global.user = {uid: "mocked_uid"};
        const { getByText } = render(<App/>);
        fireEvent.press(getByText('Go to ContactListScreen'));
        await waitFor(() => {
            expect(getByText('Contact list screen')).toBeTruthy();
        })
    });

    it('should sign out when pressing the "logout"-button', async () => {
        global.user = {uid: "mocked_uid"};
        const { getByText } = render(<App/>);
        fireEvent.press(getByText('Logout'));
        expect(signOut).toHaveBeenCalled();
        expect(onAuthStateChanged).toHaveBeenCalled();
    });
})