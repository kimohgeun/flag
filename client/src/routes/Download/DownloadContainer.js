import React, { Component } from 'react';
import DownloadPresenter from './DownloadPresenter';
import axios from 'axios';

class DownloadContainer extends Component {
	state = {
		filename: '',
		downloading: false,
		err: false,
		loading: true,
	};

	componentDidMount() {
		const { username, flagname } = this.props.match.params;
		axios({
			url: `/api/files/download/${username}/${flagname}`,
			method: 'GET',
			responseType: 'blob',
		}).then(res => {
			const filename = decodeURIComponent(res.headers.filename);
			this.setState({
				filename,
				loading: false,
			});
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
					loading: false,
				});
			}
		});
	}

	render() {
        const { loading, downloading, filename, err } = this.state;
        return <DownloadPresenter loading={loading} downloading={downloading} filename={filename} err={err} />;
	}
}

export default DownloadContainer;
