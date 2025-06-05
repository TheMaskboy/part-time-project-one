import { Upload, message, type UploadFile, type UploadProps } from 'antd'
import { useEffect, useState } from 'react'
import { RiAddLine, RiLoader2Line } from 'react-icons/ri'
import { isFileOversized } from '../../utils/function'

type ImageUploadProps = {
  limit?: number
  value?: {
    imgUrl?: string
    file?: File
  }[]
  isSquare?: boolean
  onChange?: (params: { imgUrl?: string; file?: File }[]) => void
  disabled?: boolean
  limitSize?: number
}

const ImageUpload = (props: ImageUploadProps) => {
  const [imgUrl, setImageUrl] = useState<
    {
      imgUrl?: string
      file?: File
    }[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setImageUrl(props.value ?? [])
    const result = []
    if (props.value && props.value.length > 0) {
      props.value.forEach((item, index) => {
        result.push({
          uid: index,
          url: item.imgUrl,
          name: 'image.png',
        })
      })
    } else {
      setFileList([])
    }
  }, [props.value])

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return false
    }
    if (props.limitSize && isFileOversized(file, props.limitSize)) {
      message.warning(`上传文件大小不能超过${props.limitSize}M,请检查后重新上传`, 3);
      return false;
    }
  };

  const uploadButton = (
    <div>
      {loading ? <RiLoader2Line /> : <RiAddLine />}
      <div style={{ marginTop: 8, fontSize: '12px' }}>上传照片</div>
    </div>
  )
  const [fileList, setFileList] = useState<UploadFile<{ url: string }>[]>([])
  const [_, setPreviewVisible] = useState(false)

  const onPreview = () => {
    setPreviewVisible(true)
  }

  const onRemove = (e: any) => {
    const index = fileList.findIndex((item) => item.url === e.url)
    fileList.splice(index, 1)
    setFileList([...fileList])
    const secondIndex = imgUrl.findIndex((item) => item.imgUrl === e.url)
    imgUrl.splice(secondIndex, 1)
    setImageUrl([...imgUrl])
    props.onChange?.([...imgUrl])
  }
  return (
    <div>
      {fileList.length <= (props.limit || 1) && (
        <Upload
          listType="picture-card"
          name='file'
          headers={{
            Authorization: localStorage.getItem("auth_token") || "",
          }}
          beforeUpload={beforeUpload}
          // customRequest={handleCustomFileChange}
          action="/api/upload"
          onRemove={onRemove}
          fileList={fileList}
          onPreview={onPreview}
          maxCount={(props.limit || 1)}
        >
          {fileList.length <= 4 ? uploadButton : null}
        </Upload>
      )}
    </div>
  )
}

export default ImageUpload
