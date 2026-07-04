'use client'

import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, color: '#334155' },
  header: { borderBottom: 1, borderColor: '#e2e8f0', paddingBottom: 20, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0f172a' },
  table: { width: 'auto', borderStyle: 'solid', borderBottomWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#e2e8f0' },
  tableRow: { flexDirection: 'row', borderTopWidth: 1, borderColor: '#e2e8f0' },
  tableCell: { padding: 8, flex: 1 },
  tableHeader: { backgroundColor: '#f8fafc', fontWeight: 'bold' },
  summary: { marginTop: 30, alignItems: 'flex-end' },
  summaryRow: { flexDirection: 'row', gap: 20, marginBottom: 5 },
  footer: { marginTop: 50, textAlign: 'center', color: '#94a3b8', fontSize: 8 }
})

interface InvoiceData {
  invoiceNumber: string
  customerName: string
  customerEmail: string
  packageName: string
  baseAmount: string
  taxAmount: string
  totalAmount: string
}

export const InvoicePDF = ({ data }: { data: InvoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>TAX INVOICE</Text>
        <Text>Invoice #: {data.invoiceNumber}</Text>
        <Text>Date: {new Date().toLocaleDateString()}</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Bill To:</Text>
        <Text>{data.customerName}</Text>
        <Text>{data.customerEmail}</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Description</Text>
          <Text style={styles.tableCell}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{data.packageName} - Tour Package</Text>
          <Text style={styles.tableCell}>INR {data.baseAmount}</Text>
        </View>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text>Subtotal:</Text>
          <Text>INR {data.baseAmount}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>GST (5%):</Text>
          <Text>INR {data.taxAmount}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Total:</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#2563eb' }}>INR {data.totalAmount}</Text>
        </View>
      </View>

      <Text style={styles.footer}>Developed by Bilu G | GSTIN: 01ABCDE1234F1Z5</Text>
    </Page>
  </Document>
)
