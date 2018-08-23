import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  TextInput,
  StatusBar,
  Dimensions,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { List, ListItem } from 'native-base';

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      error: null,
      UserInput: undefined,
      dataSource: undefined
    }
  }

  SaveValue = async () => {
    if(!this.state.UserInput){
      return alert('Please Enter Value..');
    }
    const productToBeSave = {
      UserInput: this.state.UserInput
    };

    const existingProducts = await AsyncStorage.getItem('products');
    let newProduct = JSON.parse(existingProducts);

    if (!newProduct) {
      newProduct = []
    }
    newProduct.push(productToBeSave);

    // console.log('newProduct ==>', JSON.stringify(newProduct));
    await AsyncStorage.setItem('products', JSON.stringify(newProduct))
      .then((res) => {
        console.log('It was saved successfully', res)
      })
      .catch((err) => {
        console.log('There was an error saving the product', err);
      })
  }

  RemoveValue = () => {
    AsyncStorage.removeItem('products')
  }


  GetResult = async () => {
    await AsyncStorage.getItem('products')
      .then((response) => {
        this.setState({
          dataSource: JSON.parse(response)
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleRecordSelection = () => {

  }

  async componentWillMount() {
    await AsyncStorage.getItem('products')
      .then((response) => {
        this.setState({
          dataSource: JSON.parse(response)
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  async componentDidUpdate() {
    await AsyncStorage.getItem('products')
      .then((response) => {
        this.setState({
          dataSource: JSON.parse(response)
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    console.log('dataSource ==>', this.state.dataSource);
    return (
      <View style={styles.container}>
        <TextInput
          selectionColor='#ffffff'
          style={{
            paddingLeft: 5,
            height: 40,
            marginTop: 100,
            marginBottom: 20,
            textAlign: 'left',
            color: '#000000',
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            width: '100%',
            alignSelf: 'center'
          }}
          onChangeText={(UserInput) =>  this.setState({ UserInput })}
          placeholder="Enter .."
          value={this.state.UserInput} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.SaveValue()}>
          <Text style={styles.textbutton}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.GetResult()}>
          <Text style={styles.textbutton}>Fetch</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.RemoveValue}>
          <Text style={styles.textbutton}>Remove</Text>
        </TouchableOpacity>
        {this.state.dataSource &&
          <List
            style={{ width: '100%' }}
            dataArray={this.state.dataSource}
            renderRow={item => {
              console.log('item ==>>', item);
              return (
                <ListItem
                  onPress={() => this.handleRecordSelection(item)}>
                  <Text style={(item.UserInput) ?
                    { fontWeight: 'bold' } : {}}>{item.UserInput}</Text>
                </ListItem>
              )
            }} />
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    margin: 25,
    alignItems: 'center'
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: '75%',
    marginTop: 5
  },
  textbutton: {
    fontWeight: '500',
    fontSize: 15,
    margin: 10,
  },
  datatext: {
    fontSize: 20,
    margin: 10,
  },
  loading: {
    margin: 40,
  },
  favcontainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row'
  }
});