export const MOCK_LEADS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    status: "New",
    source: "Website",
    destination: "Maldives",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 9876543211",
    status: "Contacted",
    source: "WhatsApp",
    destination: "Dubai",
    createdAt: new Date().toISOString(),
  },
];

export const getLeads = async () => {
  return MOCK_LEADS;
};
