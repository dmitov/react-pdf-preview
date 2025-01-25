import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 30,
  },
  card: {
    border: '1px solid #000000',
    borderRadius: 5,
    padding: 20,
    maxWidth: 400,
    margin: '0 auto',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  contactInfo: {
    marginTop: 15,
    borderTop: '1px solid #cccccc',
    paddingTop: 15,
  },
  contactRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: 80,
    fontSize: 12,
    color: '#666666',
  },
  value: {
    fontSize: 12,
  },
});

const PersonalCard = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            src="https://via.placeholder.com/60"
          />
          <View>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.title}>Software Engineer</Text>
          </View>
        </View>
        
        <View style={styles.contactInfo}>
          <View style={styles.contactRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>john.doe@example.com</Text>
          </View>
          <View style={styles.contactRow}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>+1 (555) 123-4567</Text>
          </View>
          <View style={styles.contactRow}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>San Francisco, CA</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PersonalCard;
