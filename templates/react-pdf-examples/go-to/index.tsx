import {
  Page,
  Document,
  Link,
  View,
  Image,
  DocumentProps,
} from "@react-pdf/renderer";

export default function GoTo(props: DocumentProps) {
  return (
    <Document {...props} title="Go To">
      <Page size="A4">
        <Link href="#myDest">Link to Image</Link>
      </Page>

      <Page size="A4">
        <View style={{ height: 300, backgroundColor: "black" }} />
        <Image id="myDest" src="https://react-pdf.org/images/logo.png" />
      </Page>
    </Document>
  );
}
