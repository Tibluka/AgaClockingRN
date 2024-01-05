import Reactotron from "reactotron-react-native";
import { NativeModules } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const hostname = NativeModules.SourceCode.scriptURL
  .split("://")[1] // Remove the scheme
  .split("/")[0] // Remove the path
  .split(":")[0]; // Remove the port

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ host: hostname }) // configure the hostname for Expo
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!