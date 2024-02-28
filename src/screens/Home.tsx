import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppwriteService } from '../appwrite/provider'
import Snackbar from 'react-native-snackbar'

export const Home = () => {
  const { logout } = useAppwriteService()

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({})