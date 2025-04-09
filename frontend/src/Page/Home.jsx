import React, { useState } from "react";
import {
  Tabs,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  Card,
  Typography,
  Divider,
} from "antd";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { productList } from "../data";
import Livepreview from "../Components/Livepreview";
import MergedPDFDownload from "../Components/MergedPDFDownload";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

dayjs.extend(customParseFormat);

const { Option } = Select;
const { Title, Text } = Typography;

export default function Home() {
  const dateFormat = "YYYY-MM-DD";

  const [data, setData] = useState({
    from: "Company Name",
    to: "Client Name",
    toLocation: "Bangalore",
    toAddress: "Client Address",
    reference: "ref",
    date: dayjs().format(dateFormat),
    branch: "branch",
    products: [],
    gst: 18,
    shipping: 100,
  });

  const handleFieldChange = (changedFields) => {
    setData((prev) => ({ ...prev, ...changedFields }));
  };

  const handleDateChange = (date, dateString) => {
    setData((prev) => ({ ...prev, date: dateString }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...data.products];
    updatedProducts[index][field] = value;
    setData({ ...data, products: updatedProducts });
  };

  const removeProduct = (index) => {
    const updatedProducts = data.products.filter((_, i) => i !== index);
    setData({ ...data, products: updatedProducts });
  };

  const calculateTotal = () => {
    const productTotal = data.products.reduce(
      (sum, p) => sum + p.price * p.qty,
      0
    );
    const gstAmount = (productTotal * data.gst) / 100;
    return productTotal + gstAmount + Number(data.shipping);
  };

  const items = [
    {
      key: "1",
      label: "Details",
      children: (
        <Form
          layout="vertical"
          initialValues={data}
          onValuesChange={(_, allValues) => handleFieldChange(allValues)}
        >
          <Form.Item name="to" label="To Name">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="toLocation" label="To Location">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="toAddress" label="To Address">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="reference" label="Reference">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker
              value={dayjs(data.date, dateFormat)}
              format={dateFormat}
              onChange={handleDateChange}
              size="large"
              className="w-full"
            />
          </Form.Item>
          <Form.Item name="branch" label="Branch">
            <Input size="large" />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Add Products",
      children: (
        <>
          <Form layout="vertical">
            <Form.Item label="Select Products">
              <Select
                mode="multiple"
                placeholder="Search or type to add products"
                onChange={(values) => {
                  const newProducts = values.map((val) => {
                    const selected = productList.find((p) => p.id === val);
                    return { ...selected, qty: 1 };
                  });
                  setData({ ...data, products: newProducts });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !data.products.length) {
                    e.preventDefault();
                    toast.error("Please select a product from the list");
                  }
                }}
                value={data.products.map((p) => p.id || p.name)}
                tokenSeparators={[","]}
                size="large"
                options={productList.map((p) => ({
                  label: `${p.name} - ${p.model}`,
                  value: p.id,
                }))}
              />
            </Form.Item>
          </Form>

          {data.products.map((product, index) => (
            <Card
              key={index}
              className="mb-4"
              bordered
              title={`${product.name} - ${product.model}`}
              extra={
                <Button danger onClick={() => removeProduct(index)}>
                  Remove
                </Button>
              }
            >
              <div className="grid grid-cols-3 gap-4 items-center">
                <Form.Item label="Price">
                  <InputNumber
                    min={0}
                    value={product.price}
                    readOnly
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item label="Quantity">
                  <InputNumber
                    min={1}
                    value={product.qty}
                    onChange={(value) =>
                      handleProductChange(index, "qty", value)
                    }
                    className="w-full"
                  />
                </Form.Item>
                {product.id && (
                  <img
                    src={`/products/${product.id}.png`}
                    alt={product.name}
                    className="h-20 object-contain"
                  />
                )}
              </div>
            </Card>
          ))}
        </>
      ),
    },
    {
      key: "3",
      label: "Summary",
      children: (
        <div className="space-y-4">
          <Title level={4}>Quote Summary</Title>
          <Divider />
          <Text className="text-2xl font-medium">
            Total Cost: ₹{calculateTotal()}
          </Text>
          <Divider />
          <MergedPDFDownload data={data} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-[40%] bg-white p-6 rounded-xl shadow-md">
            <Tabs defaultActiveKey="1" items={items} />
          </div>
          <div className="lg:w-[60%] bg-white p-6 rounded-xl shadow-md border">
            <Livepreview data={data} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
