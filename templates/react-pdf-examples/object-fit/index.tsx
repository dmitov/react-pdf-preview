import {
  Document,
  Page,
  View,
  Image,
  Text,
  StyleSheet,
  DocumentProps,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  image: {
    objectFit: "contain",
    objectPosition: "0%",
    width: "100%",
    height: "100%",
  },
  surrounding: {
    width: "200pt",
    height: "200pt",
    border: "1px solid red",
    backgroundColor: "tomato",
    marginBottom: "10",
  },
});

export default function ObjectFit(props: DocumentProps) {
  return (
    <Document {...props} title="Object Fit">
      <Page>
        <View style={styles.surrounding}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg"
            style={styles.image}
          />
          <Text style={{ textDecoration: "none" }}>Object Fit Contain</Text>
        </View>
        <View style={styles.surrounding}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg"
            style={[styles.image, { objectFit: "cover" }]}
          />
          <Text>Object Fit: Auto</Text>
        </View>
        <View style={styles.surrounding}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg"
            style={[styles.image, { objectFit: "none" }]}
          />
          <Text>Object Fit: None</Text>
        </View>
      </Page>
    </Document>
  );
}
