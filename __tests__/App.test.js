import renderer from "react-test-renderer";
import App from "../App";

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
            console.log("Ran mock of getReactNativePersistence.");
        })
    }
})
jest.mock('firebase/auth', () => {
    return {
        getAuth: jest.fn(),
        initializeAuth: jest.fn((app, persistence) => {}),
        onAuthStateChanged: jest.fn((auth, cb) => {
            console.log("On auth state changed has been called.")
            global.user = {uid: "something"}
            cb(global.user)
        })
    }
})

beforeEach(() => {
    global.user = null;
})
test("test that App renders correctly", async () => {
    const { toJSON, getByText } = renderer.create(
        <App />
    )
    await global.user;
    expect(global.user).toEqual({uid: "something"})
})