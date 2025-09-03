import { Document, DocumentProps, Page, StyleSheet } from "@react-pdf/renderer";

import Svg0 from "./_svg";
import Svg1 from "./_Svg1";
import Svg2 from "./_Svg2";
import Svg4 from "./_Svg4";
import Star from "./_Star";
import Heart from "./_Heart";
import Pattern from "./_Pattern";
import Car from "./_Car";

const styles = StyleSheet.create({
  page: {
    fontSize: 20,
    color: "black",
    padding: "10",
  },
});

export default function App(props: DocumentProps) {
  return (
    <Document title="Hey!" subject="Test" {...props}>
      <Page size="A4" style={styles.page}>
        <Star />
        <Svg0 />
        <Svg1 />
        <Svg2 />
        <Svg4 />
        <Heart />
        <Pattern />
        <Car />
      </Page>
    </Document>
  );
}
