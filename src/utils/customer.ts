const getCustomerInfo = (data: any) => {
  if (!data) return "";

  return (
    (data.customerName || "Name Not Available") +
    " (Ph: " +
    (data.customerPhone || "Not Available") +
    ")"
  );
};

export { getCustomerInfo };
