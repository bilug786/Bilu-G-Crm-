export const MOCK_CUSTOMERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    address: "123 Street, New York",
    createdAt: new Date().toISOString(),
  },
];

export const getCustomers = async () => {
  return MOCK_CUSTOMERS;
};
