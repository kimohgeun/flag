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
		await axios.get(`/api/files/filename/${username}/${flagname}`).then(res => {
			if (res.data.filename) {
				this.setState({
					downloading: true,
				});
				const filename = res.data.filename;
				axios({
					url: `/api/files/download/${username}/${flagname}`,
					method: 'GET',
					responseType: 'blob',
				}).then(response => {
					const url = window.URL.createObjectURL(new Blob([response.data]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', filename);
					document.body.appendChild(link);
					link.click();
				});
			} else {
				this.setState({
					err: true,
				});
			}
		});
	}

	render() {
		const { downloading, err } = this.state;
		console.log(err)
		return <DownloadPresenter downloading={downloading} err={err} />;
	}
}

export default DownloadContainer;
