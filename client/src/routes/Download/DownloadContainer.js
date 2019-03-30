import React, { Component } from 'react';
import DownloadPresenter from './DownloadPresenter';
import axios from 'axios';
import FileDownload from'js-file-download';

class DownloadContainer extends Component {
	componentDidMount() {
		const { username, flagname } = this.props.match.params;
		axios({
			url: `/api/files/download/${username}/${flagname}`,
			method: 'GET',
			responseType: 'blob', // important
		}).then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'file.pdf');
			document.body.appendChild(link);
			link.click();
		});
	}

	render() {
		return <DownloadPresenter />;
	}
}

export default DownloadContainer;
