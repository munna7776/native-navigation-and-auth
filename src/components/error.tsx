import {StyleSheet, Text} from 'react-native';
import React from 'react';

export const FormError = ({error}: {error?: string}) => {
  return error ? <Text style={styles.error}>{error}</Text> : null;
};

const styles = StyleSheet.create({
  error: {
    marginTop: 4,
    color: 'red',
    fontSize: 14,
    lineHeight: 16,
  },
});
