import React, { Component } from 'react';
import DownloadPresenter from './DownloadPresenter';
import axios from 'axios';

class DownloadContainer extends Component {
	state = {
		filename: '',
		downloading: false,
		err: false,
	};

	componentDidMount() {
		const { username, flagname } = this.props.match.params;
		axios({
			url: `/api/files/download/${username}/${flagname}`,
			method: 'GET',
			responseType: 'blob',
		})
			.then(res => {
				const filename = decodeURIComponent(res.headers.filename);
				this.setState({
					filename,
				});
				// 다운로드
				const url = window.URL.createObjectURL(new Blob([res.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', filename);
				document.body.appendChild(link);
				link.click();
				this.setState({
					downloading: true,
				});
			})
			.catch(() =>
				this.setState({
					err: true,
				})
			);
	}

	render() {
		const { filename, downloading, err } = this.state;
		return <DownloadPresenter filename={filename} downloading={downloading} err={err} />;
	}
}

export default DownloadContainer;
