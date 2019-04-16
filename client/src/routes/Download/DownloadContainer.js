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
		})
			.then(res => {
				const filename = res.data.fileName;
				const filepath = res.data.filePath;
				this.setState({
					filename: filename,
					downloading: true,
				});
				const link = document.createElement('a');
				link.href = filepath;
				link.download = filename;
				link.click();
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
