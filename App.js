import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  View,
  Button
} from 'react-native';

export default function App() {
  const [items, setItems] = useState([
    {todo: 'first item'},
    {todo: 'second item'},
  ]);

  const checkIfSame = () => {
    // Trimming newItemText and setting it to lowercase
    let loweredTrimmedText = newItemText.toLocaleLowerCase().trim();

    for (let i = 0; i < items.length; i++) {
      if (items[i].todo.toLocaleLowerCase() === loweredTrimmedText) {
        return true; // A response of true means the item is already on the list
      } else {
        return false; // A response of false allows the new item to be added to the list
      }
    }
  }

  const checkIfValid = () => {
    let trimmedText = newItemText.trim(); // Trimmed version of input

    // Doesn't allow for empty input
    if (trimmedText.length == 0) {
      console.log('Your Input is empty. Please enter something.');
      return false;
    }

    // Doesn't allow for only numbers
    if (!isNaN(trimmedText)) {
      console.log('Numbers alone are not allowed.');
      return false;
    }

    // Doesn't allow for special characters
    if (!(/^[a-zA-Z0-9- ]*$/.test(trimmedText))) {
      console.log('No special characters allowed.');
      return false;
    }

    if (checkIfSame()) {
      console.log(trimmedText + " already exists.");
    } else {
      addToList(); // If false the item will be added to array
    }
	} 


  const generateList = items.map((item, index) => (
      <View key={index} style={styles.listItemContainer}>
        <Text>{item.todo}</Text>
      </View>
    )
  );

  let newItemText = '';
  const onChangeText = (text) => {
    newItemText = text;
  }

  const addToList = () => {
    console.log(newItemText)
    //console.log(items.every(item => item.todo===newItemText))
    setItems([...items, {todo: newItemText}]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>To Do's</Text>
      <TextInput
        style={styles.addItemInput}
        onChangeText={text => onChangeText(text)}
      /><Button
        title="Add Item"
        color="#154784"
        onPress={checkIfValid}
      />
      {/* input to add to list */}
      <ScrollView style={styles.scrollView}>
        {generateList}
      </ScrollView>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  appTitle: {
    fontSize: '30px',
    padding: 15,
  },
  listItemContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 15,
    paddingRight: 30,
    paddingBottom: 15,
    paddingLeft: 30,
  },
  scrollView: {
    width: '100%',
  },
  addItemInput: {
    display: 'inline',
    border: 'solid 2px #FF3399',
    borderRadius: 5,
    width: '60%',
    height: '2em',
    lineHeight: '1em',
    padding: '0.5em',
  },
});