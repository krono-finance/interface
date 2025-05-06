export const transformAddress = (
  beginning: number,
  end: number,
  address: string,
) => {
  if (address.length <= beginning + end) {
    return address;
  }

  return `${address?.slice(0, beginning)}...${address?.slice(
    address?.length - end,
  )}`;
};
