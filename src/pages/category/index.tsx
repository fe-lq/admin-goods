import { ContentCard } from "@/components";
import { Button, Form, Input, Modal, Space, Table, message } from "antd";
import { EditModal } from "./components/edit-modal";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import "./style.less";
import {
  addCategory,
  deleteCategory,
  getCategoryList,
  updateCategory,
} from "@/api/category";
import { Category, FormCategory } from "@/types/category";

type FieldType = {
  typeCode?: string;
  typeName?: string;
};

type EditModalType = React.ComponentProps<typeof EditModal>;

const GoodsCategory: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Category[]>([]);
  const [modalForm, setModalForm] = useState<FormCategory>();
  const [form] = Form.useForm();
  const [modalType, setModalType] = useState<EditModalType["modalType"]>("add");

  const fetchData = async (params?: Category) => {
    const { data } = await getCategoryList(params);
    setData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (values: FormCategory) => {
    try {
      if (modalType === "add") {
        await addCategory(values);
      } else {
        await updateCategory(values);
      }

      fetchData();
      setOpen(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleSearch = () => {
    const values = form.getFieldsValue();
    fetchData(values);
  };

  const handleResetSearch = () => {
    form.resetFields();
    fetchData();
  };

  const handleOpenModal = (
    modalType: EditModalType["modalType"],
    report?: Category,
  ) => {
    if (modalType === "edit") {
      setModalForm(report);
    } else {
      setModalForm(undefined);
    }
    setModalType(modalType);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "确认删除",
      content: "是否确认删除该分类",
      onOk: async () => {
        // 删除操作
        try {
          await deleteCategory({ id });
          fetchData();
          message.success("删除成功");
        } catch (error: any) {
          message.error(error.message);
        }
      },
    });
  };

  const columns: ColumnsType<Category> = [
    {
      title: "分类代码",
      dataIndex: "typeCode",
    },
    {
      title: "分类名称",
      dataIndex: "typeName",
    },
    {
      title: "备注",
      dataIndex: "typeMemo",
    },
    {
      title: "操作",
      render: (_, report) => (
        <Space>
          <Button
            size="small"
            type="primary"
            onClick={() => handleOpenModal("edit", report)}
          >
            编辑
          </Button>
          <Button size="small" danger onClick={() => handleDelete(report.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <ContentCard>
      <Form
        className="search-form"
        layout="inline"
        initialValues={{}}
        form={form}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="分类代码" name="typeCode">
          <Input placeholder="请输入类别代码" />
        </Form.Item>
        <Form.Item<FieldType> label="分类名称" name="typeName">
          <Input placeholder="请输入类别名称" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            <Button onClick={handleResetSearch}>重置</Button>
          </Space>
        </Form.Item>
        <Form.Item className="add-btn">
          <Button type="primary" onClick={() => handleOpenModal("add")}>
            新增
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} rowKey="id" dataSource={data} />
      <EditModal
        open={open}
        modalType={modalType}
        modalForm={modalForm}
        onOK={handleSave}
        onCancel={setOpen}
      />
    </ContentCard>
  );
};

export default GoodsCategory;
