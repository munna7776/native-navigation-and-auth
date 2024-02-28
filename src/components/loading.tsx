import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const Loading = () => {
  return (
    <View style={styles.loadingContainer} >
      <ActivityIndicator size={60} color="#218F76" />
    </View>
  )
}


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})