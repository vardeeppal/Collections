/**
 * Trendora Core Type Definitions
 * Designed for full-stack compatibility across React client and Express server
 */

export type ProductCategory =
  | 'dresses'
  | 'ethnic'
  | 'sarees'
  | 'tops'
  | 'bottoms'
  | 'coords'
  | 'outerwear'
  | 'deals'
  | 'women';

export type ProductGender = 'Women' | 'Unisex';

export type GarmentSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | string;

export interface ProductSizeOption {
  size: string;
  stock: number; // 0 = sold out
}

export interface ProductColorOption {
  name: string;
  hex: string;
  imageIndex?: number;
  inStock?: boolean;
}

export type ProductColor = ProductColorOption;

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  productId?: string;
  orderId?: string;
  author: string;
  customerName?: string;
  customerEmail?: string;
  rating: number;
  date: string;
  createdAt?: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  fitFeedback?: 'Runs small' | 'True to size' | 'Runs large';
  sizePurchased?: string;
  colorPurchased?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  gender: ProductGender;
  price: number; // Current selling price in INR
  originalPrice: number; // MRP struck through
  discount: number; // Percentage off (calculated or seeded)
  rating: number; // 1.0 to 5.0
  ratingCount: number;
  reviewCount?: number;
  images: string[]; // Primary image at index 0, hover image at index 1, additional shots
  availableSizes: ProductSizeOption[];
  stock?: number | Record<string, number>;
  colors: ProductColorOption[];
  tags: ('New' | 'Bestseller' | 'Sale' | 'Trending' | 'Editor Pick')[];
  description: string;
  material: string;
  fabric?: string;
  careInstructions: string;
  care?: string;
  specs: ProductSpec[];
  isDealOfTheDay?: boolean;
  dealEndsAt?: string;
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string; // unique item id (productId + size + color)
  productId: string;
  product: Product;
  name?: string;
  price?: number;
  image?: string;
  size: string;
  color: string;
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  mobile: string;
  pincode: string;
  addressLine: string;
  locality: string;
  city: string;
  state: string;
  addressType: 'Home' | 'Work';
  isDefault: boolean;
}

export interface ShippingAddress {
  fullName: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phone?: string;
  pincode?: string;
  addressLine?: string;
  locality?: string;
  addressType?: 'Home' | 'Work';
  isDefault?: boolean;
}

export type OrderStatus =
  | 'Placed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Pending Payment'
  | 'Paid'
  | 'Refunded';

export interface OrderTrackingStep {
  status: OrderStatus;
  label: string;
  date?: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber?: string;
  userId?: string;
  customer?: any;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  items: CartItem[];
  subtotal: number;
  productDiscount?: number;
  couponCode?: string;
  couponDiscount?: number;
  discountCode?: string;
  discountAmount?: number;
  shippingMethod?: any;
  shippingCost?: number;
  taxRegion?: string;
  taxRate?: number;
  taxAmount?: number;
  convenienceFee?: number;
  total?: number;
  totalAmount: number;
  shippingAddress?: Address;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod' | string;
  paymentDetails?: {
    upiId?: string;
    cardLast4?: string;
    cardBrand?: string;
    bankName?: string;
  };
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  trackingNumber?: string;
  emailReceiptSent?: boolean;
  status: OrderStatus;
  estimatedDeliveryDate?: string;
  trackingSteps?: OrderTrackingStep[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  mobile: string;
  addresses: Address[];
  createdAt?: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue: number;
  expiresAt: string;
  usageCount: number;
  active: boolean;
  description?: string;
}

export interface SalesStats {
  totalRevenue: number;
  totalOrders: number;
  ordersThisWeek: number;
  bestSellers: {
    productId: string;
    name: string;
    quantitySold: number;
    revenue: number;
  }[];
}

export interface FilterState {
  category?: string;
  subcategory?: string;
  brands: string[];
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  minDiscount: number;
  minRating: number;
  tags: string[];
  sortBy: 'recommended' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'discount';
}
