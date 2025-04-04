import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const headerImage = "/quoteheader.jpg";
const logo1 = "/logo1.png";
const logo2 = "/logo2.png";
const logo3 = "/logo3.png";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 10 },
  section: { marginBottom: 10 },
  image: { width: "100%", height: 80, marginBottom: 10 },
  textCenter: { textAlign: "center" },
  flexRow: { flexDirection: "row", width: "100%" },
  border: { border: "1px solid black", padding: 5 },
  bold: { fontWeight: "bold" },
  table: { width: "100%", marginTop: 10, border: "1px solid black" },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid black",
    padding: 5,
    backgroundColor: "#fff",
  },
  headerRow: { backgroundColor: "#f4b084", fontWeight: "bold" },
  col: { flex: 1, textAlign: "center", fontSize: 10, borderRight: "1px solid black" },
  productImage: { width: 50, height: 50, margin: "auto" },
  warrantyBox: {
    marginTop: 3,
    padding: 5,
    border: "1px solid #000",
    fontSize: 8,
    backgroundColor: "#fce4d6",
  },
  totalSection: {
    marginTop: 15,
    padding: 10,
    border: "1px solid black",
    textAlign: "right",
    backgroundColor: "#f4b084",
    fontWeight: "bold",
  },
  warrantyHeading: { fontSize: 9, fontWeight: "bold", backgroundColor: "#ffff00", padding: 2 },
});

export default function QuotePDF({ data }) {
  const total = data.products.reduce((sum, p) => sum + p.price * p.qty, 0);
  const gstAmount = (total * data.gst) / 100;
  const grandTotal = total + gstAmount + Number(data.shipping);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={[styles.textCenter, { fontSize: 18, marginBottom: 10 }]}>
          Quotation
        </Text>
        <Image src={headerImage} style={styles.image} />

        {/* Address & Reference Section */}
        <View style={styles.flexRow}>
          {/* Left: To Details */}
          <View style={[styles.border, { flex: 1 }]}>
            <Text style={styles.bold}>To:</Text>
            <Text>{data.to}</Text>
            <Text>{data.toLocation}</Text>
            <Text>{data.toAddress}</Text>
          </View>

          {/* Middle: Logos */}
          <View style={[styles.flexRow, styles.border, { flex: 1, justifyContent: "center" }]}>
            <Image src={logo1} style={{ width: 30, height: 30, margin: 5 }} />
            <Image src={logo2} style={{ width: 30, height: 30, margin: 5 }} />
            <Image src={logo3} style={{ width: 30, height: 30, margin: 5 }} />
          </View>

          {/* Right: Reference, Date, Branch */}
          <View style={[styles.border, { flex: 1 }]}>
            <Text>Ref: {data.reference}</Text>
            <Text>Date: {data.date}</Text>
            <Text>Branch: {data.branch}</Text>
          </View>
        </View>

        {/* Product Table Header */}
        <View style={[styles.table, styles.headerRow]}>
          <View style={styles.row}>
            <Text style={styles.col}>Sl No.</Text>
            <Text style={styles.col}>Model Number</Text>
            <Text style={styles.col}>Visual Image</Text>
            <Text style={styles.col}>Equipment Description</Text>
            <Text style={styles.col}>MRP Per Unit</Text>
            <Text style={styles.col}>Special Price</Text>
            <Text style={styles.col}>Qty</Text>
            <Text style={styles.col}>Total Price</Text>
          </View>
        </View>

        {/* Product Rows */}
        {data.products.map((p, index) => (
          <View key={index} style={[styles.table, { backgroundColor: "#fff" }]}>
            <View style={styles.row}>
              <Text style={styles.col}>{index + 1}</Text>
              <Text style={styles.col}>{p.model || "N/A"}</Text>
              <View style={styles.col}>
                {p.image ? (
                  <Image src={p.image} style={styles.productImage} />
                ) : (
                  <Text>No Image</Text>
                )}
              </View>
              <Text style={styles.col}>{p.name}</Text>
              <Text style={styles.col}>₹{p.price}</Text>
              <Text style={styles.col}>₹{(p.price * 0.9).toFixed(2)}</Text>
              <Text style={styles.col}>{p.qty}</Text>
              <Text style={styles.col}>₹{(p.price * p.qty).toFixed(2)}</Text>
            </View>

            {/* Warranty Box under Product Description */}
            {p.warranty && (
              <View style={[styles.row, styles.warrantyBox]}>
                <Text style={styles.warrantyHeading}>WARRANTY INFORMATION:</Text>
                <Text>{p.warranty}</Text>
              </View>
            )}
          </View>
        ))}

        {/* Total Calculation */}
        <View style={styles.totalSection}>
          <Text>Total: ₹{total.toFixed(2)}</Text>
          <Text>GST ({data.gst}%): ₹{gstAmount.toFixed(2)}</Text>
          <Text>Shipping: ₹{data.shipping}</Text>
          <Text style={{ fontSize: 14 }}>
            Grand Total: ₹{grandTotal.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
