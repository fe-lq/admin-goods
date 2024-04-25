import { Category, FormCategory } from "@/types/category";
import { Checkbox, Form, Input, Modal, Select } from "antd";
import { useEffect, useMemo } from "react";
import { omit } from "lodash-es";
import { useComputedSelector } from "@/hooks/store";
import { UploadForm } from "@/components";

interface ModalForm {
  modalType: "edit" | "add";
  open: boolean;
  modalForm?: FormCategory;
  onOK: (values: Category) => void;
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
  const [form] = Form.useForm<FormCategory>();
  const categoryList = useComputedSelector(
    (state) => state.goods.categoryList,
    (categoryList) => categoryList.filter((item) => !item.typeParentId),
  );

  const options = useMemo(() => {
    if (modalType === "edit") {
      // 编辑时，父级分类不能选择自己
      return categoryList.filter((item) => item.id !== modalForm?.id);
    }
    return categoryList;
  }, [categoryList]);

  useEffect(() => {
    if (open && modalForm) {
      form.setFieldsValue(modalForm);
    }
  }, [open, modalForm]);

  const handleConfirm = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue(true);
      onOK({
        ...omit(values, ["typeImgs", "children"]),
        // 取上传成功后返回的地址存储
        typeImg: values.typeImgs.map(
          (item: any) => item.response?.data.path ?? item.url,
        )[0],
      } as Category);
    } catch (error) {
      // empty
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
      <Form
        form={form}
        labelCol={{ span: 5 }}
        initialValues={{ typeEnable: true }}
      >
        <Form.Item name="typeParentId" label="分类父级">
          <Select
            placeholder="请选择父级分类"
            fieldNames={{ label: "typeName", value: "id" }}
            options={options}
          />
        </Form.Item>
        <Form.Item
          name="typeName"
          label="分类名称"
          validateTrigger="onBlur"
          tooltip="分类父级为空时当前新增项属于一级分类"
          rules={[
            { required: true, message: "分类名称必填" },
            { max: 6, min: 1, message: "请输入1-6位字符" },
          ]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
        <Form.Item label="分类状态" name="typeEnable" valuePropName="checked">
          <Checkbox>是否启用</Checkbox>
        </Form.Item>
        {/* 分类图标只能上传一个 */}
        <Form.Item
          name="typeImgs"
          valuePropName="fileList"
          label="分类图标"
          rules={[{ required: true, message: "分类图标必填", type: "array" }]}
          getValueFromEvent={normFile}
        >
          <UploadForm />
        </Form.Item>
      </Form>
    </Modal>
  );
};
