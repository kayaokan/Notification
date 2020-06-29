import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import OneSignal from 'react-native-onesignal';

export class App extends Component {
  constructor(props) {
    super(props);
    //Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('5cf4ca69-9e25-4df5-83e4-3eb4f2636281', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    alert('Notification received: ', notification);
  }

  onOpened(openResult) {
    alert('Message: ', openResult.notification.payload.body);
    alert('Data: ', openResult.notification.payload.additionalData);
    alert('isActive: ', openResult.notification.isAppInFocus);
    alert('openResult: ', openResult);
  }

  onIds(device) {
    alert('Device info: ', device);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>REACT NATIVE WITH FIREBASE ONE SIGNAL !!!</Text>
      </View>
    );
  }
}
function myiOSPromptCallback(permission) {
  // do something with permission value
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
