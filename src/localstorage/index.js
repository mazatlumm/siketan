import AsyncStorage from "@react-native-async-storage/async-storage";

export const SimpanLokalJson = async (value, key) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
        return true;
    } catch (e) {
        return false;
    }
}

export const SimpanLokal = async (value, key) => {
    try {
        await AsyncStorage.setItem(key, value)
        return true;
      } catch (e) {
        return false;
      }
}

export const BacaLokal = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return(value);
    } catch(e) {
        return(e);
    }
}

export const BacaLokalJson = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return(jsonValue)
    } catch(e) {
        return(e);
    }
}