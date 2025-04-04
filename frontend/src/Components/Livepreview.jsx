import React from "react";

const Livepreview = ({ data }) => {
  return (
    <div className="w-full border p-4">
      <h2 className="text-xl font-bold mb-4">Live Preview</h2>

      <div className="bg-gray-200 p-4 text-center">
        <h2 className="text-2xl font-bold">Quotation</h2>
        <img src="/quoteheader.jpg" alt="Header" className="w-full h-full object-cover" />

        <div className="flex text-sm mt-2 w-full">
          {/* Left Section */}
          <div className="flex flex-1">
            <div className="px-1 border-[.1rem] border-black">
              <h1>To.</h1>
            </div>
            <div className="w-full">
              <div className="px-1 border-[.1rem] border-l-0 border-b-0 border-black">
                {data.to}
              </div>
              <div className="px-1 border-[.1rem] border-l-0 border-b-0 border-black">
                {data.toLocation}
              </div>
              <div className="px-1 border-[.1rem] border-l-0 border-black">
                {data.toAddress}
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="bg-white flex flex-1 items-center justify-center border-[.1rem] border-black">
            <img src="/logo1.png" alt="Logo 1" className="h-10 w-auto mx-1" />
            <img src="/logo3.png" alt="Logo 3" className="h-10 w-auto mx-1" />
            <img src="/logo2.png" alt="Logo 2" className="h-10 w-auto mx-1" />
          </div>

          {/* Right Section */}
          <div className="flex flex-1">
            <div>
              <div className="px-1 border-[.1rem] border-b-0 border-black">Ref</div>
              <div className="px-1 border-[.1rem] border-b-0 border-black">Date</div>
              <div className="px-1 border-[.1rem] border-black">Branch</div>
            </div>
            <div className="w-full">
              <div className="px-1 border-[.1rem] border-l-0 border-b-0 border-black">{data.reference}</div>
              <div className="px-1 border-[.1rem] border-l-0 border-b-0 border-black">{data.date}</div>
              <div className="px-1 border-[.1rem] border-l-0 border-black">{data.branch}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-[#f8cbad] border-[.1rem] border-black mt-4 p-2">
        <span className="text-xs font-bold">Proposed Equipments & Specification</span>
      </div>

      <table className="w-full border-collapse border border-gray-400 mt-2">
        <thead>
          <tr className="bg-[#f4b084]">
            <th className="border text-xs p-1">Sl no.</th>
            <th className="border text-xs p-1">Model Number</th>
            <th className="border text-xs p-1">Visual Image</th>
            <th className="border text-xs p-1">Equipment Specification Description</th>
            <th className="border text-xs p-1">MRP Per Unit</th>
            <th className="border text-xs p-1">Spl Price Per Unit</th>
            <th className="border text-xs p-1">Qty No</th>
            <th className="border text-xs p-1">Total Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {data.products.length > 0 ? (
            data.products.map((p, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{p.model || "N/A"}</td>
                <td className="border p-2">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="h-10 w-auto" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">₹{p.price}</td>
                <td className="border p-2">₹{p.price * 0.9}</td>
                <td className="border p-2">{p.qty}</td>
                <td className="border p-2">₹{p.price * p.qty}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-2">No products available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 border-t border-gray-400 pt-2">
        <p><strong>Total:</strong> ₹{data.products.reduce((sum, p) => sum + p.price * p.qty, 0)}</p>
        <p><strong>GST ({data.gst}%):</strong> ₹{(data.products.reduce((sum, p) => sum + p.price * p.qty, 0) * data.gst) / 100}</p>
        <p><strong>Shipping:</strong> ₹{data.shipping}</p>
        <p className="font-bold text-lg">
          Grand Total: ₹
          {data.products.reduce((sum, p) => sum + p.price * p.qty, 0) * (1 + data.gst / 100) + Number(data.shipping)}
        </p>
      </div>
    </div>
  );
};

export default Livepreview;
