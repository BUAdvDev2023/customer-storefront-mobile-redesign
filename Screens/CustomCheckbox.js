// CustomCheckbox.js
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomCheckbox = ({ value, onValueChange }) => (
  <TouchableOpacity onPress={onValueChange} style={styles.checkboxContainer}>
    <View style={[styles.checkbox, value && styles.checkedCheckbox]}>
      {value && <Ionicons name="checkmark-sharp" size={17} color="white" />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  checkedCheckbox: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
});

export default CustomCheckbox;
