import { Upload, message, type UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import { Image as AImage } from 'antd';
import { RiAddLine, RiLoader2Line } from 'react-icons/ri';

type ImageUploadProps = {
	limit?: number,
	value?: {
		imgUrl?: string,
		file?: Blob,
	}
	isSquare?: boolean,
	onChange?: (params: { imgUrl: string; file: File | undefined }) => void
	disabled?: boolean
}

const ImageUpload = (props: ImageUploadProps) => {
	const [imgUrl, setImageUrl] = useState<string>(props.value?.imgUrl ?? '')
	const [loading, setLoading] = useState<boolean>(false)

	const triggerChange = (changedValue: { imgUrl: string; file: File | undefined }) => {
		props.onChange?.({
			...props!.value,
			...changedValue,
		});
	};

	useEffect(() => {
		setImageUrl(props.value?.imgUrl ?? "")
		if (props.value?.imgUrl) {
			setFileList([{
				uid: '1',
				url: props.value.imgUrl,
				name: 'image.png'
			}])
		} else {
			setFileList([])
		}
	}, [props.value])

	const beforeUpload = (file: File) => {
		// setLoading(true)
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
		if (!isJpgOrPng) {
			message.error('只允许上传 JPG/PNG/GIF 格式的文件!');
			setLoading(false)
			return
		}
		let isLimit = true
		if (props.limit) {
			isLimit = file.size / 1024 / 1024 < props?.limit!;
			if (!isLimit) {
				message.error('图片大小超出限制');
				setLoading(false)
				return
			}
		}

		if (isJpgOrPng && isLimit) {
			const reader = new FileReader();
			setFileList([{
				uid: '1',
				url: reader.result as string,
				name: file.name
			}
			])
			// fileList.push
			triggerChange({
				imgUrl: reader.result as string,
				file: file
			});
			reader.readAsDataURL(file);
		}
		return false
	}

	const uploadButton = (
		<div>
			{loading ? <RiLoader2Line /> : <RiAddLine />}
			<div style={{ marginTop: 8, fontSize: '12px' }}>上传图片</div>
		</div>
	);
	const [fileList, setFileList] = useState<UploadFile<{ url: string }>[]>([])
	const [previewVisible, setPreviewVisible] = useState(false)

	const onPreview = () => {
		setPreviewVisible(true)
	}


	const onRemove = () => {
		setImageUrl('')
		setFileList([])
		triggerChange({
			imgUrl: '',
			file: undefined
		});
	}
	return (
		<div>
			<Upload
				listType="picture-card"
				beforeUpload={beforeUpload}
				onRemove={onRemove}
				fileList={fileList}
				onPreview={onPreview}
				disabled={props.disabled}
			>
				{imgUrl ? null : uploadButton}
			</Upload>
			<AImage
				style={{ display: 'none' }}
				preview={{
					visible: previewVisible,
					src: imgUrl,
					onVisibleChange: value => {
						setPreviewVisible(value);
					},
				}}
			>
			</AImage>
		</div>


	);
}

export default ImageUpload



