import SignInScreen from "../../src/screens/signInScreen";
import {fireEvent, render} from "@testing-library/react-native";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import '@testing-library/jest-native/extend-expect';
import renderer from "react-test-renderer";

beforeAll(() => {
    global.FAKE_EMAIL = "jest@studychat.dev"
    global.FAKE_PASSWORD = "FakePassword"
});

describe('SignInScreen', () => {
    it('should render correctly', () => {
        const { toJSON } = renderer.create(
            <SignInScreen />
        );
        expect(toJSON()).toMatchSnapshot();
    });

    it('sign in the user when entering credentials of an existing user account', () => {
        const { getByPlaceholderText, getByText } = render(
            <SignInScreen />
        );

        fireEvent.changeText(
            getByPlaceholderText("Email.."),
            global.FAKE_EMAIL
        );
        fireEvent.changeText(
            getByPlaceholderText("Password.."),
            global.FAKE_PASSWORD
        );
        fireEvent.press(getByText("Sign in"));
        expect(signInWithEmailAndPassword).toHaveBeenCalled();

    });

    it('should print an error message when password field is empty', () => {
        const { getByPlaceholderText, getByText, queryByTestId } = render(
            <SignInScreen />
        );

        fireEvent.changeText(
            getByPlaceholderText("Email.."),
            global.FAKE_EMAIL
        );
        fireEvent.press(getByText("Sign in"));
        expect(queryByTestId('message-container')).toHaveTextContent('A password is required');
    });

    it('should print an error message when email field is empty', () => {
        const { getByPlaceholderText, getByText, queryByTestId } = render(
            <SignInScreen />
        );
        fireEvent.changeText(
            getByPlaceholderText("Password.."),
            global.FAKE_PASSWORD
        );
        fireEvent.press(getByText("Sign in"));
        expect(queryByTestId('message-container')).toHaveTextContent("An email is required");
    });

    it('should print an error message if both fields are empty', () => {
        const { getByText, queryByTestId } = render(
            <SignInScreen />
        );
        fireEvent.press(getByText("Sign in"));
        expect(queryByTestId('message-container')).toHaveTextContent("Please fill in the credentials");
    });


    it('should print an error message if the user does not exist', async () => {
        const email = "some_email@email.dev";
        const password = "SomePassword";
        const { getByPlaceholderText, getByText, queryByTestId, findByText } = render(
            <SignInScreen />
        );
        fireEvent.changeText(
            getByPlaceholderText("Email.."),
            email
        );
        fireEvent.changeText(
            getByPlaceholderText("Password.."),
            password
        );
        fireEvent.press(getByText("Sign in"));
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), email, password);
        await findByText("User not found");
        expect(queryByTestId('message-container')).toHaveTextContent("User not found");

    });

    it('should print an error message if password is incorrect', async () => {
        const { getByPlaceholderText, getByText, queryByTestId, findByText } = render(
            <SignInScreen />
        );
        const password = "SomePassword"
        fireEvent.changeText(
            getByPlaceholderText("Email.."),
            global.FAKE_EMAIL
        );
        fireEvent.changeText(
            getByPlaceholderText("Password.."),
            password
        );
        fireEvent.press(getByText("Sign in"));
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), global.FAKE_EMAIL, password);
        await findByText("Invalid password");
        expect(queryByTestId('message-container')).toHaveTextContent("Invalid password");
    });

    it('should redirect to SignUpScreen when clicking the "create new account"-button', () => {
        const navigationProps = {
            navigation: {
                push: jest.fn()
            }
        }
        const { getByText } = render(
            <SignInScreen {...navigationProps}/>
        );
        fireEvent.press(getByText("Click here to create one!"));
        expect(navigationProps.navigation.push).toHaveBeenCalledWith("Sign-up");
    });
});


