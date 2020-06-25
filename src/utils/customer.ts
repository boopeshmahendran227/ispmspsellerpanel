const getCustomerInfo = (data: any) => {
  if (!data) return "";

  return (
    (data.customerName || "Name Not Available") +
    (data.customerPhone
      ? " (Ph: " + (data.customerPhone || "Not Available") + ")"
      : "")
  );
};

export { getCustomerInfo };
