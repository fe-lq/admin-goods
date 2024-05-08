import { ContentCard } from "@/components";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  message,
  Image,
} from "antd";
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
import { Category, FormCategory, FilterParams } from "@/types/category";
import { useAppDispatch } from "@/hooks/store";

type EditModalType = React.ComponentProps<typeof EditModal>;

const GoodsCategory: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Category[]>([]);
  const [modalForm, setModalForm] = useState<FormCategory>();
  const [form] = Form.useForm<FilterParams>();
  const [modalType, setModalType] = useState<EditModalType["modalType"]>("add");
  const dispatch = useAppDispatch();

  const fetchData = async (params?: FilterParams) => {
    const { data } = await getCategoryList(params);
    setData(data);

    dispatch({ type: "goods/setTypeList", payload: data });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (values: Category) => {
    try {
      if (modalType === "add") {
        await addCategory(values);
      } else {
        await updateCategory(values);
      }
      message.success("保存成功");
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

  const handleOpenModal = (report?: Category) => {
    if (report) {
      setModalForm({
        ...report,
        typeImgs: [
          {
            uid: 1,
            // 根据地址取文件名
            name: report.typeImg?.split("/").pop(),
            status: "done",
            url: report.typeImg,
          },
        ],
      });
      setModalType("edit");
    } else {
      setModalForm(undefined);
      setModalType("add");
    }
    setOpen(true);
  };

  const fetchDeleteType = async (category: Category) => {
    try {
      await deleteCategory({ id: category.id });
      message.success("删除成功");
      fetchData();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleDelete = async (category: Category) => {
    Modal.confirm({
      title: "提示",
      content: "是否确认删除该分类",
      onOk: () => {
        fetchDeleteType(category);
      },
    });
  };

  const columns: ColumnsType<Category> = [
    {
      title: "分类名称",
      dataIndex: "typeName",
    },
    {
      title: "分类图标",
      dataIndex: "typeImg",
      render: (typeImg) => (
        <Image src={typeImg} width={25} height={25} preview={false} />
      ),
    },
    {
      title: "父级分类",
      dataIndex: "typeParentName",
    },
    {
      title: "状态",
      dataIndex: "typeEnable",
      render: (typeEnable) =>
        typeEnable ? (
          <Tag color="success">启用</Tag>
        ) : (
          <Tag color="error">禁用</Tag>
        ),
    },
    {
      title: "操作",
      render: (_, report) => (
        <Space>
          <Button
            size="small"
            type="primary"
            onClick={() => handleOpenModal(report)}
          >
            编辑
          </Button>
          <Button size="small" danger onClick={() => handleDelete(report)}>
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
        <Form.Item label="分类名称" name="typeName">
          <Input placeholder="请输入类别名称" allowClear />
        </Form.Item>
        <Form.Item label="分类状态" name="typeEnable">
          <Select
            placeholder="请选择分类状态"
            allowClear
            options={[
              { label: "启用", value: true },
              { label: "禁用", value: false },
            ]}
          />
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
          <Button type="primary" onClick={() => handleOpenModal()}>
            新增
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        expandable={{ showExpandColumn: false }}
        rowKey="id"
        dataSource={data}
      />
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
