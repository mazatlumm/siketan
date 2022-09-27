import AsyncStorage from "@react-native-async-storage/async-storage";

export const SimpanLokal = async (value, key) => {
    try {
        await AsyncStorage.setItem(key, value)
        return true;
      } catch (e) {
        return false;
      }
}

export const BacaLokal = async (key) => {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
        return value;
    }else{
        return false;
    }
}