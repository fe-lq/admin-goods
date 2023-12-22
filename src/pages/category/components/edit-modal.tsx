import { Form, Input, Modal } from "antd";

interface FormValues {
  typeCode: string;
  typeName: string;
  typeMemo: string;
}

interface ModalForm {
  modalType: "edit" | "add";
  open: boolean;
  onOK: (values: FormValues) => void;
  onCancel: () => void;
}

const titleConfig = {
  add: "添加分类",
  edit: "编辑分类",
};

export const EditModal: React.FC<ModalForm> = ({
  modalType,
  open,
  onOK,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
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
      <Form form={form} labelCol={{ span: 4 }} initialValues={{}}>
        <Form.Item name="typeCode" label="分类代码">
          <Input placeholder="分类代码自动生成" disabled />
        </Form.Item>
        <Form.Item name="typeName" label="分类名称">
          <Input placeholder="请输入商品名称" />
        </Form.Item>
        <Form.Item name="typeMemo" label="备注">
          <Input.TextArea placeholder="请输入描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
