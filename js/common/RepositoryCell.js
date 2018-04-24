import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

export default class RepositoryCell extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
                style={styles.container}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{this.props.data.full_name}</Text>
                    <Text style={styles.description}>{this.props.data.description}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text>Author:</Text>
                            <Image
                                style={styles.avatarUrl}
                                source={{uri: this.props.data.owner.avatar_url}}
                            />
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text>Star:</Text>
                            <Text>{this.props.data.stargazers_count}</Text>
                        </View>
                        <Image style={styles.avatarUrl} source={require('../../res/images/ic_star.png')}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarUrl: {
        height: 22,
        width: 22,
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    },
    cell_container: {
        backgroundColor:'white',
        padding:10,
        marginLeft:10,
        marginRight:10,
        marginVertical:3,
        borderWidth:0.5,
        borderRadius:4,
        borderColor:'#dddddd',
        shadowColor:'gray',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2,
    },
});