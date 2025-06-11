import { Upload, message, type UploadFile } from 'antd'
import { useEffect, useState } from 'react'
import { RiAddLine, RiLoader2Line } from 'react-icons/ri'
import { isFileOversized } from '../../utils/function'
import { apiPostUploadImage } from '../../api/project'

type ImageUploadProps = {
  limit?: number
  value?: string
  isSquare?: boolean
  onChange?: (imgUrl: string) => void
  disabled?: boolean
  limitSize?: number
  name?: string
}

const ImageUpload = (props: ImageUploadProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [fileList, setFileList] = useState<UploadFile<{ url: string }>[]>([])

  useEffect(() => {
    const result: any = []
    if (props.value && props.value.length > 0) {
      props.value.split(",").forEach((item, index) => {
        result.push({
          uid: index,
          url: item,
          name: 'image.png',
        })
      })
      setFileList(result)
    } else {
      setFileList([])
    }
  }, [props.value])

  const beforeUpload = (file: File) => {
    return file
  };

  const uploadButton = (
    <div>
      {loading ? <RiLoader2Line /> : <RiAddLine />}
      <div style={{ marginTop: 8, fontSize: '12px' }}>{props?.name || '上传照片'}</div>
    </div>
  )

  const handleCustomFileChange = async ({ file }: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传JPG/PNG格式');
      return false
    }
    if (isFileOversized(file, (props.limitSize || 2))) {
      message.warning(`上传文件大小不能超过${(props.limitSize || 2)}M,请检查后重新上传`, 3);
      return false;
    }
    if (file) {
      const formData: any = new FormData();
      formData.append('file', file);
      setLoading(true)
      apiPostUploadImage(formData).then(res => {
        fileList.push({
          name: file.name,
          url: res,
          uid: file.uid
        })
        setFileList([...fileList])
        props.onChange?.(fileList.map(item => item.url).join(","))
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  const onRemove = (e: any) => {
    const index = fileList.findIndex((item) => item.url === e.url)
    fileList.splice(index, 1)
    props.onChange?.(fileList.map(item => item.url).join(","))
    setFileList([...fileList])
  }
  return (
    <div>
      {fileList.length <= (props.limit || 1) && (
        <Upload
          listType="picture-card"
          beforeUpload={beforeUpload}
          customRequest={handleCustomFileChange}
          onRemove={onRemove}
          fileList={fileList}
          maxCount={(props.limit || 1)}
        >
          {fileList.length < (props.limit || 1) ? uploadButton : null}
        </Upload>
      )}
    </div>
  )
}

export default ImageUpload
