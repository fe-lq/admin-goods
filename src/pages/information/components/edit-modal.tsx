import {
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Switch,
} from "antd";
import "./style.less";
import { FormGoods } from "@/types/goods";
import { useEffect } from "react";
import { useAppSelector, useComputedSelector } from "@/hooks/store";
import { UploadForm } from "@/components";

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

const initialValues = {
  goodsOnSale: true,
};

export const EditModal: React.FC<ModalForm> = ({
  modalType,
  open,
  modalForm,
  onOK,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const userInfo = useAppSelector((store) => store.base.userInfo);
  const categoryList = useComputedSelector(
    (state) => state.goods.categoryList,
    // 过滤掉父级分类，商品只能绑定二级分类
    (categoryList) => categoryList.filter((item) => item.typeParentId),
  );

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    if (open && modalForm) {
      form.setFieldsValue({
        ...modalForm,
        goodsImgs: modalForm.goodsImgs?.map((url, index) => ({
          uid: index,
          // 根据地址取文件名
          name: url.split("/").pop(),
          status: "done",
          url,
        })),
      });
    }
  }, [open, modalForm]);

  const handleConfirm = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue(true);
      onOK({
        goodsUser: userInfo.userName,
        goodsUserId: userInfo.userId,
        ...values,
        goodsImgs: values.goodsImgs.map(
          (file: any) => file?.response?.data.path ?? file.url,
        ),
      });
    } catch (error) {
      /* empty */
    }
  };

  return (
    <Modal
      open={open}
      styles={{ body: { height: 400, overflowY: "auto" } }}
      width={700}
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
        wrapperCol={{ span: 18 }}
        labelCol={{ span: 6 }}
        initialValues={initialValues}
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
              name="goodsCostPrice"
              label="成本价"
              rules={[{ required: true, message: "成本价必填" }]}
            >
              <InputNumber placeholder="请输入成本价" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="goodsPrice"
              label="当前售价"
              rules={[{ required: true, message: "商品单价必填" }]}
            >
              <InputNumber placeholder="请输入单价" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="goodsMarkPrice"
              label="市场价"
              rules={[{ required: true, message: "商品市场价必填" }]}
            >
              <InputNumber placeholder="请输入市场价" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="goodsTypeId"
              label="类型"
              rules={[{ required: true, message: "商品类型必填" }]}
            >
              <Select
                placeholder="请选择类型"
                fieldNames={{ label: "typeName", value: "id" }}
                options={categoryList}
              />
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
        <Row>
          <Col span={12}>
            <Form.Item
              name="goodsOnSale"
              valuePropName="checked"
              label="是否上架"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 3 }}
              name="goodsImgs"
              valuePropName="fileList"
              label="商品图片"
              rules={[
                { required: true, message: "商品图片必填", type: "array" },
              ]}
              getValueFromEvent={normFile}
            >
              <UploadForm multiple maxCount={3} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="goodsDesc" wrapperCol={{ span: 22 }} label="描述">
              <Input.TextArea placeholder="请输入描述" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
