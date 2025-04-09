import React from 'react'

const Additionalinfo = () => {
  return (
    <div className="text-xs text-gray-700 mt-4 space-y-2 leading-relaxed">
        <div>
          <h2 className="font-semibold text-sm text-black">ELGIS FITNESS</h2>
          <p>
            #44, CMR Road, Near Axis Bank, H.R.B.R. 2nd Block, Kalyan Nagar,
            Bangalore – 560043
            <br />
            <span className="font-medium">Phone:</span> 89700 70089 / 95907
            89333
            <br />
            <span className="font-medium">GSTIN/UIN:</span> 29AJOPN1843M1ZJ
            <br />
            <span className="font-medium">PAN:</span> AJOPN1843M
          </p>
        </div>

        <div>
          <p className="font-medium text-black">Payment & Delivery Terms:</p>
          <ul className="list-disc list-inside pl-2">
            <li>
              Please issue Crossed Cheque / Demand Draft / Pay Order in favor of{" "}
              <strong>ELGIS FITNESS</strong>.
            </li>
            <li>
              Delivery within <strong>45 days</strong> upon receipt of Purchase
              Order and <strong>80% advance payment</strong>.
            </li>
            <li>Subject to stock availability.</li>
            <li>
              <strong>Transportation Charges:</strong> Free within city limits.
              Unloading at actuals.
            </li>
            <li>
              <strong>Balance Payment:</strong> Due upon delivery and
              installation.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-black">Warranty & Support:</p>
          <p>
            We assure that our equipment is built for long-term performance. Our
            team is committed to providing excellent after-sales support to
            maintain your organization's reputation.
          </p>
        </div>

        <div>
          <p className="font-medium text-black">Bank Details:</p>
          <p>
            <span className="block">
              <strong>Account Name:</strong> ELGIS FITNESS
            </span>
            <span className="block">
              <strong>Bank Name:</strong> HDFC Bank
            </span>
            <span className="block">
              <strong>Account Number:</strong> 03532000010202
            </span>
            <span className="block">
              <strong>Branch:</strong> Kalyan Nagar
            </span>
            <span className="block">
              <strong>IFSC Code:</strong> HDFC0000353
            </span>
          </p>
        </div>

        <div>
          <p>
            We look forward to building a long-term, mutually beneficial
            relationship with your esteemed organization. You can always count
            on our prompt attention and services.
          </p>
        </div>

        <div className="pt-2">
          <p className="font-medium text-black">For ELGIS FITNESS</p>
          <p>
            Nagaraj A<br />
            Regional Sales Manager
            <br />
            📞 89700 70089 / 95907 89333
          </p>
        </div>
      </div>
  )
}

export default Additionalinfo
