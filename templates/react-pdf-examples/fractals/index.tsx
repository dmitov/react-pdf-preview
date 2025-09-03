import { Page, Document, DocumentProps } from "@react-pdf/renderer";

import Fractal from "./_Fractal";

export default function Fractals(props: DocumentProps) {
  return (
    <Document {...props} title="Fractals">
      <Page size="A4">
        <Fractal steps={18} />
      </Page>

      <Page orientation="landscape" size="A4">
        <Fractal steps={14} />
      </Page>

      <Page size="B4">
        <Fractal steps={10} />
      </Page>
    </Document>
  );
}
