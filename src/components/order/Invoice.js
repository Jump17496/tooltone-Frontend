import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font
} from "@react-pdf/renderer";

import fontDev from "./THSarabunNew Bold.ttf";
import moment from 'moment/min/moment-with-locales'

import { 
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell
} from '@david.kucsai/react-pdf-table'

// const MyDocument: any = Document;
// const MyPage: any = Page;

// Register font
Font.register({ family: "THsarabun", src: fontDev });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily:'THsarabun',
    textAlign:'center'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign:'left'
  },
  summary:{
    textAlign:'right'
  }
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Tooltone_Invoice</Text>
          <Text>ร้านกีต้าร์</Text>
          <Text>{moment(Date.now()).local('th').format('LL')}</Text>

          <Table>
            <TableHeader>
              <TableCell>list</TableCell>
              <TableCell>price</TableCell>
              <TableCell>quantity</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell/>
            </TableBody>
          </Table>
          <Table data={order.products}>
            <TableBody>
              <DataTableCell getContent={x => x.product.title}/>
              <DataTableCell getContent={x => x.price}/>
              <DataTableCell getContent={x => x.count}/>
            </TableBody>

          </Table>
        <Text style={styles.summary}>total price:{order.cartTotal}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
