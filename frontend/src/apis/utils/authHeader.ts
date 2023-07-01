const authHeader = (token?: any) => {
  const t = token || JSON.parse(localStorage.getItem("booking-token") as any);
  if (t) {
    return {
      authorization: t,
    };
  }
};

export default authHeader;
