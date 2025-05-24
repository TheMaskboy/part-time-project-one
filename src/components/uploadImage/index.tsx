import { Upload, message, type UploadFile } from 'antd'
import { useEffect, useState } from 'react'
import { Image as AImage } from 'antd'
import { RiAddLine, RiLoader2Line } from 'react-icons/ri'
import UploadList from 'antd/es/upload/UploadList'

type ImageUploadProps = {
  limit?: number
  value?: {
    imgUrl?: string
    file?: File
  }[]
  isSquare?: boolean
  onChange?: (params: { imgUrl?: string; file?: File }[]) => void
  disabled?: boolean
}

const ImageUpload = (props: ImageUploadProps) => {
  const [imgUrl, setImageUrl] = useState<
    {
      imgUrl?: string
      file?: File
    }[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)

  const triggerChange = (changedValue: { imgUrl?: string; file?: File }) => {
    imgUrl.push(changedValue)
    setImageUrl([...imgUrl])
    props.onChange?.(imgUrl)
  }

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
    // setLoading(true)
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif'
    if (!isJpgOrPng) {
      message.error('只允许上传 JPG/PNG/GIF 格式的文件!')
      setLoading(false)
      return
    }
    let isLimit = true
    if (props.limit) {
      isLimit = file.size / 1024 / 1024 < props?.limit!
      if (!isLimit) {
        message.error('照片大小超出限制')
        setLoading(false)
        return
      }
    }

    if (isJpgOrPng && isLimit) {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        let Img = new Image()
        Img.onload = () => {
          fileList.push({
            uid: String(fileList.length + 1),
            url: reader.result as string,
            name: file.name,
          })
          setFileList([...fileList])
          triggerChange({
            imgUrl: reader.result as string,
            file: file,
          })
        }
        Img.src = reader.result as string
      })
      reader.readAsDataURL(file)
    }
    return false
  }

  const uploadButton = (
    <div>
      {loading ? <RiLoader2Line /> : <RiAddLine />}
      <div style={{ marginTop: 8, fontSize: '12px' }}>上传照片</div>
    </div>
  )
  const [fileList, setFileList] = useState<UploadFile<{ url: string }>[]>([])
  const [previewVisible, setPreviewVisible] = useState(false)

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
      {fileList.length <= 4 && (
        <Upload
          listType="picture-card"
          beforeUpload={beforeUpload}
          onRemove={onRemove}
          fileList={fileList}
          onPreview={onPreview}
          maxCount={4}
        >
          {fileList.length <= 4 ? uploadButton : null}
        </Upload>
      )}
    </div>
  )
}

export default ImageUpload
