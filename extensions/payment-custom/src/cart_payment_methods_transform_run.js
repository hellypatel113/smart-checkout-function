// @ts-check

/**
 * @typedef {import("../generated/api").CartPaymentMethodsTransformRunInput} CartPaymentMethodsTransformRunInput
 * @typedef {import("../generated/api").CartPaymentMethodsTransformRunResult} CartPaymentMethodsTransformRunResult
 */

/**
 * @type {CartPaymentMethodsTransformRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {CartPaymentMethodsTransformRunInput} input
 * @returns {CartPaymentMethodsTransformRunResult}
 */
export function cartPaymentMethodsTransformRun(input) {
  const configuration = JSON.parse(
    input?.paymentCustomization?.metafield?.value ?? "{}"
  );

  /** @type {Array<{selected?: boolean, title?: string}>} */
  const shippingLines = input.cart?.deliveryGroups?.[0]?.deliveryOptions || [];
  /** @type {{selected?: boolean, title?: string}|undefined} */
  const selectedShipping = shippingLines.find(/**
   * @param {any} option
   */
  (option) => option.selected);
  const selectedShippingTitle = selectedShipping?.title || "";

  /** @type {Array<{id: string, title?: string, type?: string}>} */
  const paymentMethods = input.cart?.paymentMethods || [];

  /** @type {Array<{hide: {paymentMethodId: string}}>} */
  const operations = [];

  // Hide COD if Standard shipping is selected
  if (selectedShippingTitle.toLowerCase().includes("standard")) {
    paymentMethods.forEach(/**
     * @param {{id: string, title?: string, type?: string}} method
     */
    (method) => {
      if (method.title && (method.title.toLowerCase().includes("cash on delivery") || method.type === "cash_on_delivery")) {
        operations.push({
          hide: {
            paymentMethodId: method.id
          }
        });
      }
    });
  }

  // Hide Credit Card if Cash on Delivery shipping is selected
  if (selectedShippingTitle.toLowerCase().includes("cash on delivery")) {
    paymentMethods.forEach(/**
     * @param {{id: string, title?: string, type?: string}} method
     */
    (method) => {
      if (method.title && (method.title.toLowerCase().includes("credit card") || method.type === "credit_card")) {
        operations.push({
          hide: {
            paymentMethodId: method.id
          }
        });
      }
    });
  }

  return {
    operations
  };
}