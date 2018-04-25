import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	ListView,
	RefreshControl,
	DeviceEventEmitter,
} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import DataRepository from "../expand/dao/DataRepository"
import RepositoryCell from '../common/RepositoryCell'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import RepositoryDetail from './RepositoryDetail';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
//https://api.github.com/search/repositories?q=android&sort=stars

export default class PopularPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			languages: []
		};
	}

	componentDidMount() {
		this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
		this.loadData();
	}

	loadData() {
		this.languageDao.fetch()
			.then(result => {
				this.setState({
					languages: result
				})
			})
			.catch(error => {
				console.log(error)
			});
	}

	render() {
		let length = this.state.languages.length;
		//当页面还没有渲染完的时候，ScrollableTabView无法计算它的实际宽度，
		//所以会一直闪烁，所以需要提出来做如下处理
		let content = length > 0 ? <ScrollableTabView
			tabBarBackgroundColor='#2196f3'
			tabBarActiveTextColor='white'
			tabBarInactiveTextColor='#F5FFFA'
			tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
			renderTabBar={() => <ScrollableTabBar/>}
		>
			{this.state.languages.map((result, i, array) => {
				let len = array[i];
				return len.checked ? <PopularTab {...this.props} tabLabel={len.name} key={len.path}/> : null
			})
			}
		</ScrollableTabView> : null;
		return (
			<View style={styles.container}>
				<NavigationBar
					title='Popular'
					statusBar={{
						backgroundColor: '#2196f3'
					}}
				/>
				{content}
			</View>
		);
	}
}

class PopularTab extends Component {

	constructor(props) {
		super(props);
		// 初始状态
		this.state = {
			resultData: '',
			isRefreshing: true,
			dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
		};
		this.dataRepository = new DataRepository();
	}

	componentDidMount() {
		this.onLoad()
	}

	onLoad() {
		this.setState({isRefreshing: true});
		let url = URL + this.props.tabLabel + QUERY_STR;
		this.dataRepository
			.fetchRepository(url)
			.then(result => {
				let items = result && result.items ? result.items : result ? result : [];
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(items),
					isRefreshing: false,
				});
			})
			.catch(error => {
				this.setState({
					resultData: JSON.stringify(error),
				})
			})
	}

	onSelectRepository(item) {
		DeviceEventEmitter.emit('showToast', "item.id:" + item.id);
		this.props.navigator.push({
			title: item.full_name,
			component: RepositoryDetail,
			params: {
				item: item,
				...this.props,
			}
		});
	}

	renderRow(data) {
		return (
			<RepositoryCell
				key={data.id}
				data={data}
				onSelect={() => this.onSelectRepository(data)}
			/>
		)
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(data) => this.renderRow(data)}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={() => this.onLoad()}
							progressBackgroundColor={'#ffffff'}
							colors={['#ff0000', '#2196f3', '#B03060', '#6A5ACD']}
						/>
					}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tip: {
		fontSize: 26,
	},
	text_message: {
		fontSize: 18,
	}
});