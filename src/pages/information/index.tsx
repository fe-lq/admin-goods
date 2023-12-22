import { ContentCard } from "@/components";
import { Button, Form, Input, Select, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./style.less";
import { EditModal } from "./components/edit-modal";
import { useState } from "react";

type FieldType = {
  goodsName?: string;
  goodsOnSale?: boolean;
  goodsType?: number;
};

interface DataType {
  key: string;
  goodsName: string;
  goodsPrice: number;
  goodsAmount: number;
  goodsType: number;
  goodsOnSale: boolean;
  goodsDesc: string;
  goodsSellCount: number;
}

type EditModalType = React.ComponentProps<typeof EditModal>;

const GoodsInformation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<EditModalType["modalType"]>("add");

  const handleSave = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "名称",
      dataIndex: "goodsName",
    },
    {
      title: "单价",
      dataIndex: "goodsPrice",
    },
    {
      title: "状态",
      dataIndex: "goodsOnSale",
      render: (_, record) => (
        <Tag
          color={record.goodsOnSale ? "success" : "error"}
          key={record.goodsName}
        >
          {record.goodsOnSale ? "已上架" : "已下架"}
        </Tag>
      ),
    },
    {
      title: "类型",
      dataIndex: "goodsType",
    },
    {
      title: "已售数量",
      dataIndex: "goodsSellCount",
    },
    {
      title: "总量",
      dataIndex: "goodsAmount",
    },
    {
      title: "描述",
      dataIndex: "goodsDesc",
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
      goodsName: "红玫瑰",
      goodsPrice: 32,
      goodsOnSale: true,
      goodsType: 0,
      goodsSellCount: 10,
      goodsAmount: 100,
      goodsDesc: "好看的",
    },
    {
      key: "2",
      goodsName: "向日葵",
      goodsPrice: 10,
      goodsOnSale: false,
      goodsType: 2,
      goodsSellCount: 3,
      goodsAmount: 20,
      goodsDesc: "太阳",
    },
    {
      key: "3",
      goodsName: "月季",
      goodsPrice: 18,
      goodsOnSale: true,
      goodsType: 1,
      goodsSellCount: 24,
      goodsAmount: 50,
      goodsDesc: "好种的",
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
        <Form.Item<FieldType> label="名称" name="goodsName">
          <Input placeholder="请输入花名" />
        </Form.Item>

        <Form.Item<FieldType> label="状态" name="goodsOnSale">
          <Select
            placeholder="请选择上线状态"
            options={[
              {
                label: "已上架",
                value: true,
              },
              {
                label: "已下架",
                value: false,
              },
            ]}
          />
        </Form.Item>
        <Form.Item<FieldType> label="类型" name="goodsType">
          <Select
            placeholder="请选择类型"
            options={[
              {
                label: "花1",
                value: 0,
              },
              {
                label: "花2",
                value: 1,
              },
              {
                label: "花3",
                value: 3,
              },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
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

export default GoodsInformation;
