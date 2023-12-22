import { FileImageOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Switch,
  Upload,
  UploadFile,
  message,
} from "antd";
import "./style.less";
import { deleteFile } from "@/api/common";

interface FormValues {
  goodsName: string;
  goodsPrice: number;
  goodsOnSale: boolean;
  goodsType: number;
  goodsAmount: number;
  goodsDesc: string;
  goodsImgs: string[];
}

interface ModalForm {
  modalType: "edit" | "add";
  open: boolean;
  onOK: (values: FormValues) => void;
  onCancel: () => void;
}

const titleConfig = {
  add: "添加商品",
  edit: "编辑商品",
};

export const EditModal: React.FC<ModalForm> = ({
  modalType,
  open,
  onOK,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleRemoveFile = async (files: UploadFile<any>) => {
    console.log(files);
    try {
      await deleteFile({ filePath: files.response.data.filepath });
      message.success("删除成功");
    } catch (error) {
      message.error("删除失败");
      return false;
    }
  };

  return (
    <Modal
      open={open}
      styles={{ body: { height: 400, overflowY: "auto" } }}
      title={titleConfig[modalType]}
      okText="保存"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onOK(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        wrapperCol={{ span: 20 }}
        layout="vertical"
        initialValues={{}}
      >
        <Row>
          <Col span={12}>
            <Form.Item name="goodsName" label="商品名称">
              <Input placeholder="请输入商品名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="goodsPrice" label="单价">
              <InputNumber placeholder="请输入单价" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="goodsType" label="类型">
              <Select
                placeholder="请选择类型"
                options={[
                  { label: "分类一", value: 1 },
                  { label: "分类二", value: 2 },
                  { label: "分类三", value: 3 },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="goodsAmount" label="总数量">
              <InputNumber placeholder="请输入总量" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="goodsOnSale" valuePropName="checked" label="是否上架">
          <Switch />
        </Form.Item>

        <Form.Item
          name="goodsImgs"
          valuePropName="fileList"
          wrapperCol={{ span: 10 }}
          label="商品图片"
          getValueFromEvent={normFile}
        >
          <Upload.Dragger
            name="files"
            action={`${process.env.BASE_URL}files/upload`}
            multiple
            onRemove={handleRemoveFile}
            listType="picture"
          >
            <div>
              <FileImageOutlined />
            </div>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item name="goodsDesc" wrapperCol={{ span: 22 }} label="描述">
          <Input.TextArea placeholder="请输入描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
