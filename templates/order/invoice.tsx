import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
interface InvoiceProps {
  invoiceNumber?: string;
  date?: string;
  customerName?: string;
  customerAddress?: string;
  items?: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  total?: number;
}

const defaultProps: InvoiceProps = {
  invoiceNumber: '0001',
  date: new Date().toLocaleDateString(),
  customerName: 'Customer Name',
  customerAddress: 'Customer Address',
  items: [{
    description: 'Sample Item',
    quantity: 1,
    price: 0.00
  }],
  total: 0.00
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  section: {
    margin: 10,
    padding: 10
  }
});

export default function Invoice({
  invoiceNumber = defaultProps.invoiceNumber,
  date = defaultProps.date,
  customerName = defaultProps.customerName,
  customerAddress = defaultProps.customerAddress,
  items = defaultProps.items,
  total = defaultProps.total
}: InvoiceProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Invoice #{invoiceNumber}</Text>
          <Text>Date: {date}</Text>
        </View>
        <View style={styles.section}>
          <Text>Bill To:</Text>
          <Text>{customerName}</Text>
          <Text>{customerAddress}</Text>
        </View>
        <View style={styles.section}>
          {items.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text>{item.description}</Text>
              <Text>Qty: {item.quantity}</Text>
              <Text>${item.price.toFixed(2)}</Text>
              <Text>${(item.quantity * item.price).toFixed(2)}</Text>
            </View>
          ))}
          <View style={{ marginTop: 20, borderTop: 1, paddingTop: 10 }}>
            <Text>Total: ${total.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};


