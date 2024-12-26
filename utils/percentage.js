export const getDiscountedPricePercentage = (
  originalPrice,
  discountedPrice
) => {
  const discount = originalPrice - discountedPrice;

  const discountPercentage = Math.round((discount / originalPrice) * 100);

  return discountPercentage;
};
