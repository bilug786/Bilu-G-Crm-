export const MOCK_ENQUIRIES = [
  {
    id: "1",
    customer: { name: "John Doe" },
    destination: "Maldives",
    status: "PENDING",
    travelDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const getEnquiries = async () => {
  return MOCK_ENQUIRIES;
};
