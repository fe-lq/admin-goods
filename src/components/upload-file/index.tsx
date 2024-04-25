import { deleteFile } from "@/api/common";
import { FileImageOutlined } from "@ant-design/icons";
import { Upload, UploadFile, message, Image, UploadProps, GetProp } from "antd";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface Props {
  /**
   * 文件数据
   */
  fileList?: UploadFile[];
  /**
   * 是否支持多文件上传
   */
  multiple?: boolean;
  /**
   * 最大上传数量
   */
  maxCount?: number;
  /**
   * 上传时的回调函数
   * @param fileList 上传的文件
   */
  onChange?: (fileList: UploadFile[]) => void;
}
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

/**
 * @author fe-lq
 * 上传文件组件
 */
export const UploadForm: React.FC<Props> = ({
  fileList,
  multiple,
  maxCount = 1,
  onChange,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();

  // 预览文件
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // 上传文件
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    onChange?.(newFileList);

  // 删除文件
  const handleRemoveFile = async (files: UploadFile<any>) => {
    try {
      await deleteFile({ filePath: files.response.data.path });
      message.success("删除成功");
    } catch (error) {
      message.error("删除失败");
      return false;
    }
  };

  return (
    <>
      <Upload
        name="files"
        listType="picture-card"
        action={`${process.env.BASE_URL}files/upload`}
        headers={{
          Authorization: `Bearer ${window.localStorage.rawStorage.getItem("token")}`,
        }}
        fileList={fileList}
        multiple={multiple}
        onRemove={handleRemoveFile}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList?.length === maxCount ? null : <FileImageOutlined />}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) =>
              !visible && setPreviewImage(undefined),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
