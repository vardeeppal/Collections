/**
 * Central Brand Configuration for Trendora
 * You can effortlessly change the brand name, colors, coupons, and navigation links here.
 */

export interface NavCategory {
  id: string;
  name: string;
  path: string;
  isHot?: boolean;
  subcategories: {
    heading: string;
    items: { label: string; query: string }[];
  }[];
}

export const brandConfig = {
  name: 'Trendora',
  tagline: 'Fashion & Lifestyle Reimagined',
  currencySymbol: '₹',
  primaryColor: '#FF3F6C',
  primaryColorHover: '#E02F5A',
  charcoalText: '#282C3F',
  lightBg: '#F5F5F6',

  shipping: {
    freeShippingThreshold: 999, // in INR
    standardShippingFee: 99,
    deliveryDaysMin: 3,
    deliveryDaysMax: 5,
    expressDeliveryDays: 2,
    expressFee: 149
  },

  coupons: [
    {
      code: 'TRENDORA10',
      description: '10% OFF on all orders above ₹999',
      discountPercent: 10,
      minOrderValue: 999,
      maxDiscount: 500
    },
    {
      code: 'FLAT200',
      description: 'Flat ₹200 OFF on orders above ₹1499',
      flatDiscount: 200,
      minOrderValue: 1499
    },
    {
      code: 'FIRST500',
      description: 'Flat ₹500 OFF on your first purchase above ₹2499',
      flatDiscount: 500,
      minOrderValue: 2499
    }
  ],

  contact: {
    email: 'support@trendora.com',
    phone: '+91 80 4000 7000',
    hours: '10:00 AM - 7:00 PM IST (Mon - Sat)',
    address: 'Trendora Commerce Park, Outer Ring Road, Bengaluru, Karnataka 560103, India'
  },

  socialLinks: [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Facebook', href: 'https://facebook.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'YouTube', href: 'https://youtube.com' }
  ],

  categories: [
    {
      id: 'dresses',
      name: 'Dresses',
      path: '/category/dresses',
      subcategories: [
        {
          heading: 'By Length & Silhouette',
          items: [
            { label: 'Maxi Dresses', query: 'maxi' },
            { label: 'Midi Dresses', query: 'midi' },
            { label: 'A-Line & Fit Flare', query: 'a-line' },
            { label: 'Shirt & Wrap Dresses', query: 'wrap' }
          ]
        },
        {
          heading: 'Occasions & Edits',
          items: [
            { label: 'Floral & Day Dresses', query: 'floral' },
            { label: 'Cocktail & Evening Gowns', query: 'party' },
            { label: 'Casual & Office Dresses', query: 'casual' }
          ]
        },
        {
          heading: 'Trending Silhouettes',
          items: [
            { label: 'Tiered Sundresses', query: 'tiered' },
            { label: 'Bodycon & Slit Fits', query: 'bodycon' }
          ]
        }
      ]
    },
    {
      id: 'ethnic',
      name: 'Ethnic Wear',
      path: '/category/ethnic',
      subcategories: [
        {
          heading: 'Kurtas & Kurta Sets',
          items: [
            { label: 'Anarkali Kurtas', query: 'anarkali' },
            { label: 'Straight Kurta Sets', query: 'straight-kurta' },
            { label: 'Palazzo Suit Sets', query: 'palazzo-set' },
            { label: 'Chanderi & Silk Sets', query: 'chanderi' }
          ]
        },
        {
          heading: 'Festive & Party Wear',
          items: [
            { label: 'Embroidered Suits', query: 'embroidered' },
            { label: 'Sharara & Gharara Sets', query: 'sharara' },
            { label: 'Ethnic Jackets & Shrugs', query: 'ethnic-jacket' }
          ]
        },
        {
          heading: 'Bottoms & Dupattas',
          items: [
            { label: 'Ethnic Palazzos', query: 'palazzos' },
            { label: 'Churidars & Salwars', query: 'churidars' },
            { label: 'Zari Banarasi Dupattas', query: 'dupattas' }
          ]
        }
      ]
    },
    {
      id: 'sarees',
      name: 'Sarees',
      path: '/category/sarees',
      subcategories: [
        {
          heading: 'Traditional Silks',
          items: [
            { label: 'Pure Kanjeevaram Silk', query: 'kanjeevaram' },
            { label: 'Banarasi Brocade Sarees', query: 'banarasi' },
            { label: 'Tussar & Chanderi Silk', query: 'chanderi-silk' }
          ]
        },
        {
          heading: 'Modern & Drapes',
          items: [
            { label: 'Organza Embroidered', query: 'organza' },
            { label: 'Georgette & Chiffon', query: 'georgette' },
            { label: 'Party Wear Sarees', query: 'party-saree' }
          ]
        },
        {
          heading: 'Handloom & Daily',
          items: [
            { label: 'Pure Cotton Handloom', query: 'cotton-saree' },
            { label: 'Linen Floral Sarees', query: 'linen' }
          ]
        }
      ]
    },
    {
      id: 'tops',
      name: 'Tops & Shirts',
      path: '/category/tops',
      subcategories: [
        {
          heading: 'Tops & Blouses',
          items: [
            { label: 'Floral Peplum Tops', query: 'peplum' },
            { label: 'Wrap & Sweetheart Tops', query: 'wrap' },
            { label: 'Crop Tops & Corsets', query: 'crop-tops' },
            { label: 'Puff Sleeve Blouses', query: 'puff-sleeve' }
          ]
        },
        {
          heading: 'Shirts & Tunics',
          items: [
            { label: 'Linen Button-Down Shirts', query: 'linen-shirts' },
            { label: 'Formal Office Shirts', query: 'formal-shirts' },
            { label: 'Oversized Poplin Shirts', query: 'oversized' },
            { label: 'Longline Tunics', query: 'tunics' }
          ]
        },
        {
          heading: 'T-Shirts & Tanks',
          items: [
            { label: 'Graphic Cotton Tees', query: 'graphic-tees' },
            { label: 'Ribbed Tank Tops', query: 'tank-tops' },
            { label: 'Boxy Casual Tees', query: 'boxy-tees' }
          ]
        }
      ]
    },
    {
      id: 'bottoms',
      name: 'Jeans & Bottoms',
      path: '/category/bottoms',
      subcategories: [
        {
          heading: 'Denim & Jeans',
          items: [
            { label: 'Wide-Leg Denim', query: 'wide-leg' },
            { label: 'High-Rise Mom Jeans', query: 'mom-jeans' },
            { label: 'Straight Leg Denim', query: 'straight-jeans' },
            { label: 'Flared Denim', query: 'flared' }
          ]
        },
        {
          heading: 'Trousers & Pants',
          items: [
            { label: 'Pleated High-Waist Pants', query: 'pleated-pants' },
            { label: 'Cigarette Trousers', query: 'trousers' },
            { label: 'Linen Flared Palazzos', query: 'linen-pants' }
          ]
        },
        {
          heading: 'Skirts',
          items: [
            { label: 'Accordion Pleated Midi Skirts', query: 'pleated-skirts' },
            { label: 'A-Line Flared Skirts', query: 'flared-skirts' },
            { label: 'Denim Midi Skirts', query: 'denim-skirts' }
          ]
        }
      ]
    },
    {
      id: 'coords',
      name: 'Co-Ords',
      path: '/category/coords',
      subcategories: [
        {
          heading: 'Matching Sets',
          items: [
            { label: 'Blazer & Trouser Sets', query: 'blazer-set' },
            { label: 'Crop Top & Skirt Sets', query: 'skirt-set' },
            { label: 'Resort Linen Sets', query: 'resort-set' },
            { label: 'Lounge Co-Ords', query: 'lounge-set' }
          ]
        },
        {
          heading: 'Jumpsuits & Playsuits',
          items: [
            { label: 'Belted Wide-Leg Jumpsuits', query: 'wide-jumpsuit' },
            { label: 'Tailored Evening Jumpsuits', query: 'evening-jumpsuit' },
            { label: 'Floral Playsuits', query: 'playsuits' }
          ]
        }
      ]
    },
    {
      id: 'outerwear',
      name: 'Outerwear',
      path: '/category/outerwear',
      subcategories: [
        {
          heading: 'Jackets & Blazers',
          items: [
            { label: 'Tailored Double-Breasted Blazers', query: 'blazers' },
            { label: 'Classic Denim Trucker Jackets', query: 'denim-jackets' },
            { label: 'Cropped Utility Jackets', query: 'cropped-jackets' }
          ]
        },
        {
          heading: 'Cardigans & Trench',
          items: [
            { label: 'Cashmere-Blend Knit Cardigans', query: 'cardigans' },
            { label: 'Classic Trench Coats', query: 'trench' },
            { label: 'Longline Shrugs', query: 'shrugs' }
          ]
        }
      ]
    },
    {
      id: 'deals',
      name: 'Deals & Sale',
      path: '/category/deals',
      isHot: true,
      subcategories: [
        {
          heading: 'Special Offers',
          items: [
            { label: 'Dresses Under ₹999', query: 'under-999' },
            { label: 'Kurtas Flat 50% Off', query: 'kurtas-sale' },
            { label: 'Sarees Under ₹1999', query: 'sarees-sale' },
            { label: 'Bestseller Garments', query: 'bestsellers' }
          ]
        }
      ]
    }
  ] as NavCategory[]
};
