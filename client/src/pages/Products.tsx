import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Typography,
  message,
} from "antd";
import api from "../api/axios";

const { Title } = Typography;

interface Product {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  Quantity: number;
  CreatedAt: string;
}

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [form] = Form.useForm<ProductFormValues>();

  const [messageApi, contextHolder] = message.useMessage();

  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error: any) {
      console.error(error);

      messageApi.error(
        error.response?.data?.message || "Failed to load products",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSubmitProduct = async (values: ProductFormValues) => {
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.Id}`, values);

        messageApi.success("Product updated successfully");
      } else {
        await api.post("/products", values);

        messageApi.success("Product created successfully");
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      form.resetFields();

      getProducts();
    } catch (error: any) {
      console.error(error);

      messageApi.error(
        error.response?.data?.message || "Failed to save product",
      );
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);

      messageApi.success("Product deleted successfully");

      getProducts();
    } catch (error: any) {
      console.error(error);

      messageApi.error(
        error.response?.data?.message || "Failed to delete product",
      );
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      render: (price: number) => `₱${price.toLocaleString()}`,
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Product) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            onClick={() => {
              setEditingProduct(record);

              form.setFieldsValue({
                name: record.Name,
                description: record.Description,
                price: record.Price,
                quantity: record.Quantity,
              });

              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this product?"
            description="This action cannot be undone."
            onConfirm={() => handleDeleteProduct(record.Id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            Products
          </Title>

          <Button
            type="primary"
            onClick={() => {
              setEditingProduct(null);
              form.resetFields();
              setIsModalOpen(true);
            }}
          >
            Add Product
          </Button>
        </div>

        <Table
          rowKey="Id"
          columns={columns}
          dataSource={products}
          loading={loading}
        />
      </Card>

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmitProduct}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter the product name",
              },
            ]}
          >
            <Input placeholder="Product name" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Product description" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please enter the price",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Product price"
            />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please enter the quantity",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Product quantity"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block>
              {editingProduct ? "Update Product" : "Create Product"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Products;
