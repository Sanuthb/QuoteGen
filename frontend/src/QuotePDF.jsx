import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import React from "react";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    // marginLeft: 20,
    marginRight: 20,
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerImage: {
    width: "100%",
    marginBottom: 10,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  flexItem: {
    flex: 1,
  },
  border: {
    borderWidth: 1,
    borderColor: "black",
  },
  borderLeft0: {
    borderLeftWidth: 0,
  },
  borderBottom0: {
    borderBottomWidth: 0,
  },
  cell: {
    padding: 3,
    fontSize: 10,
  },
  logosContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    backgroundColor: "white",
  },
  logo: {
    width: 40,
    height: 40,
    margin: "0 5px",
  },
  sectionTitle: {
    backgroundColor: "#f8cbad",
    padding: 8,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#888",
    marginBottom: 10,
  },
  tableHead: {
    backgroundColor: "#f4b084",
    flexDirection: "row",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#888",
  },
  tableHeaderCell: {
    padding: 5,
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#888",
  },
  tableCell: {
    padding: 5,
    fontSize: 9,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#888",
  },
  productName: {
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    paddingBottom: 3,
    textAlign: "center",
  },
  productFeature: {
    fontSize: 8,
    marginBottom: 2,
    color: "#db691d",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  featureIcon: {
    width: 8,
    marginRight: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    objectFit: "contain",
    marginHorizontal: "auto",
  },
  totals: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 3,
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 5,
  },
  totalValue: {
    fontSize: 10,
  },
  grandTotal: {
    fontSize: 12,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 15,
    fontSize: 8,
    color: "#444",
  },
  footerSection: {
    marginBottom: 8,
  },
  footerHeading: {
    fontSize: 9,
    fontWeight: "bold",
    color: "black",
    marginBottom: 3,
  },
  footerList: {
    marginLeft: 10,
  },
  footerListItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  footerListBullet: {
    marginRight: 5,
  },
  footerCompany: {
    marginTop: 10,
  },
});

// checkmark symbol for features
const CHECKMARK = "✓";

const QuotePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quotation</Text>
        {/* Note: In PDF we need to use imported images, can't use web URL paths */}
        <Image style={styles.headerImage} src="/quoteheader.jpg" />
      </View>

      {/* To and Reference Section */}
      <View style={styles.flex}>
        {/* Left Section - To */}
        <View style={[styles.flex, styles.flexItem]}>
          <View style={[styles.border, styles.cell]}>
            <Text>To.</Text>
          </View>
          <View style={styles.flexItem}>
            <View
              style={[
                styles.border,
                styles.borderLeft0,
                styles.borderBottom0,
                styles.cell,
              ]}
            >
              <Text>{data.to}</Text>
            </View>
            <View
              style={[
                styles.border,
                styles.borderLeft0,
                styles.borderBottom0,
                styles.cell,
              ]}
            >
              <Text>{data.toLocation}</Text>
            </View>
            <View style={[styles.border, styles.borderLeft0, styles.cell]}>
              <Text>{data.toAddress}</Text>
            </View>
          </View>
        </View>

        {/* Middle Section - Logos */}
        <View style={[styles.logosContainer, styles.flexItem]}>
          <Image src="/logo1.png" style={styles.logo} />
          <Image src="/logo3.png" style={styles.logo} />
          <Image src="/logo2.png" style={styles.logo} />
        </View>

        {/* Right Section - Reference */}
        <View style={[styles.flex, styles.flexItem]}>
          <View>
            <View style={[styles.border, styles.borderBottom0, styles.cell]}>
              <Text>Ref</Text>
            </View>
            <View style={[styles.border, styles.borderBottom0, styles.cell]}>
              <Text>Date</Text>
            </View>
            <View style={[styles.border, styles.cell]}>
              <Text>Branch</Text>
            </View>
          </View>
          <View style={styles.flexItem}>
            <View
              style={[
                styles.border,
                styles.borderLeft0,
                styles.borderBottom0,
                styles.cell,
              ]}
            >
              <Text>{data.reference}</Text>
            </View>
            <View
              style={[
                styles.border,
                styles.borderLeft0,
                styles.borderBottom0,
                styles.cell,
              ]}
            >
              <Text>{data.date}</Text>
            </View>
            <View style={[styles.border, styles.borderLeft0, styles.cell]}>
              <Text>{data.branch}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Section Title */}
      <View style={styles.sectionTitle}>
        <Text>Proposed Equipments & Specification</Text>
      </View>

      {/* Products Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHead}>
          <Text style={[styles.tableHeaderCell, { width: "5%" }]}>Sl no.</Text>
          <Text style={[styles.tableHeaderCell, { width: "10%" }]}>
            Model Number
          </Text>
          <Text style={[styles.tableHeaderCell, { width: "15%" }]}>
            Visual Image
          </Text>
          <Text style={[styles.tableHeaderCell, { width: "30%" }]}>
            Equipment Specification Description
          </Text>
          <Text style={[styles.tableHeaderCell, { width: "13%" }]}>
            MRP Per Unit
          </Text>
          <Text style={[styles.tableHeaderCell, { width: "13%" }]}>
            Spl Price Per Unit
          </Text>
          <Text style={[styles.tableHeaderCell, { width: "5%" }]}>Qty No</Text>
          <Text
            style={[
              styles.tableHeaderCell,
              { width: "9%", borderRightWidth: 0 },
            ]}
          >
            Total Unit Price
          </Text>
        </View>

        {/* Table Body */}
        {data.products.length > 0 ? (
          data.products.map((p, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCell, { width: "5%" }]}>
                <Text>{index + 1}</Text>
              </View>
              <View style={[styles.tableCell, { width: "10%" }]}>
                <Text>{p.model || "N/A"}</Text>
              </View>
              <View style={[styles.tableCell, { width: "15%" }]}>
                {p.id ? (
                  <Image
                    src={`/products/${p.id}.png`}
                    style={styles.productImage}
                  />
                ) : (
                  <Text>No Image</Text>
                )}
              </View>
              <View style={[styles.tableCell, { width: "30%" }]}>
                <Text style={styles.productName}>{p.name}</Text>
                <View style={{ marginTop: 5 }}>
                  {p.feature?.map((f, i) => (
                    // <View key={i} style={styles.featureItem}>
                    //   <Text style={styles.featureIcon}>{CHECKMARK}</Text>
                    //   <Text style={styles.productFeature}>{f}</Text>
                    // </View>
                    <Text key={i} style={styles.productFeature}>
                      • {f}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={[styles.tableCell, { width: "13%" }]}>
                <Text>
                  <Image
                    src="/rupee.png"
                    style={{ width: 6, height: 6, marginRight: 1 }}
                  />
                  {p.price}
                </Text>
              </View>
              <View style={[styles.tableCell, { width: "13%" }]}>
                <Text>
                  {" "}
                  <Image
                    src="/rupee.png"
                    style={{ width: 6, height: 6, marginRight: 1 }}
                  />
                  {p.price * 0.9}
                </Text>
              </View>
              <View style={[styles.tableCell, { width: "5%" }]}>
                <Text>{p.qty}</Text>
              </View>
              <View
                style={[styles.tableCell, { width: "9%", borderRightWidth: 0 }]}
              >
                <Text>
                  <Image
                    src="/rupee.png"
                    style={{ width: 6, height: 6, marginRight: 1 }}
                  />
                  {p.price * p.qty}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.tableRow}>
            <View
              style={[styles.tableCell, { width: "100%", borderRightWidth: 0 }]}
            >
              <Text>No products available</Text>
            </View>
          </View>
        )}
      </View>

      {/* Totals Section */}
      <View style={styles.totals}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>
            <Image
              src="/rupee.png"
              style={{ width: 6, height: 6, marginRight: 1 }}
            />{" "}
            {data.products.reduce((sum, p) => sum + p.price * p.qty, 0)}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>GST ({data.gst}%):</Text>
          <Text style={styles.totalValue}>
            <Image
              src="/rupee.png"
              style={{ width: 6, height: 6, marginRight: 1 }}
            />
            {(data.products.reduce((sum, p) => sum + p.price * p.qty, 0) *
              data.gst) /
              100}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Shipping:</Text>
          <Text style={styles.totalValue}>
            <Image
              src="/rupee.png"
              style={{ width: 6, height: 6, marginRight: 1 }}
            />
            {data.shipping}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Grand Total:</Text>
          <Text style={styles.grandTotal}>
            <Image
              src="/rupee.png"
              style={{ width: 8, height: 8, marginRight: 1 }}
            />
            {data.products.reduce((sum, p) => sum + p.price * p.qty, 0) *
              (1 + data.gst / 100) +
              Number(data.shipping)}
          </Text>
        </View>
      </View>

      {/* Footer Information */}
      <View style={styles.footer}>
        <View style={styles.footerSection}>
          <Text style={styles.footerHeading}>ELGIS FITNESS</Text>
          <Text>
            #44, CMR Road, Near Axis Bank, H.R.B.R. 2nd Block, Kalyan Nagar,
            Bangalore – 560043
          </Text>
          <Text>Phone: 89700 70089 / 95907 89333</Text>
          <Text>GSTIN/UIN: 29AJOPN1843M1ZJ</Text>
          <Text>PAN: AJOPN1843M</Text>
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerHeading}>Payment & Delivery Terms:</Text>
          <View style={styles.footerList}>
            <View style={styles.footerListItem}>
              <Text style={styles.footerListBullet}>•</Text>
              <Text>
                Please issue Crossed Cheque / Demand Draft / Pay Order in favor
                of ELGIS FITNESS.
              </Text>
            </View>
            <View style={styles.footerListItem}>
              <Text style={styles.footerListBullet}>•</Text>
              <Text>
                Delivery within 45 days upon receipt of Purchase Order and 80%
                advance payment.
              </Text>
            </View>
            <View style={styles.footerListItem}>
              <Text style={styles.footerListBullet}>•</Text>
              <Text>Subject to stock availability.</Text>
            </View>
            <View style={styles.footerListItem}>
              <Text style={styles.footerListBullet}>•</Text>
              <Text>
                Transportation Charges: Free within city limits. Unloading at
                actuals.
              </Text>
            </View>
            <View style={styles.footerListItem}>
              <Text style={styles.footerListBullet}>•</Text>
              <Text>Balance Payment: Due upon delivery and installation.</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerHeading}>Warranty & Support:</Text>
          <Text>
            We assure that our equipment is built for long-term performance. Our
            team is committed to providing excellent after-sales support to
            maintain your organization's reputation.
          </Text>
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerHeading}>Bank Details:</Text>
          <Text>Account Name: ELGIS FITNESS</Text>
          <Text>Bank Name: HDFC Bank</Text>
          <Text>Account Number: 03532000010202</Text>
          <Text>Branch: Kalyan Nagar</Text>
          <Text>IFSC Code: HDFC0000353</Text>
        </View>

        <View style={styles.footerSection}>
          <Text>
            We look forward to building a long-term, mutually beneficial
            relationship with your esteemed organization. You can always count
            on our prompt attention and services.
          </Text>
        </View>

        <View style={styles.footerCompany}>
          <Text style={styles.footerHeading}>For ELGIS FITNESS</Text>
          <Text>Nagaraj A</Text>
          <Text>Regional Sales Manager</Text>
          <Text> 89700 70089 / 95907 89333</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default QuotePDF;
