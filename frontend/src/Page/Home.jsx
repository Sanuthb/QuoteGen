import React, { useState } from "react";
import {
  Tabs,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
} from "antd";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import QuotePDF from "../QuotePDF";
import Livepreview from "../Components/Livepreview";
import MergedPDFDownload from "../Components/MergedPDFDownload";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { productList } from "../data";
import { toast } from "react-toastify";

dayjs.extend(customParseFormat);

const { Option } = Select;

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
          layout="veritcal"
          initialValues={data}
          onValuesChange={(_, allValues) => handleFieldChange(allValues)}
        >
          <Form.Item name="to" label="To Name">
            <Input />
          </Form.Item>
          <Form.Item name="toLocation" label="To Location">
            <Input />
          </Form.Item>
          <Form.Item name="toAddress" label="To Address">
            <Input />
          </Form.Item>
          <Form.Item name="reference" label="Reference">
            <Input />
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker
              value={dayjs(data.date, dateFormat)}
              format={dateFormat}
              onChange={handleDateChange}
            />
          </Form.Item>
          <Form.Item name="branch" label="Branch">
            <Input />
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
                  //   return selected
                  //     ? { ...selected, qty: 1 }
                  //     : { name: val, model: "-", price: 0, qty: 1, image: "" };
                  // });
                  setData({ ...data, products: newProducts });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !data.products.length) {
                    e.preventDefault(); // Prevent form submission or dropdown closing
                    toast.error("Please select a product from the list");
                  }
                }}
                value={data.products.map((p) => p.id || p.name)}
                tokenSeparators={[","]}
                options={productList.map((p) => ({
                  label: `${p.name} - ${p.model}`,
                  value: p.id,
                }))}
              />
            </Form.Item>
          </Form>

          {data.products.map((product, index) => (
            <div
              key={index}
              className="border p-4 mb-4 rounded-md bg-white shadow-sm"
            >
              <Form style={{ }}>
                <div className="flex items-center justify-between">
                  <Form.Item label="Price">
                    <InputNumber
                      min={0}
                      className="w-full"
                      value={product.price}
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item label="Quantity">
                    <InputNumber
                      min={1}
                      className="w-full"
                      value={product.qty}
                      onChange={(value) =>
                        handleProductChange(index, "qty", value)
                      }
                    />
                  </Form.Item>
                  {product.id && (
                    <img
                      src={`/products/${product.id}.png`}
                      alt={product.name}
                      className="h-20"
                    />
                  )}
                </div>
                <Button danger onClick={() => removeProduct(index)}>
                  Remove Product
                </Button>
              </Form>
            </div>
          ))}
        </>
      ),
    },
    {
      key: "3",
      label: "Summary",
      children: (
        <div>
          <h2 className="text-xl font-bold mb-4">Quote Summary</h2>
          <p className="text-lg font-semibold">
            Total Cost: ₹{calculateTotal()}
          </p>

          <MergedPDFDownload data={data} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex ">
      <div className="w-[40%] p-6">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
      <div className="w-2/3 p-6 border-l">
        <Livepreview data={data} />
      </div>
    </div>
  );
}
