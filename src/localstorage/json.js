import AsyncStorage from "@react-native-async-storage/async-storage";

export const SimpanLokal = async (value, key) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
        return true;
    } catch (e) {
        return false;
    }
}

export const BacaLokal = async (key) => {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}