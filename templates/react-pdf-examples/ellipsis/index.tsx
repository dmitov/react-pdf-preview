import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  type DocumentProps,
} from "@react-pdf/renderer";

import RobotoFont from "../../../public/Roboto-Regular.ttf";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  text: {
    fontSize: 15,
    maxLines: 1,
    fontColor: "#000000",
    textOverflow: "ellipsis",
    fontFamily: "Roboto",
  },
});

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: RobotoFont,
      fontWeight: 400,
    },
  ],
});

export default function Ellipsis(props: DocumentProps) {
  return (
    <Document {...props} title="Ellipsis">
      <Page style={styles.body}>
        <View style={{ width: 70 }}>
          <Text style={styles.text}>And here here</Text>
        </View>
      </Page>
    </Document>
  );
}
