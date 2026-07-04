export const MOCK_LEADS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    status: "NEW",
    source: "Website",
    destination: "Maldives",
    createdAt: new Date().toISOString(),
    customer: {
        name: "John Doe",
        email: "john@example.com"
    }
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 9876543211",
    status: "CONTACTED",
    source: "WhatsApp",
    destination: "Dubai",
    createdAt: new Date().toISOString(),
    customer: {
        name: "Jane Smith",
        email: "jane@example.com"
    }
  },
];

export const getLeads = async () => {
  return MOCK_LEADS;
};
