import renderer from "react-test-renderer";
import {AppButton} from "../../src/components/appButton";
import {cleanup, fireEvent, render} from "@testing-library/react-native";

beforeEach(() => {
    cleanup();
})

beforeEach(() => {
    global.TEST_TITLE = "Random title";
    global.TEST_ON_PRESS = () => {};
    global.TEST_ID = "testID";
});

describe('AppButton', () => {
    it('should render correctly', () => {
        const testProps = {
            title: global.TEST_TITLE,
            onPress: global.TEST_ON_PRESS,
            testID: global.TEST_ID
        }

        const { toJSON } = renderer.create(
            <AppButton {...testProps} />
        )
        expect(toJSON()).toMatchSnapshot();
    });

    it('should call the correct function when clicked on', () => {
        let changedTitle = "changed title"
        const testOnPress = () => {
            global.TEST_TITLE = changedTitle;
        }
        const testProps = {
            title: global.TEST_TITLE,
            onPress: testOnPress,
            testID: global.TEST_ID
        }

        const { getByText } = render(<AppButton {...testProps} />);
        fireEvent.press(getByText(global.TEST_TITLE));
        expect(global.TEST_TITLE).toEqual(changedTitle);
    });


    it('should set the title', () => {
        const testProps = {
            title: global.TEST_TITLE,
            onPress: global.TEST_ON_PRESS,
            testID: global.TEST_ID
        }
        const { getByText} = render(<AppButton {...testProps} />);
        expect(getByText(global.TEST_TITLE)).toBeTruthy();
    });

    it('should set the test id', () => {
        const testProps = {
            title: global.TEST_TITLE,
            onPress: global.TEST_ON_PRESS,
            testID: global.TEST_ID
        }
        const { getByTestId } = render(<AppButton {...testProps} />);
        expect(getByTestId(global.TEST_ID)).toBeTruthy();
    })
})