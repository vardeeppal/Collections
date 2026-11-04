/**
 * Utility functions for currency formatting, pincode validation, and dates
 */

export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Math.round(amount));
}

export function calculateDeliveryDate(pincode: string): {
  serviceable: boolean;
  deliveryDate: string;
  days: number;
  message: string;
} {
  const cleanPincode = (pincode || '').trim();

  // Valid Indian pincode is 6 numeric digits, not starting with 0
  if (!/^[1-9][0-9]{5}$/.test(cleanPincode)) {
    return {
      serviceable: false,
      deliveryDate: '',
      days: 0,
      message: 'Please enter a valid 6-digit postal pincode.'
    };
  }

  // Certain test blocked pincodes
  if (cleanPincode === '999999' || cleanPincode === '111111') {
    return {
      serviceable: false,
      deliveryDate: '',
      days: 0,
      message: `Delivery is currently not available for pincode ${cleanPincode}.`
    };
  }

  // Metro areas deliver in 2 days, other regions in 3-4 days
  const isMetro = ['110', '400', '560', '600', '700', '500'].some(prefix => cleanPincode.startsWith(prefix));
  const daysToAdd = isMetro ? 2 : 4;

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysToAdd);

  const formattedDate = targetDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return {
    serviceable: true,
    deliveryDate: formattedDate,
    days: daysToAdd,
    message: `Delivery by ${formattedDate} (${isMetro ? 'Express Metro 2-day' : 'Standard 3-4 days'})`
  };
}

export function getEstimatedDeliveryDate(daysFromNow: number = 3): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
