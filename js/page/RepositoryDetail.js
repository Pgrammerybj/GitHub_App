/*
  * JackYang 2018-04-23 23:08
  * Copyright (c)2018 Qunar Co.Ltd. All right reserved. 
  *
  */
import React, {Component} from 'react';
import {View, StyleSheet, DeviceEventEmitter, WebView} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../utils/ViewUtils';

export default class RepositoryDetail extends Component {

	constructor(props) {
		super(props);
		this.url = this.props.item.html_url;
		this.state = {
			url: this.url,
			canGoBack: false,
		}
	}

	/**
	 * 若是有异步操作，则要注意有结果时组件是否状态完成了
	 */
	componentWillMount() {
	}

	/**
	 * WebView返回上一页
	 */
	goBack() {
		if (this.state.canGoBack) {
			this.webView.goBack();
		} else {
			DeviceEventEmitter.emit('showToast', 'The Page is First Page!')
		}
	}

	onBack() {
		this.props.navigator.pop();
	}

	SharePage() {

	}

	/**
	 * 通过nav传递出WebView的参数
	 * @param nav
	 */
	onNavigationStateChange(nav) {
		this.setState({
			title: nav.title,
			canGoBack: nav.canGoBack,
		})
	}

	render() {
		return (
			<View style={styles.root_container}>
				<NavigationBar
					title={this.props.item.name}
					style={{backgroundColor: '#2196f3'}}
					rightButton={ViewUtils.getRightTextButton('Share', () => this.SharePage())}
					leftButton={ViewUtils.getLeftButton(() => this.onBack())}
				/>
				<WebView
					ref={webView => this.webView = webView}
					source={{uri: this.state.url}}
					onNavigationStateChange={(nav) => this.onNavigationStateChange(nav)}
				/>
			</View>
		)
	}

	componentDidMount() {
	}
}

const styles = StyleSheet.create({
	root_container: {
		flex: 1
	},
	row: {
		alignItems: 'center',
		flexDirection: 'row',
		margin: 10,
	},
	input: {
		marginLeft: 10,
		marginRight: 10,
		fontSize: 18,
		flex: 1,
		height: 40,
	},
	tip: {
		fontSize: 18,
	},
});
