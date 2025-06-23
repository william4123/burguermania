import { Alert, Platform } from "react-native";

function alertWeb(message) {
  if (typeof window !== 'undefined' && window.alert) {
    window.alert(message);
  }
}

function alertNative(message) {
  Alert.alert(
    "Aviso",
    message,
    [{ text: "OK" }],
    { cancelable: false }
  )
}

const alert = Platform.OS === 'web' ? alertWeb : alertNative;

export default alert;
