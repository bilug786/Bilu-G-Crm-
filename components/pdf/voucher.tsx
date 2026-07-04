'use client'

import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, color: '#334155' },
  voucherBox: { border: 2, borderColor: '#2563eb', padding: 20, borderRadius: 8 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2563eb', textAlign: 'center', marginBottom: 20, textTransform: 'uppercase' },
  row: { flexDirection: 'row', marginBottom: 10, borderBottom: 1, borderColor: '#f1f5f9', paddingBottom: 5 },
  label: { width: 120, fontWeight: 'bold' },
  value: { flex: 1 },
  footer: { marginTop: 30, textAlign: 'center', fontSize: 8, color: '#94a3b8' }
})

interface VoucherData {
  bookingId: string
  customerName: string
  serviceDetails: string
  date: string
  roomType?: string
  vehicleType?: string
}

export const VoucherPDF = ({ data, type }: { data: VoucherData, type: 'Hotel' | 'Cab' }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.voucherBox}>
        <Text style={styles.title}>{type} Service Voucher</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Booking ID:</Text>
          <Text style={styles.value}>{data.bookingId}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Guest Name:</Text>
          <Text style={styles.value}>{data.customerName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Service Details:</Text>
          <Text style={styles.value}>{data.serviceDetails}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{data.date}</Text>
        </View>

        {type === 'Hotel' ? (
          <View style={styles.row}>
            <Text style={styles.label}>Room Type:</Text>
            <Text style={styles.value}>{data.roomType}</Text>
          </View>
        ) : (
          <View style={styles.row}>
            <Text style={styles.label}>Vehicle Type:</Text>
            <Text style={styles.value}>{data.vehicleType}</Text>
          </View>
        )}

        <View style={{ marginTop: 20, padding: 10, backgroundColor: '#f8fafc' }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Instructions:</Text>
          <Text>Please present this voucher at the time of service. This voucher is non-transferable.</Text>
        </View>
      </View>
      <Text style={styles.footer}>Developed by Bilu G | Ex-Employee v.01</Text>
    </Page>
  </Document>
)
