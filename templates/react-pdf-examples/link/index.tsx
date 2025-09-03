import {
  Document,
  Page,
  Link,
  Text,
  View,
  DocumentProps,
} from "@react-pdf/renderer";

export default function LinkExample(props: DocumentProps) {
  return (
    <Document {...props} title="Link">
      <Page>
        <Link src="https://google.com">Some text link</Link>

        <Link src="https://google.com">
          Some <Text style={{ backgroundColor: "red" }}>stylized</Text> text
          link
        </Link>

        <Link src="https://google.com">
          <Text>
            Some <Text style={{ backgroundColor: "red" }}>stylized</Text> text
            link
          </Text>
        </Link>

        <Link src="https://google.com">
          <View style={{ width: 40, height: 40, backgroundColor: "red" }} />
        </Link>
      </Page>
    </Document>
  );
}
