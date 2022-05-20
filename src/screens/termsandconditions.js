import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";

const TextInANest = () => {
  const [titleText, setTitleText] = useState("Terms and Conditions");
  const bodyText = 
  "Our Terms And Policies."
  "You must use our Services according to our Terms and posted policies."
  " If you violate our Terms or policies, we may take action with respect to your account, including disabling or suspending your account and, if we do, you agree not to create another account without our permission."
  "Legal And Acceptable Use. You must access and use our Services only for legal, authorized, and acceptable purposes. You will not use (or assist others in using) our Services in ways that:"
  "(a) violate, misappropriate, or infringe the rights of StudyChat, our users, or others, including privacy, publicity, intellectual property, or other proprietary rights;"
  "(b) are illegal, obscene, defamatory, threatening, intimidating, harassing, hateful, racially or ethnically offensive, or instigate or encourage conduct that would be illegal or otherwise inappropriate, such as promoting violent crimes, endangering or exploiting children or others, or coordinating harm;"
  "(c) involve publishing falsehoods, misrepresentations, or misleading statements; (d) impersonate someone; (e) involve sending illegal or impermissible communications such as bulk messaging, auto-messaging, auto-dialing, and the like; or (f) involve any non-personal use of our Services unless otherwise authorized by us.";

  const onPressTitle = () => {
    setTitleText("Terms and Conditions [pressed]");
  };

  return (
    <Text style={styles.baseText}>
      <Text style={styles.titleText} onPress={onPressTitle}>
        {titleText}
        {"\n"}
        {"\n"}
      </Text>
      <Text numberOfLines={5}>{bodyText}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default TextInANest;