import { FormCategory } from "@/types/category";
import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

interface ModalForm {
  modalType: "edit" | "add";
  open: boolean;
  modalForm?: FormCategory;
  onOK: (values: FormCategory) => void;
  onCancel: (value: false) => void;
}

const titleConfig = {
  add: "添加分类",
  edit: "编辑分类",
};

export const EditModal: React.FC<ModalForm> = ({
  modalType,
  open,
  modalForm,
  onOK,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && modalForm) {
      form.setFieldsValue(modalForm);
    }
  }, [open, modalForm]);

  const handleConfirm = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue(true);
      onOK(values);
    } catch (error) {
      /* empty */
    }
  };

  return (
    <Modal
      open={open}
      title={titleConfig[modalType]}
      okText="保存"
      onCancel={() => onCancel(false)}
      afterClose={() => form.resetFields()}
      onOk={handleConfirm}
    >
      <Form form={form} labelCol={{ span: 4 }} initialValues={{}}>
        <Form.Item
          name="typeCode"
          label="分类代码"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "分类代码必填",
            },
            {
              max: 4,
              min: 4,
              message: "请输入4位数字用做代码",
              validator: (_, value, callback) => {
                if (value && !/^\d{4}$/.test(value)) {
                  callback("请输入4位数字用做代码");
                } else {
                  callback();
                }
              },
            },
          ]}
        >
          <Input placeholder="请输入分类代码" />
        </Form.Item>
        <Form.Item
          name="typeName"
          label="分类名称"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: "分类名称必填" },
            { max: 6, min: 1, message: "请输入1-6位字符" },
          ]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
        <Form.Item name="typeMemo" label="备注">
          <Input.TextArea placeholder="请输入描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
