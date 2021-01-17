import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@MyApp:key';

export default class App extends Component {
  state = {
    text: '',
    storedValue: '',
  };

  constructor(props){  
    super(props);
    this.onLoad();
  }

  onLoad = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      this.setState({ storedValue });
    } 
    catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
      console.log(error);
    }
  }

  onSave = async () => {
    const { text } = this.state;

    try {
      // Data not encrypted
      await AsyncStorage.setItem(key, text);
      Alert.alert('Saved', 'Successfully saved data on device');
    } 
    catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
      console.log(error);
    }
  }

  onChange = (text) => {
    this.setState({ text });
  }

  render() {
    const { storedValue, text } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.preview}>{storedValue}</Text>

        <View>
          <TextInput style={styles.input} onChangeText={this.onChange} value={text} placeholder="Type here..." />
          
          <TouchableOpacity onPress={this.onSave} style={styles.button}>
            <Text>Save</Text>
          </TouchableOpacity>
        
          <TouchableOpacity onPress={this.onLoad} style={styles.button}>
            <Text>Load</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  preview: {
    backgroundColor: '#bdc3c7',
    width: 300,
    height: 80,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 50
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 300,
    height: 40,
    padding: 5,
  },
  button: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
  }
});

// expo init my-app
// expo install @react-native-async-storage/async-storage
