import { Button } from 'antd-mobile';
import React, { useEffect, useRef, useState } from 'react';

import '../style/take-photo.less';

const Regex = () => {
	const imageRef = useRef<HTMLImageElement>(null);
	const [base64, setBase64] = useState('');
	const [fileInfo, setFileInfo] = useState<{ name: string; size: string; url: string }>({
		name: '',
		size: '',
		url: ''
	});

	useEffect(
		() => () => {
			window.URL.revokeObjectURL(fileInfo.url);
		},
		[fileInfo.url]
	);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			console.dir(file);
			const fileSize = Math.round(file.size / 1024).toFixed(2); // KB
			const url = window.URL.createObjectURL(file);
			setFileInfo({ name: file.name, size: fileSize, url });

			// 转bold 方法一
			// void fetch(url)
			//   .then(res => res.blob())
			//   .then(blod => {
			//     console.log('blod= ', blod);
			//   });

			// 转bold 方法二
			const reader2 = new FileReader();
			reader2.readAsArrayBuffer(file);
			reader2.onload = e => {
				const result = e.target?.result;
				if (result instanceof ArrayBuffer) {
					const blob = new Blob([result]);
					console.log('blob=', blob);
				}
			};

			// 转 base64
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				const base64 = reader.result;
				if (typeof base64 === 'string') {
					setBase64(base64);
					console.log(base64);
				}
			};
		}
	};

	// 下载文件方法
	const funDownload = (url: string, filename: string) => {
		const eleLink = document.createElement('a');
		eleLink.download = filename;
		eleLink.style.display = 'none';
		eleLink.href = url;
		// 触发点击
		document.body.appendChild(eleLink);
		eleLink.click();
		// 然后移除
		document.body.removeChild(eleLink);
	};

	// 下载
	const onDownLoadImg = () => {
		if ('download' in document.createElement('a')) {
			funDownload(fileInfo.url, fileInfo.name);
		} else {
			window.alert('浏览器不支持！');
		}
	};

	return (
		<section styleName="take-photo">
			<div className="input-wrap">
				<span className="input-inner">+</span>
				<input className="input" type="file" accept="image/*" capture="user" onChange={onChange} />
			</div>
			<div className="image">{fileInfo.url && <img ref={imageRef} src={fileInfo.url || base64} alt="" />}</div>
			<div style={{ width: '100%', margin: '10px 0' }}>
				{fileInfo.url && (
					<Button type="primary" onClick={onDownLoadImg}>
						下载图片
					</Button>
				)}
			</div>
		</section>
	);
};

export default Regex;
