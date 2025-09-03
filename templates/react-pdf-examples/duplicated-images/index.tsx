import {
  Document,
  Page,
  Image,
  StyleSheet,
  DocumentProps,
} from "@react-pdf/renderer";

import Quijote1 from "../../../public/quijote1.jpg";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 0,
    width: 520,
    height: 200,
    backgroundColor: "red",
    objectFit: "fill",
    objectPositionX: "center",
    objectPositionY: "center",
    borderWith: 2,
    padding: 2,
    borderColor: "blue",
    borderStyle: "solid",
  },
  image2: {
    marginVertical: 15,
    marginHorizontal: 0,
    width: 300,
    backgroundColor: "green",
    objectFit: "fill",
    objectPositionX: "center",
    objectPositionY: "center",
    borderWith: 2,
    padding: 2,
    borderColor: "blue",
    borderStyle: "solid",
  },
});

export default function DuplicatedImages(props: DocumentProps) {
  return (
    <Document {...props} title="Duplicated Images">
      <Page style={styles.body}>
        <Image style={styles.image} src={Quijote1} />
        <Image style={styles.image2} src={Quijote1} />
        <Image style={styles.image} src={Quijote1} />
        <Image style={styles.image2} src={Quijote1} />
      </Page>
    </Document>
  );
}
