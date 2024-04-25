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
} from "antd";
import type { ColumnsType } from "antd/es/table";
import "./style.less";
import { EditModal } from "./components/edit-modal";
import { useEffect, useState } from "react";
import {
  createGoods,
  deleteGoods,
  getGoodsList,
  updateGoods,
} from "@/api/goods";
import { FormGoods, Goods } from "@/types/goods";
import { getCategoryList } from "@/api/category";
import { useAppDispatch, useComputedSelector } from "@/hooks/store";

type FieldType = {
  goodsName?: string;
  goodsOnSale?: boolean;
  goodsTypeId?: number;
};

type EditModalType = React.ComponentProps<typeof EditModal>;

const GoodsInformation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Goods[]>([]);
  const [modalForm, setModalForm] = useState<FormGoods>();
  const [form] = Form.useForm();
  const [modalType, setModalType] = useState<EditModalType["modalType"]>("add");
  const dispatch = useAppDispatch();

  const categoryList = useComputedSelector(
    (state) => state.goods.categoryList,
    // 过滤掉父级分类，商品只能绑定二级分类
    (categoryList) => categoryList.filter((item) => item.typeParentId),
  );

  const fetchData = async (params?: Goods) => {
    const { data } = await getGoodsList(params);
    setData(data);
  };

  const fetchCategories = async () => {
    const { data } = await getCategoryList();
    dispatch({ type: "goods/setTypeList", payload: data });
  };

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, []);

  // 保存
  const handleSave = async (values: FormGoods) => {
    try {
      if (modalType === "add") {
        await createGoods(values);
      } else {
        await updateGoods(values);
      }
      message.success("保存成功");
      fetchData();
      setOpen(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  // 查询，重置
  const handleSearch = (type: "search" | "reset") => {
    if (type === "search") {
      const values = form.getFieldsValue();
      fetchData(values);
    } else {
      form.resetFields();
      fetchData();
    }
  };

  const handleOpenModal = (
    modalType: EditModalType["modalType"],
    report?: Goods,
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
        try {
          await deleteGoods({ id });
          fetchData();
          message.success("删除成功");
        } catch (error: any) {
          message.error(error.message);
        }
      },
    });
  };

  const columns: ColumnsType<Goods> = [
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
      dataIndex: "goodsTypeName",
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
        form={form}
        className="search-form"
        layout="inline"
        initialValues={{}}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="名称" name="goodsName">
          <Input placeholder="请输入花名" allowClear />
        </Form.Item>

        <Form.Item<FieldType> label="状态" name="goodsOnSale">
          <Select
            placeholder="请选择上线状态"
            allowClear
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
        <Form.Item<FieldType> label="类型" name="goodsTypeId">
          <Select
            placeholder="请选择类型"
            allowClear
            fieldNames={{ label: "typeName", value: "id" }}
            options={categoryList}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" onClick={() => handleSearch("search")}>
              查询
            </Button>
            <Button onClick={() => handleSearch("reset")}>重置</Button>
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

export default GoodsInformation;
