import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import Girl from './Girl';
import NavigationBar from './NavigationBar';

export default class Boy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            word: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Boy'}
                    statusBar={{
                        backgroundColor:'blue'
                    }}
                />
                <Text style={styles.text}>I am boy!</Text>
                <Text style={styles.text}
                      onPress={() => {
                          this.props.navigator.push({
                              component: Girl,
                              name: 'Girl',
                              params: {
                                  word: '一枝玫瑰',
                                  onCallBack: (word) => {
                                      this.setState({
                                          word: word,
                                      })
                                  }
                              }
                          })
                      }}>送给女孩一枝玫瑰</Text>
                <Text style={styles.text}>{this.state.word}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'green'
    },

    text: {
        fontSize: 20,
        color: 'red'
    },

    page1: {},

    page2: {},

});