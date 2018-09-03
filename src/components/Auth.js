import { AsyncStorage } from "react-native";

export const isAuthenticated = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token').then(res => {
      if(res !== null){
        resolve(res);
      }
      else {
        resolve(false);
      }
    })
  })
}
