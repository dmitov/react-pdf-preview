import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  DocumentProps,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    margin: 50,
  },
  highlight: {
    backgroundColor: "tomato",
    textDecoration: "line-through underline",
  },
});

export default function MultilineText(props: DocumentProps) {
  return (
    <Document {...props} title="Multiline Text">
      <Page size="A4">
        <View style={styles.body}>
          <Text style={{ backgroundColor: "lightgray" }}>
            Single line text with{" "}
            <Text style={styles.highlight}>inline text highlighted</Text> Again
            Black Text
          </Text>

          <Text style={{ backgroundColor: "lightgray" }}>
            Nested Text with{" "}
            <Text style={styles.highlight}>inline text highlighted</Text> in a
            long, long, long, long, long, long long
          </Text>
        </View>
      </Page>
    </Document>
  );
}
