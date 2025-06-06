import { Upload, message, type UploadFile } from 'antd'
import { useEffect, useState } from 'react'
import { RiAddLine, RiLoader2Line } from 'react-icons/ri'

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
  const [_, setImageUrl] = useState<
    {
      imgUrl?: string
      file?: File
    }[]
  >([])
  const [loading] = useState<boolean>(false)

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
    return file
  };

  const uploadButton = (
    <div>
      {loading ? <RiLoader2Line /> : <RiAddLine />}
      <div style={{ marginTop: 8, fontSize: '12px' }}>上传照片</div>
    </div>
  )
  const [fileList, setFileList] = useState<UploadFile<{ url: string }>[]>([])

  const handleChange = (info: any) => {
    console.log(info.file)
    if (info.file.status === 'done') {
      // 从响应中获取文件链接
      if(info.file.response.code !== 200) {
        message.error(info.file.response.msg)
        return
      }
      const fileUrl = info.file.response.data; // 根据你的API响应结构调整
      // message.success(`${info.file.name} 文件上传成功`);
      fileList.push({
        uid: fileUrl,
        url: fileUrl,
        name: info.file.name
      })
      let result: any = []
      fileList.forEach(() => {
        result.push({ imgUrl: fileUrl })
      })
      props.onChange?.(result)
    }
  };

  // const handleCustomFileChange = async ({ file }: any) => {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     message.error('请上传JPG/PNG格式');
  //     return false
  //   }
  //   if (props.limitSize && isFileOversized(file, props.limitSize)) {
  //     message.warning(`上传文件大小不能超过${props.limitSize}M,请检查后重新上传`, 3);
  //     return false;
  //   }
  //   if (file) {
  //     const formData: any = new FormData();
  //     formData.append('file', file);
  //     apiPostUploadImage(formData).then(res => {
  //       console.log(res)
  //     })
  //   }
  // }

  const onRemove = (e: any) => {
    console.log(123)
    const index = fileList.findIndex((item) => item.url === e.url)
    fileList.splice(index, 1)
    setFileList([...fileList])
    // const secondIndex = imgUrl.findIndex((item) => item.imgUrl === e.url)
    // imgUrl.splice(secondIndex, 1)
    // setImageUrl([...imgUrl])
    // props.onChange?.([...imgUrl])
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
          onChange={handleChange}
          // fileList={fileList}
          // onPreview={onPreview}
          maxCount={(props.limit || 1)}
        >
          {fileList.length <= (props.limit || 1) ? uploadButton : null}
        </Upload>
      )}
    </div>
  )
}

export default ImageUpload
