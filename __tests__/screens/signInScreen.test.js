import SignInScreen from "../../src/screens/signInScreen";
import {fireEvent, render} from "@testing-library/react-native";

describe('test that error messages are printed', () => {
    it('not filling in the password will print an error message', () => {
        Object.defineProperty(global, "window", {
            value: {
                alert: jest.fn()
            }
        });
        const { getByPlaceholderText, getByText } = render(
            <SignInScreen />
        );
        fireEvent.changeText(
            getByPlaceholderText("Email.."),
            "katrin@studychat.se"
        );
        fireEvent.press(getByText("Sign in"));
        expect(window.alert).toHaveBeenCalledWith("A password is required.");
    });

    it('not filling in the email field will print an error message', () => {
        Object.defineProperty(global, "window", {
            value: {
                alert: jest.fn()
            }
        });
        const { getByPlaceholderText, getByText } = render(
            <SignInScreen />
        );
        fireEvent.changeText(
            getByPlaceholderText("Password.."),
            "password"
        );
        fireEvent.press(getByText("Sign in"));
        expect(window.alert).toHaveBeenCalledWith( "An email is required.");
    });

    it('not filling in the credentials will print an error message', () => {
        Object.defineProperty(global, "window", {
            value: {
                alert: jest.fn()
            }
        });
        const { getByText } = render(
            <SignInScreen />
        );
        fireEvent.press(getByText("Sign in"));
        expect(window.alert).toHaveBeenCalledWith("Please fill in the credentials.");
    });
})

test('pushing the signup button redirects the user to main screen', () => {
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
})