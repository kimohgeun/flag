import React, { Component } from 'react';
import DownloadPresenter from './DownloadPresenter';
import axios from 'axios';

class DownloadContainer extends Component {
	state = {
		downloading: false,
		err: false,
	};

	async componentDidMount() {
		const { username, flagname } = this.props.match.params;

		axios({
			url: `/api/files/download/${username}/${flagname}`,
			method: 'GET',
			responseType: 'blob',
		}).then(res => {
			const filename = decodeURIComponent(res.headers.filename);
			if (filename === 'undefined') {
				return this.setState({ err: true });
			} else {
				console.log(filename);
				const url = window.URL.createObjectURL(new Blob([res.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', filename);
				document.body.appendChild(link);
				link.click();
				this.setState({
					downloading: true,
				});
			}
		});
	}

	render() {
		const { downloading, err } = this.state;
		return <DownloadPresenter downloading={downloading} err={err} />;
	}
}

export default DownloadContainer;
