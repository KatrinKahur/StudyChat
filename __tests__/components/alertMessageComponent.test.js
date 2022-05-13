import {AlertMessageComponent} from "../../src/components/alertMessageComponent";
import renderer from 'react-test-renderer';
import {render, cleanup, fireEvent} from "@testing-library/react-native";
import { toHaveStyle, toHaveTextContent } from "@testing-library/jest-native";
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom'

beforeEach(() => {
    cleanup();
})

describe('AlertMessageComponent', () => {
    expect.extend({ toHaveStyle, toHaveTextContent });
    it('should render correctly', () => {
        let testMessage = "Random message";
        const setTestMessage = (message) => {
            testMessage = message;
        }
        let style = "danger"
        const testProps = {
            message: testMessage,
            chosenStyle: style,
            setMessageCallback: setTestMessage
        }

        const { toJSON } = renderer.create(
            <AlertMessageComponent {...testProps} />
        )
        expect(toJSON()).toMatchSnapshot();
    });

    it('should render "info"-style if chosenStyle not specified', () => {
        let testMessage = "Random message";
        const setTestMessage = (message) => {
            testMessage = message;
        }
        let style = ""
        const testProps = {
            message: testMessage,
            chosenStyle: style,
            setMessageCallback: setTestMessage
        }
        const { getByText, getByTestId } = render(<AlertMessageComponent
            {...testProps} />);
        expect(getByText(testMessage)).toHaveStyle({
            color: "#31708f"
        })
        expect(getByTestId('message-container')).toHaveStyle({
            backgroundColor: "#d9edf7",
            borderColor: "#bce8f1"
        });
    });

    it('should render an empty view if message property is null', () => {
        let testMessage = null;
        const setTestMessage = (message) => {
            testMessage = message;
        }
        let style = ""
        const testProps = {
            message: testMessage,
            chosenStyle: style,
            setMessageCallback: setTestMessage
        }
        const { queryByTestId } = render(<AlertMessageComponent
            {...testProps} />);
        expect(queryByTestId('message-container')).toBeNull();
    });

    it('should become invisible when pressed on', async () => {
        await act(async () => {
            let testMessage = "Random message";
            const setTestMessage = (message) => {
                testMessage = message;
            }
            let style = ""
            const testProps = {
                message: testMessage,
                chosenStyle: style,
                setMessageCallback: setTestMessage
            }
            const { queryByTestId } = render(<AlertMessageComponent
                {...testProps} />);
            fireEvent.press(queryByTestId('message-container'));
            expect(testMessage).toBeNull();
        })
    });
})