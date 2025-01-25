import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface ReceiptProps {
  receiptNumber?: string;
  date?: string;
  storeName?: string;
  storeAddress?: string;
  items?: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  subtotal?: number;
  tax?: number;
  total?: number;
  paymentMethod?: string;
}

const defaultProps: ReceiptProps = {
  receiptNumber: '0001',
  date: new Date().toLocaleDateString(),
  storeName: 'Store Name',
  storeAddress: 'Store Address',
  items: [{
    description: 'Sample Item',
    quantity: 1,
    price: 0.00
  }],
  subtotal: 0.00,
  tax: 0.00,
  total: 0.00,
  paymentMethod: 'Cash'
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
    fontFamily: 'Courier'
  },
  header: {
    alignItems: 'center',
    marginBottom: 10
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  divider: {
    borderBottom: 1,
    width: '100%',
    marginVertical: 5
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2
  },
  totalsSection: {
    marginTop: 10
  },
  footer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default function Receipt({
  receiptNumber = defaultProps.receiptNumber,
  date = defaultProps.date,
  storeName = defaultProps.storeName,
  storeAddress = defaultProps.storeAddress,
  items = defaultProps.items,
  subtotal = defaultProps.subtotal,
  tax = defaultProps.tax,
  total = defaultProps.total,
  paymentMethod = defaultProps.paymentMethod
}: ReceiptProps) {
  return (
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.storeName}>{storeName}</Text>
          <Text>{storeAddress}</Text>
          <Text>Receipt #{receiptNumber}</Text>
          <Text>{date}</Text>
        </View>

        <View style={styles.divider} />

        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text>{item.description}</Text>
            <Text>
              {item.quantity} x ${item.price.toFixed(2)}
              = ${(item.quantity * item.price).toFixed(2)}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.totalsSection}>
          <View style={styles.itemRow}>
            <Text>Subtotal:</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text>Tax:</Text>
            <Text>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text>Total:</Text>
            <Text>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Payment Method: {paymentMethod}</Text>
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
}
