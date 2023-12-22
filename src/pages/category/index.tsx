import { ContentCard } from "@/components";
import { Button, Form, Input, Space, Table } from "antd";
import { EditModal } from "./components/edit-modal";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import "./style.less";

type FieldType = {
  typeCode?: string;
  typeName?: string;
};
interface DataType {
  key: string;
  typeCode: string;
  typeName: string;
  typeMemo: string;
}

type EditModalType = React.ComponentProps<typeof EditModal>;

const GoodsCategory: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<EditModalType["modalType"]>("add");
  const handleSave = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  const columns: ColumnsType<DataType> = [
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
      render: () => (
        <Space>
          <Button size="small" type="primary">
            编辑
          </Button>
          <Button size="small" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      typeCode: "1000",
      typeName: "分类1",
      typeMemo: "",
    },
    {
      key: "2",
      typeCode: "1001",
      typeName: "分类1",
      typeMemo: "",
    },
    {
      key: "3",
      typeCode: "1002",
      typeName: "分类1",
      typeMemo: "",
    },
  ];

  return (
    <ContentCard>
      <Form
        className="search-form"
        layout="inline"
        initialValues={{}}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="分类代码" name="typeCode">
          <Input placeholder="请输入类别代码" />
        </Form.Item>
        <Form.Item<FieldType> label="分类名称" name="typeName">
          <Input placeholder="请输入类别名称" />
        </Form.Item>

        <Form.Item>
          <Button type="primary">查询</Button>
        </Form.Item>
        <Form.Item className="add-btn">
          <Button
            type="primary"
            onClick={() => {
              setModalType("add");
              setOpen(true);
            }}
          >
            新增
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} />
      <EditModal
        open={open}
        modalType={modalType}
        onOK={handleSave}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </ContentCard>
  );
};

export default GoodsCategory;
