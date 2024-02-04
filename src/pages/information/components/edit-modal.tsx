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
import { FormGoods } from "@/types/goods";
import { useEffect, useState } from "react";
import { getCategoryList } from "@/api/category";

interface ModalForm {
  modalType: "edit" | "add";
  open: boolean;
  modalForm?: FormGoods;
  onOK: (values: FormGoods) => void;
  onCancel: (value: false) => void;
}

const titleConfig = {
  add: "添加商品",
  edit: "编辑商品",
};

export const EditModal: React.FC<ModalForm> = ({
  modalType,
  open,
  modalForm,
  onOK,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [typeOptions, setTypeOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    const fetchTypes = async () => {
      const { data } = await getCategoryList();
      setTypeOptions(
        data.map((item) => ({ label: item.typeName, value: item.id })),
      );
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    if (open && modalForm) {
      form.setFieldsValue({
        ...modalForm,
        goodsImgs: modalForm.goodsImgs?.map((url, index) => ({
          uid: index,
          name: "image",
          status: "done",
          url,
        })),
      });
    }
  }, [open, modalForm]);

  const handleRemoveFile = async (files: UploadFile<any>) => {
    try {
      await deleteFile({ filePath: files.response.data.filename });
      message.success("删除成功");
    } catch (error) {
      message.error("删除失败");
      return false;
    }
  };

  const handleConfirm = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue(true);
      onOK({
        ...values,
        goodsImgs: values.goodsImgs.map(
          (file: any) => file?.response?.data.path || file.url,
        ),
      });
    } catch (error) {
      /* empty */
    }
  };

  const fileList = Form.useWatch("goodsImgs", form);

  return (
    <Modal
      open={open}
      styles={{ body: { height: 400, overflowY: "auto" } }}
      title={titleConfig[modalType]}
      okText="保存"
      afterClose={() => {
        form.resetFields();
      }}
      onCancel={() => onCancel(false)}
      onOk={handleConfirm}
    >
      <Form
        form={form}
        wrapperCol={{ span: 20 }}
        layout="vertical"
        initialValues={{}}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name="goodsName"
              label="商品名称"
              getValueFromEvent={(e) => e.target.value.trim()}
              rules={[
                { required: true, message: "商品名称必填" },
                { max: 20, min: 1, message: "请输入1-20个字符" },
              ]}
            >
              <Input placeholder="请输入商品名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="goodsPrice"
              label="单价"
              rules={[{ required: true, message: "商品单价必填" }]}
            >
              <InputNumber placeholder="请输入单价" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="goodsType"
              label="类型"
              rules={[{ required: true, message: "商品类型必填" }]}
            >
              <Select placeholder="请选择类型" options={typeOptions} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="goodsAmount"
              label="总数量"
              rules={[{ required: true, message: "商品总数量必填" }]}
            >
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
          label="商品图片"
          rules={[{ required: true, message: "商品图片必填", type: "array" }]}
          getValueFromEvent={normFile}
        >
          <Upload
            name="files"
            action={`${process.env.BASE_URL}files/upload`}
            headers={{
              Authorization: `Bearer ${window.localStorage.rawStorage.getItem(
                "token",
              )}`,
            }}
            multiple
            onRemove={handleRemoveFile}
            listType="picture-card"
          >
            {fileList?.length === 3 ? null : <FileImageOutlined />}
          </Upload>
        </Form.Item>
        <Form.Item name="goodsDesc" wrapperCol={{ span: 22 }} label="描述">
          <Input.TextArea placeholder="请输入描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
