import {Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from '../styles/Main'

const Dashboard = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.containerCenter}>
        <Text style={styles.textNormalBold}>Dashboard</Text>
      </View>
    </SafeAreaProvider>
  )
}

export default Dashboard
