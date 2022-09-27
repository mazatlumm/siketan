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
        if(value != null) {
            console.log('Data ' + key + ' : ' + value)
        }else{
            console.log('Data ' + key + ' : ' + value)
        }
        return (value);
      } catch(e) {
        // error reading value
        console.log('Data ' + key + ' : ' + e)
      }
}

export const BacaLokalJson = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        if(jsonValue != null){
            console.log(key + ' : ' + jsonValue);
            return (jsonValue);
        }else{
            console.log(key + ' : ' + jsonValue);
            return null;
        }
    } catch(e) {
    // error reading value
        return null;
    }
}