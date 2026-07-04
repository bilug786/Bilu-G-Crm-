'use client'

import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#334155',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  companyInfo: {
    textAlign: 'right',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0f172a',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
    color: '#64748b',
  },
  value: {
    flex: 1,
  },
  itineraryDay: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
  },
  dayTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2563eb',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 20,
    color: '#94a3b8',
    fontSize: 8,
  }
})

interface QuotationData {
  customerName: string
  packageName: string
  duration: string
  itinerary: Array<{
    title: string
    description: string
  }>
  totalAmount: string
}

export const QuotationPDF = ({ data }: { data: QuotationData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Ex-Employee</Text>
        <View style={styles.companyInfo}>
          <Text>Bilu G Travels</Text>
          <Text>Srinagar, Kashmir</Text>
          <Text>GST: 01ABCDE1234F1Z5</Text>
        </View>
      </View>

      <Text style={styles.title}>Travel Quotation</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{data.customerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Package:</Text>
          <Text style={styles.value}>{data.packageName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>{data.duration}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Itinerary Highlights</Text>
        {data.itinerary?.map((day, i) => (
          <View key={i} style={styles.itineraryDay}>
            <Text style={styles.dayTitle}>Day {i + 1}: {day.title}</Text>
            <Text>{day.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pricing Summary</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Total Cost:</Text>
          <Text style={[styles.value, { fontSize: 14, fontWeight: 'bold', color: '#2563eb' }]}>INR {data.totalAmount}</Text>
        </View>
      </View>

      <Text style={styles.footer}>Developed by Bilu G | This is a computer-generated quotation.</Text>
    </Page>
  </Document>
)
