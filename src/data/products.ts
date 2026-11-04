import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // =========================================================================
  // 1. DRESSES & GOWNS (14 styles)
  // =========================================================================
  {
    id: 'wg-1',
    name: 'Floral Print A-Line Georgette Maxi Dress with Belt',
    brand: 'Vero Moda',
    category: 'dresses',
    subcategory: 'maxi',
    gender: 'Women',
    price: 1899,
    originalPrice: 3799,
    discount: 50,
    rating: 4.6,
    ratingCount: 2310,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 0 }
    ],
    colors: [
      { name: 'Blush Pink', hex: '#FAD2E1' },
      { name: 'Sage Green', hex: '#9CAF88' },
      { name: 'Navy Blue', hex: '#1D2A44' }
    ],
    tags: ['Bestseller', 'Trending'],
    description: 'Breeze through summer evenings in this ethereal A-line maxi dress featuring hand-painted botanical prints, a smocked bodice, and a coordinating faux leather sash belt.',
    material: '100% Georgette with breathable cotton lining',
    careInstructions: 'Machine wash delicate cycle in cold water. Do not bleach. Line dry in shade.',
    specs: [
      { label: 'Length', value: 'Maxi' },
      { label: 'Shape', value: 'A-Line' },
      { label: 'Neckline', value: 'V-Neck' },
      { label: 'Sleeve Length', value: 'Three-Quarter Sleeves' },
      { label: 'Closure', value: 'Concealed Side Zipper' }
    ],
    isDealOfTheDay: true,
    dealEndsAt: '2026-12-31T23:59:59',
    reviews: [
      {
        id: 'rw-1',
        author: 'Pooja Sharma',
        rating: 5,
        date: '14 Oct 2025',
        title: 'Absolutely stunning dress!',
        comment: 'The fabric feels so light yet non-sheer because of the lining. Received dozens of compliments at a beach wedding.',
        verifiedPurchase: true,
        fitFeedback: 'True to size'
      },
      {
        id: 'rw-2',
        author: 'Ananya Roy',
        rating: 4,
        date: '02 Sep 2025',
        title: 'Very pretty, fits nicely',
        comment: 'Color is slightly softer than photos, which I actually prefer. Great stitching.',
        verifiedPurchase: true,
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'wg-2',
    name: 'Satin Bias-Cut Cowl Neck Slip Midi Dress',
    brand: 'Forever New',
    category: 'dresses',
    subcategory: 'midi',
    gender: 'Women',
    price: 3499,
    originalPrice: 5999,
    discount: 41,
    rating: 4.8,
    ratingCount: 1420,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 0 }
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#F7E7CE' },
      { name: 'Emerald Green', hex: '#097969' }
    ],
    tags: ['Editor Pick', 'Trending'],
    description: 'A cocktail party showstopper cut on the bias from liquid silk satin with a fluid draped cowl neckline and adjustable crisscross back straps.',
    material: 'Premium Liquid Silk Polyester Satin',
    careInstructions: 'Dry clean only or gentle hand wash in lukewarm water.',
    specs: [
      { label: 'Length', value: 'Midi' },
      { label: 'Shape', value: 'Bias Slip' },
      { label: 'Neckline', value: 'Cowl Neck' }
    ]
  },
  {
    id: 'wg-3',
    name: 'Tiered Broderie Anglaise Cotton Sundress',
    brand: 'AND',
    category: 'dresses',
    subcategory: 'tiered',
    gender: 'Women',
    price: 1599,
    originalPrice: 3199,
    discount: 50,
    rating: 4.5,
    ratingCount: 980,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 14 },
      { size: 'XL', stock: 6 }
    ],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Buttercup Yellow', hex: '#FDE170' }
    ],
    tags: ['Bestseller'],
    description: 'Charming tiered eyelet lace sundress crafted from pure cotton with scalloped ruffle borders and a comfortable elasticated back smocking.',
    material: '100% Pure Cotton Eyelet Embroidery',
    careInstructions: 'Gentle machine wash with like colors.',
    specs: [
      { label: 'Length', value: 'Knee Length' },
      { label: 'Fit', value: 'Fit & Flare' }
    ]
  },
  {
    id: 'wg-4',
    name: 'Pleated Wrap Front Cocktail Evening Gown',
    brand: 'Mango',
    category: 'dresses',
    subcategory: 'party',
    gender: 'Women',
    price: 4499,
    originalPrice: 8999,
    discount: 50,
    rating: 4.7,
    ratingCount: 760,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 9 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 7 },
      { size: 'XL', stock: 2 }
    ],
    colors: [
      { name: 'Wine Burgundy', hex: '#722F37' },
      { name: 'Classic Black', hex: '#1C1C1C' }
    ],
    tags: ['New', 'Trending'],
    description: 'Elegantly draped surplice wrap gown with pleated accordion micro-crepe skirt and flutter cap sleeves. Perfect for gala dinners and weddings.',
    material: 'Fine Chiffon Crepe',
    careInstructions: 'Dry clean recommended.',
    specs: [
      { label: 'Length', value: 'Floor Length' },
      { label: 'Neckline', value: 'Surplice V-Neck' }
    ]
  },
  {
    id: 'wg-5',
    name: 'Belted Linen-Blend Safari Shirt Dress',
    brand: 'Zara',
    category: 'dresses',
    subcategory: 'wrap',
    gender: 'Women',
    price: 2499,
    originalPrice: 4290,
    discount: 42,
    rating: 4.4,
    ratingCount: 1120,
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 6 },
      { size: 'S', stock: 14 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 10 }
    ],
    colors: [
      { name: 'Natural Sand', hex: '#D6C5B3' },
      { name: 'Olive Green', hex: '#556B2F' }
    ],
    tags: ['Trending'],
    description: 'Utility chic redefined in a breathable linen-blend shirt dress featuring tort shell buttons, flap chest pockets, and a wide matching waist tie.',
    material: '55% Linen, 45% Viscose',
    careInstructions: 'Machine wash cold inside out.',
    specs: [
      { label: 'Length', value: 'Midi' },
      { label: 'Sleeve', value: 'Roll-tab 3/4 Sleeves' }
    ]
  },
  {
    id: 'wg-6',
    name: 'Square Neck Smocked Floral Babydoll Dress',
    brand: 'Sassafras',
    category: 'dresses',
    subcategory: 'floral',
    gender: 'Women',
    price: 999,
    originalPrice: 2299,
    discount: 56,
    rating: 4.3,
    ratingCount: 3100,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 12 },
      { size: 'S', stock: 20 },
      { size: 'M', stock: 24 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 8 }
    ],
    colors: [
      { name: 'Lavender Floral', hex: '#E6E6FA' },
      { name: 'Sky Blue Floral', hex: '#87CEEB' }
    ],
    tags: ['Bestseller', 'Sale'],
    description: 'Youthful and playful smocked bodice mini dress with puffed shoulders and a flirty ruffled hemline in pastel floral print.',
    material: '100% Breathable Rayon',
    careInstructions: 'Hand wash or delicate machine wash.',
    specs: [
      { label: 'Length', value: 'Above Knee' },
      { label: 'Neckline', value: 'Square Neck' }
    ],
    isDealOfTheDay: true,
    dealEndsAt: '2026-12-31T23:59:59'
  },
  {
    id: 'wg-7',
    name: 'Ribbed Knit Bodycon Midi Dress with Side Slit',
    brand: 'H&M',
    category: 'dresses',
    subcategory: 'bodycon',
    gender: 'Women',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.6,
    ratingCount: 1890,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 16 },
      { size: 'M', stock: 22 },
      { size: 'L', stock: 11 },
      { size: 'XL', stock: 5 }
    ],
    colors: [
      { name: 'Mocha Brown', hex: '#795548' },
      { name: 'Charcoal Black', hex: '#262626' }
    ],
    tags: ['Trending'],
    description: 'Figure-hugging ribbed jersey dress designed with a sleek crew neck, mid-calf hem, and side walking slit for ease of movement.',
    material: '95% Modal Cotton, 5% Spandex',
    careInstructions: 'Machine wash warm, lay flat to dry.',
    specs: [
      { label: 'Length', value: 'Midi' },
      { label: 'Fit', value: 'Bodycon' }
    ]
  },
  {
    id: 'wg-8',
    name: 'Boho Embroidered Kaftan Maxi Gown',
    brand: 'Global Desi',
    category: 'dresses',
    subcategory: 'maxi',
    gender: 'Women',
    price: 2799,
    originalPrice: 4999,
    discount: 44,
    rating: 4.7,
    ratingCount: 840,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'Free Size', stock: 25 },
      { size: 'S', stock: 10 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 12 }
    ],
    colors: [
      { name: 'Turquoise Blue', hex: '#40E0D0' },
      { name: 'Coral Rose', hex: '#F88379' }
    ],
    tags: ['Editor Pick'],
    description: 'Breezy bohemian kaftan featuring mirror threadwork around the V-neckline, tassel drawstring ties, and billowy kimino sleeves.',
    material: 'Mulmul Cotton Silk Blend',
    careInstructions: 'Dry clean recommended for first wash.',
    specs: [
      { label: 'Length', value: 'Floor Length' },
      { label: 'Fit', value: 'Relaxed Kaftan' }
    ]
  },
  {
    id: 'wg-9',
    name: 'Puff Sleeve Backless Tiered Cottagecore Dress',
    brand: 'Tokyo Talkies',
    category: 'dresses',
    subcategory: 'tiered',
    gender: 'Women',
    price: 899,
    originalPrice: 2199,
    discount: 59,
    rating: 4.3,
    ratingCount: 1980,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 6 },
      { size: 'S', stock: 14 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 9 }
    ],
    colors: [
      { name: 'Sage Floral', hex: '#8F9779' },
      { name: 'Rust Red', hex: '#B7410E' }
    ],
    tags: ['Sale', 'Trending'],
    description: 'Dreamy cottagecore dress with elasticated puff sleeves, tie-up open back detail, and a voluminous tiered skirt.',
    material: 'Poly Georgette with Lining',
    careInstructions: 'Machine wash gentle.',
    specs: [
      { label: 'Length', value: 'Midi' },
      { label: 'Back Detail', value: 'Tie-up Open Back' }
    ]
  },
  {
    id: 'wg-10',
    name: 'Sleeveless Halter Neck Evening Satin Slip',
    brand: 'Zara',
    category: 'dresses',
    subcategory: 'party',
    gender: 'Women',
    price: 2990,
    originalPrice: 4590,
    discount: 35,
    rating: 4.7,
    ratingCount: 650,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 11 },
      { size: 'M', stock: 13 },
      { size: 'L', stock: 6 }
    ],
    colors: [
      { name: 'Midnight Black', hex: '#0B0B0B' },
      { name: 'Ruby Wine', hex: '#9B111E' }
    ],
    tags: ['New'],
    description: 'Sensual halter neck satin dress with low draped back and asymmetrical hemline that cascades with every stride.',
    material: 'Silky Heavy Crepe Satin',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Neckline', value: 'Halter High Neck' },
      { label: 'Length', value: 'Maxi' }
    ]
  },
  {
    id: 'wg-11',
    name: 'Embroidered Net Flare Prom Gown',
    brand: 'Label Ritu Kumar',
    category: 'dresses',
    subcategory: 'party',
    gender: 'Women',
    price: 8999,
    originalPrice: 15999,
    discount: 44,
    rating: 4.9,
    ratingCount: 410,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 6 },
      { size: 'XL', stock: 2 }
    ],
    colors: [
      { name: 'Dusty Rose', hex: '#DCAE96' }
    ],
    tags: ['Editor Pick'],
    description: 'Designer evening gown featuring intricate tone-on-tone resham embroidery over gossamer net, cinched waist, and a dramatic flared skirt.',
    material: 'Embroidered Net & Shimmer Satin Lining',
    careInstructions: 'Professional dry clean only.',
    specs: [
      { label: 'Occasion', value: 'Red Carpet & Cocktail' },
      { label: 'Closure', value: 'Concealed Zipper' }
    ]
  },
  {
    id: 'wg-12',
    name: 'Printed Cotton Tiered Smock Dress with Pockets',
    brand: 'Fabindia',
    category: 'dresses',
    subcategory: 'casual',
    gender: 'Women',
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    rating: 4.6,
    ratingCount: 1530,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 19 },
      { size: 'L', stock: 17 },
      { size: 'XL', stock: 10 },
      { size: 'XXL', stock: 4 }
    ],
    colors: [
      { name: 'Indigo Dabu', hex: '#264653' },
      { name: 'Maroon Ajrakh', hex: '#800000' }
    ],
    tags: ['Bestseller'],
    description: 'Crafted from artisanal handblock printed pure cotton, this roomy smock dress features side seam pockets and a breezy relaxed silhouette.',
    material: '100% Bagru Handblock Cotton',
    careInstructions: 'Wash separately in cold water with mild detergent.',
    specs: [
      { label: 'Pockets', value: '2 Side Pockets' },
      { label: 'Length', value: 'Midi' }
    ]
  },
  {
    id: 'wg-13',
    name: 'Pleated Velvet Halter Midi Cocktail Dress',
    brand: 'Forever New',
    category: 'dresses',
    subcategory: 'party',
    gender: 'Women',
    price: 3999,
    originalPrice: 6999,
    discount: 43,
    rating: 4.8,
    ratingCount: 520,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 8 },
      { size: 'M', stock: 11 },
      { size: 'L', stock: 5 }
    ],
    colors: [
      { name: 'Emerald Velvet', hex: '#0B6623' },
      { name: 'Midnight Navy', hex: '#000080' }
    ],
    tags: ['Trending'],
    description: 'Luxe micro-pleated stretch velvet with halter strap, defined high waistband, and swirling midi hemline.',
    material: 'Plush Stretch Velvet',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Neckline', value: 'Halter Tie Neck' },
      { label: 'Length', value: 'Midi' }
    ]
  },
  {
    id: 'wg-14',
    name: 'Linen Button-Through A-Line Sundress',
    brand: 'Mango',
    category: 'dresses',
    subcategory: 'a-line',
    gender: 'Women',
    price: 2299,
    originalPrice: 4590,
    discount: 50,
    rating: 4.5,
    ratingCount: 1120,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 14 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 5 }
    ],
    colors: [
      { name: 'Terracotta', hex: '#E2725B' },
      { name: 'Oatmeal', hex: '#E3DAC9' }
    ],
    tags: ['Bestseller'],
    description: 'Classic European summer look with front natural horn buttons, structured princess seams, and wide shoulder straps.',
    material: '100% European Flax Linen',
    careInstructions: 'Machine wash cold, iron while damp.',
    specs: [
      { label: 'Shape', value: 'A-Line' },
      { label: 'Closure', value: 'Front Button Placket' }
    ]
  },

  // =========================================================================
  // 2. ETHNIC WEAR & KURTAS (14 styles)
  // =========================================================================
  {
    id: 'wg-15',
    name: 'Pure Cotton Handblock Print Anarkali Kurta Set with Dupatta',
    brand: 'Libas',
    category: 'ethnic',
    subcategory: 'anarkali',
    gender: 'Women',
    price: 2199,
    originalPrice: 4999,
    discount: 56,
    rating: 4.7,
    ratingCount: 3820,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 14 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 19 },
      { size: 'XL', stock: 8 },
      { size: 'XXL', stock: 4 }
    ],
    colors: [
      { name: 'Indigo Blue', hex: '#264653' },
      { name: 'Rust Orange', hex: '#E76F51' }
    ],
    tags: ['Bestseller'],
    description: 'Traditional Bagru handblock motif flared anarkali kurta paired with matching tapered trousers and a lightweight sheer Kota Doria dupatta bordered in gota patti.',
    material: '100% Combed Cotton & Kota Doria Dupatta',
    careInstructions: 'Gentle hand wash separately in cold water.',
    specs: [
      { label: 'Kurta Shape', value: 'Anarkali Flare' },
      { label: 'Bottom Type', value: 'Tapered Pants' },
      { label: 'Dupatta Length', value: '2.25 Meters' },
      { label: 'Sleeves', value: 'Three-Quarter' }
    ],
    isDealOfTheDay: true,
    dealEndsAt: '2026-12-31T23:59:59'
  },
  {
    id: 'wg-16',
    name: 'Zari Embroidered Chanderi Silk Kurta & Palazzo Suit Set',
    brand: 'BIBA',
    category: 'ethnic',
    subcategory: 'chanderi',
    gender: 'Women',
    price: 3599,
    originalPrice: 7199,
    discount: 50,
    rating: 4.8,
    ratingCount: 2140,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 6 }
    ],
    colors: [
      { name: 'Sage Mint', hex: '#A3B18A' },
      { name: 'Dusty Pink', hex: '#D4A373' }
    ],
    tags: ['Trending', 'Editor Pick'],
    description: 'Exquisite festive suit in glowing Chanderi silk with intricate gold threadwork around the notched mandarin collar, paired with flared palazzos and organza dupatta.',
    material: 'Chanderi Silk with Santoon Lining',
    careInstructions: 'Dry clean recommended to preserve gold embroidery.',
    specs: [
      { label: 'Kurta Length', value: 'Calf Length' },
      { label: 'Bottom', value: 'Flared Palazzo' }
    ]
  },
  {
    id: 'wg-17',
    name: 'Handcrafted Lucknowi Chikankari Georgette Kurta with Slip',
    brand: 'Fabindia',
    category: 'ethnic',
    subcategory: 'straight-kurta',
    gender: 'Women',
    price: 2499,
    originalPrice: 4499,
    discount: 44,
    rating: 4.9,
    ratingCount: 1680,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 7 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 14 },
      { size: 'XL', stock: 5 }
    ],
    colors: [
      { name: 'Pastel Lilac', hex: '#C8A2C8' },
      { name: 'Ivory Cream', hex: '#FFFDD0' },
      { name: 'Pistachio Green', hex: '#93C572' }
    ],
    tags: ['Bestseller'],
    description: 'Authentic handmade Lucknowi Chikankari embroidery featuring bakhiya, phanda, and keelkangan stitches over breezy georgette with a complimentary inner cotton slip.',
    material: 'Pure Viscose Georgette with Pure Cotton Inner',
    careInstructions: 'Hand wash gently with mild detergent.',
    specs: [
      { label: 'Embroidery', value: 'Handmade Chikankari' },
      { label: 'Cut', value: 'Straight Cut with Side Slits' }
    ]
  },
  {
    id: 'wg-18',
    name: 'Embroidered Velvet Kurta & Sharara Festive Set',
    brand: 'W for Woman',
    category: 'ethnic',
    subcategory: 'sharara',
    gender: 'Women',
    price: 4999,
    originalPrice: 9999,
    discount: 50,
    rating: 4.8,
    ratingCount: 920,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 9 },
      { size: 'XL', stock: 3 }
    ],
    colors: [
      { name: 'Royal Bottle Green', hex: '#004225' },
      { name: 'Deep Maroon', hex: '#800020' }
    ],
    tags: ['New', 'Trending'],
    description: 'Regal winter wedding ensemble crafted from rich micro-velvet, heavily embroidered with antique gold zardozi motifs along the neck and sharara tiers.',
    material: 'Micro Velvet with Shimmer Net Dupatta',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Set Details', value: 'Kurta, Sharara & Dupatta' },
      { label: 'Neck', value: 'Sweetheart Neck' }
    ]
  },
  {
    id: 'wg-19',
    name: 'Angrakha Style Printed Cotton Kurti',
    brand: 'Anouk',
    category: 'ethnic',
    subcategory: 'anarkali',
    gender: 'Women',
    price: 899,
    originalPrice: 1999,
    discount: 55,
    rating: 4.4,
    ratingCount: 2840,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 10 },
      { size: 'S', stock: 18 },
      { size: 'M', stock: 26 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 8 }
    ],
    colors: [
      { name: 'Mustard Yellow', hex: '#FFDB58' },
      { name: 'Ruby Pink', hex: '#E0115F' }
    ],
    tags: ['Sale'],
    description: 'Flattering overlapping Angrakha crossover front with handmade cloth dori tassels and gold foil booti prints on pure cotton.',
    material: '100% Breathable Cotton',
    careInstructions: 'Machine wash cold with like colors.',
    specs: [
      { label: 'Neckline', value: 'Angrakha V-Neck' },
      { label: 'Length', value: 'Knee Length' }
    ]
  },
  {
    id: 'wg-20',
    name: 'Bandhani Print Straight Fit Festive Kurta Set',
    brand: 'Libas',
    category: 'ethnic',
    subcategory: 'straight-kurta',
    gender: 'Women',
    price: 1799,
    originalPrice: 3999,
    discount: 55,
    rating: 4.5,
    ratingCount: 1750,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 22 },
      { size: 'L', stock: 16 },
      { size: 'XL', stock: 7 },
      { size: 'XXL', stock: 2 }
    ],
    colors: [
      { name: 'Crimson Red', hex: '#DC143C' },
      { name: 'Royal Sapphire', hex: '#0F52BA' }
    ],
    tags: ['Bestseller'],
    description: 'Vibrant Gujarati Bandhej dots with mirrorwork detailing on the yolk, straight silhouette trousers, and chiffon dupatta with gota border.',
    material: 'Rayon Slub Blend with Chiffon Dupatta',
    careInstructions: 'Gentle hand wash separately in cold water.',
    specs: [
      { label: 'Kurta Cut', value: 'Straight' },
      { label: 'Sleeves', value: 'Three-Quarter Sleeves' }
    ]
  },
  {
    id: 'wg-21',
    name: 'Printed A-Line Kurta with Ethnic Shrug Jacket',
    brand: 'W for Woman',
    category: 'ethnic',
    subcategory: 'ethnic-jacket',
    gender: 'Women',
    price: 2699,
    originalPrice: 5499,
    discount: 51,
    rating: 4.6,
    ratingCount: 1100,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 9 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 11 },
      { size: 'XL', stock: 5 }
    ],
    colors: [
      { name: 'Navy & Gold', hex: '#000080' }
    ],
    tags: ['Trending'],
    description: 'Contemporary two-piece ethnic fusion set featuring an inner solid A-line sleeveless kurti topped with a longline block printed sheer jacket shrug.',
    material: 'Cotton Silk Blend',
    careInstructions: 'Dry clean recommended.',
    specs: [
      { label: 'Set Includes', value: 'Kurti + Longline Shrug' }
    ]
  },
  {
    id: 'wg-22',
    name: 'Embroidered Silk Blend Peplum Kurti & Dhoti Pants',
    brand: 'Global Desi',
    category: 'ethnic',
    subcategory: 'palazzo-set',
    gender: 'Women',
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    rating: 4.7,
    ratingCount: 780,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 11 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 8 }
    ],
    colors: [
      { name: 'Teal Peacock', hex: '#008080' },
      { name: 'Rani Magenta', hex: '#FF007F' }
    ],
    tags: ['Editor Pick'],
    description: 'Festive ready peplum top with zardozi collar embroidery and flared peplum waist paired with pleated draped dhoti trousers.',
    material: 'Art Silk with Cotton Lining',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Top Style', value: 'Peplum Kurti' },
      { label: 'Bottom', value: 'Pre-stitched Dhoti Pants' }
    ]
  },
  {
    id: 'wg-23',
    name: 'Straight Linen Kurta with Thread Embroidery',
    brand: 'Fabindia',
    category: 'ethnic',
    subcategory: 'straight-kurta',
    gender: 'Women',
    price: 1890,
    originalPrice: 3290,
    discount: 43,
    rating: 4.6,
    ratingCount: 1420,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 16 },
      { size: 'M', stock: 22 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 10 }
    ],
    colors: [
      { name: 'Oatmeal Natural', hex: '#E3DAC9' },
      { name: 'Powder Blue', hex: '#B0E0E6' }
    ],
    tags: ['Bestseller'],
    description: 'Minimalist everyday elegance crafted in pure woven linen with delicate Kantha threadwork down the placket and side pockets.',
    material: '100% Handspun Linen',
    careInstructions: 'Gentle machine wash with mild liquid soap.',
    specs: [
      { label: 'Pockets', value: '2 Side Inset Pockets' },
      { label: 'Collar', value: 'Mandarin Collar' }
    ]
  },
  {
    id: 'wg-24',
    name: 'Sequinned Georgette Kalidar Kurta Set',
    brand: 'Label Ritu Kumar',
    category: 'ethnic',
    subcategory: 'anarkali',
    gender: 'Women',
    price: 7999,
    originalPrice: 14999,
    discount: 47,
    rating: 4.9,
    ratingCount: 390,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 7 },
      { size: 'L', stock: 5 },
      { size: 'XL', stock: 2 }
    ],
    colors: [
      { name: 'Antique Gold', hex: '#D4AF37' }
    ],
    tags: ['Editor Pick'],
    description: 'Heritage couture kalidar kurta adorned with shimmer micro-sequins, paired with narrow-hem pants and sheer zari organza dupatta.',
    material: 'Viscose Georgette & Organza',
    careInstructions: 'Specialist dry clean only.',
    specs: [
      { label: 'Work', value: 'Sequins & Zari' }
    ]
  },
  {
    id: 'wg-25',
    name: 'Tiered Flared Cotton Kurta with Gota Patti',
    brand: 'BIBA',
    category: 'ethnic',
    subcategory: 'anarkali',
    gender: 'Women',
    price: 1699,
    originalPrice: 3599,
    discount: 53,
    rating: 4.5,
    ratingCount: 2210,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 9 },
      { size: 'S', stock: 18 },
      { size: 'M', stock: 24 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 8 }
    ],
    colors: [
      { name: 'Sunshine Yellow', hex: '#FFD700' },
      { name: 'Peach Coral', hex: '#FFDAB9' }
    ],
    tags: ['Bestseller'],
    description: 'Festive Haldi and Mehendi ready tiered flare kurta highlighted with golden gota ribbons on every tier and neckline.',
    material: '100% Cambric Cotton',
    careInstructions: 'Hand wash gently.',
    specs: [
      { label: 'Silhouette', value: 'Flared Tiered' }
    ]
  },
  {
    id: 'wg-26',
    name: 'Printed Chanderi Straight Kurta Set with Organza Dupatta',
    brand: 'Libas',
    category: 'ethnic',
    subcategory: 'chanderi',
    gender: 'Women',
    price: 2399,
    originalPrice: 4799,
    discount: 50,
    rating: 4.6,
    ratingCount: 1630,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 11 },
      { size: 'M', stock: 19 },
      { size: 'L', stock: 14 },
      { size: 'XL', stock: 6 }
    ],
    colors: [
      { name: 'Lavender Blush', hex: '#FFF0F5' },
      { name: 'Sage Green', hex: '#9CAF88' }
    ],
    tags: ['Trending'],
    description: 'Floral printed lustrous Chanderi silk straight kurta matched with cigarette trousers and scalloped embroidered organza dupatta.',
    material: 'Chanderi Silk with Poly Crepe Lining',
    careInstructions: 'Dry clean recommended.',
    specs: [
      { label: 'Dupatta Work', value: 'Cutwork Scallop Borders' }
    ]
  },
  {
    id: 'wg-27',
    name: 'Mirrorwork Yoke Cotton Flared Kurti',
    brand: 'Anouk',
    category: 'ethnic',
    subcategory: 'straight-kurta',
    gender: 'Women',
    price: 799,
    originalPrice: 1999,
    discount: 60,
    rating: 4.4,
    ratingCount: 3410,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 14 },
      { size: 'S', stock: 24 },
      { size: 'M', stock: 30 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 12 }
    ],
    colors: [
      { name: 'Maroon', hex: '#800000' },
      { name: 'Emerald', hex: '#50C878' }
    ],
    tags: ['Sale', 'Bestseller'],
    description: 'Everyday festive kurti in soft woven cotton with sparkling foil mirror embroidery on the yoke and keyhole neckline.',
    material: '100% Breathable Cotton',
    careInstructions: 'Hand wash cold.',
    specs: [
      { label: 'Yoke Detail', value: 'Embroidered Mirrorwork' }
    ]
  },
  {
    id: 'wg-28',
    name: 'Gold Zari Border Handloom Chanderi Dupatta',
    brand: 'Fabindia',
    category: 'ethnic',
    subcategory: 'dupattas',
    gender: 'Women',
    price: 1199,
    originalPrice: 2299,
    discount: 48,
    rating: 4.8,
    ratingCount: 650,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '2.5 Meters', stock: 35 }
    ],
    colors: [
      { name: 'Metallic Gold Zari', hex: '#FFD700' },
      { name: 'Royal Ivory', hex: '#FFFFF0' }
    ],
    tags: ['Bestseller'],
    description: 'Gleaming handwoven Chanderi cotton silk dupatta finished with broad tissue zari borders and delicate corner tassels.',
    material: 'Chanderi Cotton Silk Blend with Zari',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Length', value: '2.5 Meters' },
      { label: 'Width', value: '36 Inches' }
    ]
  },

  // =========================================================================
  // 3. SAREES & DRAPES (10 styles)
  // =========================================================================
  {
    id: 'wg-29',
    name: 'Pure Kanjeevaram Silk Saree with Rich Gold Zari Pallu',
    brand: 'Label Ritu Kumar',
    category: 'sarees',
    subcategory: 'kanjeevaram',
    gender: 'Women',
    price: 5499,
    originalPrice: 12999,
    discount: 58,
    rating: 4.9,
    ratingCount: 1820,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '5.5m Saree + 0.8m Blouse', stock: 15 }
    ],
    colors: [
      { name: 'Temple Red & Gold', hex: '#B22222' },
      { name: 'Royal Peacock Blue', hex: '#004F98' },
      { name: 'Bridal Magenta', hex: '#CA1F7B' }
    ],
    tags: ['Bestseller', 'Editor Pick'],
    description: 'Woven with pure mulberry silk yarns and authentic gold zari brocade, featuring sacred temple border motifs and an unstitched brocade blouse piece.',
    material: 'Pure Mulberry Silk with Zari Threads',
    careInstructions: 'Dry clean only. Store wrapped in pure cotton or muslin cloth.',
    specs: [
      { label: 'Saree Length', value: '5.5 Metres' },
      { label: 'Blouse Piece', value: '0.8 Metres (Unstitched Brocade)' },
      { label: 'Weave Type', value: 'Kanjeevaram Handloom' },
      { label: 'Border', value: 'Korvai Temple Zari Border' }
    ],
    isDealOfTheDay: true,
    dealEndsAt: '2026-12-31T23:59:59'
  },
  {
    id: 'wg-30',
    name: 'Floral Embroidered Organza Saree with Scalloped Border',
    brand: 'BIBA',
    category: 'sarees',
    subcategory: 'organza',
    gender: 'Women',
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    rating: 4.7,
    ratingCount: 1490,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '5.5m Saree + 0.8m Blouse', stock: 18 }
    ],
    colors: [
      { name: 'Pastel Lavender', hex: '#E6E6FA' },
      { name: 'Blush Rose', hex: '#FFB6C1' }
    ],
    tags: ['Trending'],
    description: 'Airy translucent silk organza saree with delicate pastel floral resham threadwork and laser-cut scalloped borders. Comes with an embroidered silk blouse piece.',
    material: 'Pure Silk Organza',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Transparency', value: 'Sheer Translucent' },
      { label: 'Border', value: 'Scalloped Cutwork' }
    ]
  },
  {
    id: 'wg-31',
    name: 'Banarasi Brocade Tissue Silk Party Saree',
    brand: 'Libas',
    category: 'sarees',
    subcategory: 'banarasi',
    gender: 'Women',
    price: 3899,
    originalPrice: 7999,
    discount: 51,
    rating: 4.8,
    ratingCount: 1140,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '5.5m Saree + 0.8m Blouse', stock: 12 }
    ],
    colors: [
      { name: 'Metallic Rose Gold', hex: '#B76E79' },
      { name: 'Gilded Champagne', hex: '#F7E7CE' }
    ],
    tags: ['Editor Pick', 'Trending'],
    description: 'Shimmering metallic tissue silk with authentic Banarasi floral jaal weft weaving and antique zari tassels on the pallu.',
    material: 'Banarasi Tissue Silk Blend',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Weave', value: 'Kadwa Floral Brocade' }
    ]
  },
  {
    id: 'wg-32',
    name: 'Pure Linen Handwoven Floral Motif Saree',
    brand: 'Fabindia',
    category: 'sarees',
    subcategory: 'linen',
    gender: 'Women',
    price: 2699,
    originalPrice: 4899,
    discount: 45,
    rating: 4.7,
    ratingCount: 1320,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '5.5m Saree + 0.8m Blouse', stock: 20 }
    ],
    colors: [
      { name: 'Natural Sage', hex: '#9CAF88' },
      { name: 'Mustard Yellow', hex: '#FFDB58' }
    ],
    tags: ['Bestseller'],
    description: 'Breathable 80-count organic linen handloom saree adorned with botanical screen prints and contrast silver zari border.',
    material: '100% Organic Linen Handloom',
    careInstructions: 'Hand wash gently with starch for crisp drape.',
    specs: [
      { label: 'Fabric Count', value: '80 Count Fine Linen' }
    ]
  },
  {
    id: 'wg-33',
    name: 'Georgette Sequin Embellished Party Saree',
    brand: 'Forever New',
    category: 'sarees',
    subcategory: 'party-saree',
    gender: 'Women',
    price: 3299,
    originalPrice: 6599,
    discount: 50,
    rating: 4.6,
    ratingCount: 890,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '5.5m Saree + 0.8m Blouse', stock: 14 }
    ],
    colors: [
      { name: 'Midnight Sparkle', hex: '#191970' },
      { name: 'Silver Slate', hex: '#708090' }
    ],
    tags: ['Trending'],
    description: 'Bollywood glam style faux georgette saree stitched with tone-on-tone micro sequins in chevron stripes with a satin unstitched blouse.',
    material: 'Fluid Georgette with Micro Sequins',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Drape Feel', value: 'Fluid Body Hugging' }
    ]
  },
  {
    id: 'wg-34',
    name: 'Pre-Stitched Ready-to-Wear Georgette Saree with Belt',
    brand: 'AND',
    category: 'sarees',
    subcategory: 'party-saree',
    gender: 'Women',
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    rating: 4.8,
    ratingCount: 960,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 10 }
    ],
    colors: [
      { name: 'Ruby Wine', hex: '#722F37' },
      { name: 'Emerald', hex: '#097969' }
    ],
    tags: ['New', 'Trending'],
    description: 'Slip on effortlessly in 30 seconds! Pre-pleated waist with elastic waistband, attached pallu, and an embroidered metallic belt.',
    material: 'Poly Georgette with Elastic Waistband',
    careInstructions: 'Dry clean recommended.',
    specs: [
      { label: 'Type', value: 'One-Minute Ready-to-Wear' }
    ]
  },
  {
    id: 'wg-35',
    name: 'Chanderi Cotton Silk Floral Saree',
    brand: 'W for Woman',
    category: 'sarees',
    subcategory: 'chanderi-silk',
    gender: 'Women',
    price: 2199,
    originalPrice: 4299,
    discount: 49,
    rating: 4.5,
    ratingCount: 1420,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '5.5m Saree + 0.8m Blouse', stock: 16 }
    ],
    colors: [
      { name: 'Peach Coral', hex: '#FFDAB9' },
      { name: 'Aqua Mint', hex: '#7FFFD4' }
    ],
    tags: ['Bestseller'],
    description: 'Translucent gossamer Chanderi cotton silk with delicate digital water-color floral motifs and woven golden zari borders.',
    material: 'Chanderi Cotton Silk',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Pallu Design', value: 'Golden Zari Stripes' }
    ]
  },
  {
    id: 'wg-36',
    name: 'Mulmul Cotton Handblock Bagru Saree',
    brand: 'Anouk',
    category: 'sarees',
    subcategory: 'cotton-saree',
    gender: 'Women',
    price: 1199,
    originalPrice: 2499,
    discount: 52,
    rating: 4.6,
    ratingCount: 2180,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '5.5m Saree + 0.8m Blouse', stock: 25 }
    ],
    colors: [
      { name: 'Indigo Dabu', hex: '#264653' },
      { name: 'Earthy Red', hex: '#A94442' }
    ],
    tags: ['Sale', 'Bestseller'],
    description: 'Soft-as-a-cloud pure Rajasthan mulmul cotton handblock printed with natural dyes, ideal for summer daily wear and office.',
    material: '100% Breathable Mulmul Cotton',
    careInstructions: 'Wash in cold water with mild detergent.',
    specs: [
      { label: 'Print Type', value: 'Artisanal Handblock' }
    ]
  },
  {
    id: 'wg-37',
    name: 'Ombre Dyed Chiffon Saree with Gota Border',
    brand: 'BIBA',
    category: 'sarees',
    subcategory: 'georgette',
    gender: 'Women',
    price: 1899,
    originalPrice: 3799,
    discount: 50,
    rating: 4.5,
    ratingCount: 1670,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '5.5m Saree + 0.8m Blouse', stock: 17 }
    ],
    colors: [
      { name: 'Sunset Pink to Orange', hex: '#FFA07A' },
      { name: 'Sky Blue to Teal', hex: '#48D1CC' }
    ],
    tags: ['Trending'],
    description: 'Featherlight pure chiffon saree flowing from soft sunrise pink into radiant tangerine, bordered with hand-stitched gota patti ribbons.',
    material: 'Pure Chiffon with Gota Patti',
    careInstructions: 'Gentle hand wash in cold water.',
    specs: [
      { label: 'Technique', value: 'Graduated Ombre Dye' }
    ]
  },
  {
    id: 'wg-38',
    name: 'Tussar Silk Handloom Saree with Kantha Embroidery',
    brand: 'Label Ritu Kumar',
    category: 'sarees',
    subcategory: 'kanjeevaram',
    gender: 'Women',
    price: 4999,
    originalPrice: 9999,
    discount: 50,
    rating: 4.9,
    ratingCount: 560,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469668-93510cb2866c?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '5.5m Saree + 0.8m Blouse', stock: 8 }
    ],
    colors: [
      { name: 'Natural Golden Tussar', hex: '#C2B280' }
    ],
    tags: ['Editor Pick'],
    description: 'Rich textured wild Tussar silk in its raw golden hue, adorned with hand-stitched Bengal Kantha running stitch storyboards.',
    material: 'Pure Handspun Tussar Silk',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Heritage Craft', value: 'Bengal Hand Kantha Stitch' }
    ]
  },

  // =========================================================================
  // 4. TOPS, SHIRTS & BLOUSES (10 styles)
  // =========================================================================
  {
    id: 'wg-39',
    name: 'Relaxed Pure French Linen Button-Down Shirt',
    brand: 'Mango',
    category: 'tops',
    subcategory: 'linen-shirts',
    gender: 'Women',
    price: 1999,
    originalPrice: 3990,
    discount: 50,
    rating: 4.7,
    ratingCount: 1620,
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 7 },
      { size: 'S', stock: 16 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 14 },
      { size: 'XL', stock: 5 }
    ],
    colors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Sky Blue Stripe', hex: '#A0C4E2' },
      { name: 'Warm Terracotta', hex: '#CC4E5C' }
    ],
    tags: ['Bestseller'],
    description: 'An enduring wardrobe cornerstone crafted from breezy 100% Normandy flax linen. Features mother-of-pearl buttons, curved hem, and button cuffs.',
    material: '100% European Flax Linen',
    careInstructions: 'Machine wash delicate at 30°C. Reshape while wet.',
    specs: [
      { label: 'Fit', value: 'Relaxed Boyfriend Fit' },
      { label: 'Collar', value: 'Classic Point Collar' }
    ],
    isDealOfTheDay: true,
    dealEndsAt: '2026-12-31T23:59:59'
  },
  {
    id: 'wg-40',
    name: 'Floral Print Georgette Peplum Wrap Blouse',
    brand: 'Forever New',
    category: 'tops',
    subcategory: 'peplum',
    gender: 'Women',
    price: 1699,
    originalPrice: 3299,
    discount: 48,
    rating: 4.6,
    ratingCount: 1180,
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 6 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 9 }
    ],
    colors: [
      { name: 'Powder Pink Floral', hex: '#FFD1DC' },
      { name: 'Navy Botanical', hex: '#1C2951' }
    ],
    tags: ['Trending'],
    description: 'Romantic crossover wrap blouse with delicate flutter sleeves, flared peplum waistline, and an adjustable side tie bow.',
    material: 'Viscose Georgette',
    careInstructions: 'Gentle machine wash inside a laundry mesh bag.',
    specs: [
      { label: 'Neckline', value: 'Surplice V-Neck' },
      { label: 'Sleeves', value: 'Short Flutter Sleeves' }
    ]
  },
  {
    id: 'wg-41',
    name: 'Broderie Anglaise Square Neck Crop Top',
    brand: 'Zara',
    category: 'tops',
    subcategory: 'crop-tops',
    gender: 'Women',
    price: 1490,
    originalPrice: 2590,
    discount: 42,
    rating: 4.5,
    ratingCount: 940,
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 11 },
      { size: 'L', stock: 4 }
    ],
    colors: [
      { name: 'Ivory White', hex: '#FFFFF0' },
      { name: 'Lemon Yellow', hex: '#FFF44F' }
    ],
    tags: ['New'],
    description: 'Sweet square neckline crop top with eyelet embroidery, elasticated puff sleeves that can be worn on or off the shoulder, and scalloped hem.',
    material: '100% Pure Cotton',
    careInstructions: 'Machine wash cold.',
    specs: [
      { label: 'Length', value: 'Cropped' },
      { label: 'Sleeves', value: 'Puff Sleeves' }
    ]
  },
  {
    id: 'wg-42',
    name: 'Oversized Poplin Crisp Cotton Boyfriend Shirt',
    brand: 'H&M',
    category: 'tops',
    subcategory: 'oversized',
    gender: 'Women',
    price: 1299,
    originalPrice: 2299,
    discount: 43,
    rating: 4.6,
    ratingCount: 2450,
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 10 },
      { size: 'S', stock: 20 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 8 }
    ],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Powder Blue Stripe', hex: '#87CEFA' }
    ],
    tags: ['Bestseller'],
    description: 'Slouchy, high-fashion oversized shirt tailored in structured 100% cotton poplin with dropped shoulders, chest patch pocket, and exaggerated cuffs.',
    material: '100% Premium Cotton Poplin',
    careInstructions: 'Machine wash warm, iron while slightly damp.',
    specs: [
      { label: 'Fit', value: 'Oversized Slouchy' },
      { label: 'Hem', value: 'High-Low Curved Hem' }
    ]
  },
  {
    id: 'wg-43',
    name: 'Silk Halter Neck Tie-Back Party Camisole Top',
    brand: 'Vero Moda',
    category: 'tops',
    subcategory: 'wrap',
    gender: 'Women',
    price: 1199,
    originalPrice: 2499,
    discount: 52,
    rating: 4.5,
    ratingCount: 820,
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 7 }
    ],
    colors: [
      { name: 'Champagne Satin', hex: '#F7E7CE' },
      { name: 'Black Onyx', hex: '#0F0F0F' }
    ],
    tags: ['Trending'],
    description: 'Lustrous satin camisole top with chic halterneck ties at the nape, open back, and cowl front drape.',
    material: 'Silk Polyester Satin',
    careInstructions: 'Gentle hand wash.',
    specs: [
      { label: 'Neckline', value: 'Halter Tie Neck' }
    ]
  },
  {
    id: 'wg-44',
    name: 'Graphic Print Heavyweight Cotton Oversized Tee',
    brand: 'Tokyo Talkies',
    category: 'tops',
    subcategory: 'graphic-tees',
    gender: 'Women',
    price: 599,
    originalPrice: 1499,
    discount: 60,
    rating: 4.4,
    ratingCount: 3950,
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 15 },
      { size: 'S', stock: 25 },
      { size: 'M', stock: 35 },
      { size: 'L', stock: 22 },
      { size: 'XL', stock: 14 }
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#36454F' },
      { name: 'Off-White', hex: '#FAF9F6' }
    ],
    tags: ['Bestseller', 'Sale'],
    description: '220 GSM heavyweight combed cotton t-shirt with vintage Parisian typography back print and ribbed crew neckline.',
    material: '100% Combed Cotton Single Jersey',
    careInstructions: 'Machine wash cold.',
    specs: [
      { label: 'GSM', value: '220 GSM' },
      { label: 'Fit', value: 'Drop Shoulder Oversized' }
    ]
  },
  {
    id: 'wg-45',
    name: 'Sweetheart Neckline Puff-Sleeve Corset Blouse',
    brand: 'Sassafras',
    category: 'tops',
    subcategory: 'puff-sleeve',
    gender: 'Women',
    price: 899,
    originalPrice: 2199,
    discount: 59,
    rating: 4.3,
    ratingCount: 1640,
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 14 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 9 }
    ],
    colors: [
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Emerald', hex: '#004B49' }
    ],
    tags: ['Trending'],
    description: 'Corset-style boned front stitching with flattering sweetheart neckline, organza sheer puff sleeves, and smocked back for comfort.',
    material: 'Stretch Crepe & Organza',
    careInstructions: 'Gentle hand wash.',
    specs: [
      { label: 'Neckline', value: 'Sweetheart Neck' }
    ]
  },
  {
    id: 'wg-46',
    name: 'Ribbed Knit Square-Neck Fitted Tank Top',
    brand: 'Zara',
    category: 'tops',
    subcategory: 'tank-tops',
    gender: 'Women',
    price: 790,
    originalPrice: 1490,
    discount: 47,
    rating: 4.6,
    ratingCount: 2890,
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 12 },
      { size: 'S', stock: 24 },
      { size: 'M', stock: 30 },
      { size: 'L', stock: 18 }
    ],
    colors: [
      { name: 'Warm Taupe', hex: '#483C32' },
      { name: 'Cream Ivory', hex: '#FFFFF0' },
      { name: 'Forest Green', hex: '#228B22' }
    ],
    tags: ['Bestseller'],
    description: 'Substantial wide-ribbed knit tank top with wide bra-friendly shoulder straps and modern square neckline.',
    material: '92% Cotton, 8% Elastane',
    careInstructions: 'Machine wash cold.',
    specs: [
      { label: 'Fit', value: 'Slim Fit' }
    ]
  },
  {
    id: 'wg-47',
    name: 'Embroidered Kaftan Tunic Top with Tassels',
    brand: 'Global Desi',
    category: 'tops',
    subcategory: 'tunics',
    gender: 'Women',
    price: 1399,
    originalPrice: 2799,
    discount: 50,
    rating: 4.5,
    ratingCount: 970,
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 17 },
      { size: 'L', stock: 13 },
      { size: 'XL', stock: 6 }
    ],
    colors: [
      { name: 'Mustard Geo', hex: '#FFDB58' },
      { name: 'Navy Aztec', hex: '#002244' }
    ],
    tags: ['Sale'],
    description: 'Breezy hip-length tunic top with bohemian geometric threadwork on the neckline and batwing 3/4 sleeves.',
    material: '100% Viscose Rayon',
    careInstructions: 'Gentle machine wash.',
    specs: [
      { label: 'Length', value: 'Hip Length Tunic' }
    ]
  },
  {
    id: 'wg-48',
    name: 'Satin Tie-Neck Formal Office Blouse',
    brand: 'AND',
    category: 'tops',
    subcategory: 'formal-shirts',
    gender: 'Women',
    price: 1599,
    originalPrice: 2999,
    discount: 47,
    rating: 4.6,
    ratingCount: 780,
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 4 }
    ],
    colors: [
      { name: 'Pearl White', hex: '#F0EAD6' },
      { name: 'Dusty Lavender', hex: '#BDBBD7' }
    ],
    tags: ['Editor Pick'],
    description: 'Professional pussy-bow tie collar blouse in matte satin with concealed front placket and buttoned cuffs.',
    material: 'Poly Matte Satin',
    careInstructions: 'Machine wash delicate cycle.',
    specs: [
      { label: 'Collar', value: 'Pussy-Bow Tie Neck' }
    ]
  },

  // =========================================================================
  // 5. JEANS, TROUSERS & SKIRTS (10 styles)
  // =========================================================================
  {
    id: 'wg-49',
    name: "High-Rise Wide-Leg Rigid Denim Jeans",
    brand: "Levis",
    category: 'bottoms',
    subcategory: 'wide-leg',
    gender: 'Women',
    price: 2699,
    originalPrice: 4999,
    discount: 46,
    rating: 4.7,
    ratingCount: 2910,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '26', stock: 8 },
      { size: '28', stock: 18 },
      { size: '30', stock: 24 },
      { size: '32', stock: 16 },
      { size: '34', stock: 6 }
    ],
    colors: [
      { name: 'Vintage Light Indigo', hex: '#7298B3' },
      { name: 'Faded Black', hex: '#313131' }
    ],
    tags: ['Bestseller', 'Trending'],
    description: 'Flattering retro 90s silhouette sitting snug at the natural waist before breaking into a relaxed, pooling wide-leg puddle hem.',
    material: '100% Non-Stretch Cotton Denim',
    careInstructions: 'Machine wash cold inside-out. Avoid frequent washing to preserve wash.',
    specs: [
      { label: 'Rise', value: 'High Rise (11.5 inches)' },
      { label: 'Leg Fit', value: 'Wide Leg' },
      { label: 'Fly', value: 'Zip Fly with Shank Button' }
    ],
    isDealOfTheDay: true,
    dealEndsAt: '2026-12-31T23:59:59'
  },
  {
    id: 'wg-50',
    name: 'Pleated High-Waist Wide-Leg Tailored Trousers',
    brand: 'Zara',
    category: 'bottoms',
    subcategory: 'pleated-pants',
    gender: 'Women',
    price: 2990,
    originalPrice: 4590,
    discount: 35,
    rating: 4.8,
    ratingCount: 1840,
    images: [
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 6 },
      { size: 'S', stock: 14 },
      { size: 'M', stock: 19 },
      { size: 'L', stock: 11 }
    ],
    colors: [
      { name: 'Camel Tan', hex: '#C19A6B' },
      { name: 'Slate Grey', hex: '#708090' },
      { name: 'Midnight Black', hex: '#111111' }
    ],
    tags: ['Trending', 'Editor Pick'],
    description: 'Sleek menswear-inspired pleated trousers cut from draping crepe twill with deep front darts, slant side pockets, and an elongating floor-skimming cut.',
    material: 'Polyester Rayon Spandex Suiting Twill',
    careInstructions: 'Machine wash cold delicate.',
    specs: [
      { label: 'Waist', value: 'High Waist with Belt Loops' },
      { label: 'Pockets', value: '2 Slanted Front Pockets' }
    ]
  },
  {
    id: 'wg-51',
    name: 'Accordion Pleated Shimmer Satin Midi Skirt',
    brand: 'Mango',
    category: 'bottoms',
    subcategory: 'pleated-skirts',
    gender: 'Women',
    price: 1899,
    originalPrice: 3590,
    discount: 47,
    rating: 4.6,
    ratingCount: 1290,
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 9 }
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#F7E7CE' },
      { name: 'Emerald Green', hex: '#004B49' }
    ],
    tags: ['Bestseller'],
    description: 'Fluid accordion pleated skirt crafted in luminous shimmer satin with a comfortable flat-faced elasticated waistband.',
    material: '100% Satin Polyester',
    careInstructions: 'Hand wash gently or wash in mesh laundry bag.',
    specs: [
      { label: 'Length', value: 'Midi (Below Knee)' },
      { label: 'Waist', value: 'Elastic Waistband' }
    ]
  },
  {
    id: 'wg-52',
    name: 'Ankle-Length Cigarette Stretch Trousers',
    brand: 'AND',
    category: 'bottoms',
    subcategory: 'trousers',
    gender: 'Women',
    price: 1499,
    originalPrice: 2799,
    discount: 46,
    rating: 4.5,
    ratingCount: 1580,
    images: [
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '28', stock: 10 },
      { size: '30', stock: 20 },
      { size: '32', stock: 18 },
      { size: '34', stock: 8 }
    ],
    colors: [
      { name: 'Navy Blue', hex: '#000080' },
      { name: 'Black', hex: '#0A0A0A' }
    ],
    tags: ['Bestseller'],
    description: 'Clean-cut workwear cigarette trousers in 4-way stretch ponte fabric with side ankle vents and tummy-smoothing waistband.',
    material: 'Rayon Nylon Spandex Ponte',
    careInstructions: 'Machine wash cold.',
    specs: [
      { label: 'Cut', value: 'Slim Cigarette' },
      { label: 'Length', value: 'Ankle Length' }
    ]
  },
  {
    id: 'wg-53',
    name: 'Washed Denim Split Front Midi Skirt',
    brand: 'Vero Moda',
    category: 'bottoms',
    subcategory: 'denim-skirts',
    gender: 'Women',
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    rating: 4.6,
    ratingCount: 840,
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '26', stock: 6 },
      { size: '28', stock: 14 },
      { size: '30', stock: 16 },
      { size: '32', stock: 7 }
    ],
    colors: [
      { name: 'Mid Vintage Blue', hex: '#5B7C99' }
    ],
    tags: ['Trending'],
    description: 'Trending high-rise denim column midi skirt with a center front walking slit, classic 5-pocket styling, and raw hem.',
    material: '100% Cotton Denim',
    careInstructions: 'Machine wash inside out.',
    specs: [
      { label: 'Length', value: 'Calf Length Midi' },
      { label: 'Detail', value: 'Front Walking Slit' }
    ]
  },
  {
    id: 'wg-54',
    name: "Classic High-Rise Straight Jeans",
    brand: "Levis",
    category: 'bottoms',
    subcategory: 'straight-jeans',
    gender: 'Women',
    price: 2499,
    originalPrice: 4299,
    discount: 42,
    rating: 4.8,
    ratingCount: 3200,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '26', stock: 10 },
      { size: '28', stock: 22 },
      { size: '30', stock: 26 },
      { size: '32', stock: 15 },
      { size: '34', stock: 7 }
    ],
    colors: [
      { name: 'Dark Indigo Wash', hex: '#1E2952' },
      { name: 'Medium Stonewash', hex: '#4682B4' }
    ],
    tags: ['Bestseller'],
    description: 'The iconic high-rise straight leg jeans with signature arcuate back pocket stitching and stretch denim for all-day comfort.',
    material: '99% Cotton, 1% Elastane',
    careInstructions: 'Machine wash cold.',
    specs: [
      { label: 'Rise', value: 'High Rise' },
      { label: 'Leg', value: 'Straight Cut' }
    ]
  },
  {
    id: 'wg-55',
    name: 'Flared Pure Linen Summer Palazzos',
    brand: 'Fabindia',
    category: 'bottoms',
    subcategory: 'linen-pants',
    gender: 'Women',
    price: 1790,
    originalPrice: 2990,
    discount: 40,
    rating: 4.7,
    ratingCount: 1410,
    images: [
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 14 },
      { size: 'M', stock: 22 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 10 }
    ],
    colors: [
      { name: 'Oatmeal Beige', hex: '#D2B48C' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    tags: ['Bestseller'],
    description: 'Extra-wide flared palazzos woven from pure organic linen with a drawstring elastic waist and deep side pockets.',
    material: '100% Pure Linen',
    careInstructions: 'Machine wash gentle, hang in shade.',
    specs: [
      { label: 'Fit', value: 'Extra Flared Palazzo' },
      { label: 'Pockets', value: '2 Side Pockets' }
    ]
  },
  {
    id: 'wg-56',
    name: 'Tiered Floral Ruffle Bohemian Maxi Skirt',
    brand: 'Global Desi',
    category: 'bottoms',
    subcategory: 'flared-skirts',
    gender: 'Women',
    price: 1699,
    originalPrice: 3499,
    discount: 51,
    rating: 4.5,
    ratingCount: 1100,
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 9 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 5 }
    ],
    colors: [
      { name: 'Rust Floral', hex: '#B7410E' },
      { name: 'Teal Blue', hex: '#008080' }
    ],
    tags: ['Trending'],
    description: 'Full-volume tiered maxi skirt with vibrant bohemian floral motifs, elastic smocked waist, and ruffle trimmed tiers.',
    material: '100% Breathable Rayon',
    careInstructions: 'Hand wash cold.',
    specs: [
      { label: 'Length', value: 'Floor Length Maxi' }
    ]
  },
  {
    id: 'wg-57',
    name: 'High-Rise 70s Flare Stretch Jeans',
    brand: 'H&M',
    category: 'bottoms',
    subcategory: 'flared',
    gender: 'Women',
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    rating: 4.6,
    ratingCount: 1650,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '26', stock: 7 },
      { size: '28', stock: 15 },
      { size: '30', stock: 19 },
      { size: '32', stock: 10 }
    ],
    colors: [
      { name: 'Washed Black', hex: '#1C1C1C' },
      { name: 'Classic Blue', hex: '#2B4F81' }
    ],
    tags: ['Trending'],
    description: 'Retro bell-bottom flare jeans crafted with power stretch denim that shapes hips and thighs before breaking into a wide bell hem.',
    material: '92% Cotton, 6% Elastomultiester, 2% Elastane',
    careInstructions: 'Machine wash warm.',
    specs: [
      { label: 'Hem Type', value: '70s Bell Flare' }
    ]
  },
  {
    id: 'wg-58',
    name: 'Relaxed High-Waist Mom Jeans with Distressed Knees',
    brand: 'Tokyo Talkies',
    category: 'bottoms',
    subcategory: 'mom-jeans',
    gender: 'Women',
    price: 1199,
    originalPrice: 2499,
    discount: 52,
    rating: 4.4,
    ratingCount: 2100,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: '26', stock: 9 },
      { size: '28', stock: 18 },
      { size: '30', stock: 22 },
      { size: '32', stock: 12 }
    ],
    colors: [
      { name: 'Bleach Light Blue', hex: '#ADD8E6' }
    ],
    tags: ['Sale'],
    description: 'Casual tapered mom fit with subtle knee distress, ankle crop length, and authentic non-stretch cotton feel.',
    material: '100% Cotton Denim',
    careInstructions: 'Machine wash cold.',
    specs: [
      { label: 'Fit', value: 'Tapered Mom Fit' }
    ]
  },

  // =========================================================================
  // 6. CO-ORDS & JUMPSUITS (6 styles)
  // =========================================================================
  {
    id: 'wg-59',
    name: 'Tailored Linen Blazer & Trouser Two-Piece Co-Ord Set',
    brand: 'Mango',
    category: 'coords',
    subcategory: 'blazer-set',
    gender: 'Women',
    price: 4999,
    originalPrice: 8999,
    discount: 44,
    rating: 4.8,
    ratingCount: 940,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 8 }
    ],
    colors: [
      { name: 'Oatmeal Natural', hex: '#E3DAC9' },
      { name: 'Terracotta Coral', hex: '#D27D62' }
    ],
    tags: ['Editor Pick', 'Trending'],
    description: 'Chic matching co-ord set featuring a relaxed single-breasted notch-lapel blazer paired with high-waist straight-leg trousers.',
    material: '55% Linen, 45% Cotton',
    careInstructions: 'Dry clean recommended.',
    specs: [
      { label: 'Set Details', value: 'Blazer + Matching Trousers' }
    ],
    isDealOfTheDay: true,
    dealEndsAt: '2026-12-31T23:59:59'
  },
  {
    id: 'wg-60',
    name: 'Belted Wide-Leg Linen Blend Jumpsuit',
    brand: 'Forever New',
    category: 'coords',
    subcategory: 'wide-jumpsuit',
    gender: 'Women',
    price: 3299,
    originalPrice: 5999,
    discount: 45,
    rating: 4.7,
    ratingCount: 1120,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 11 },
      { size: 'XL', stock: 4 }
    ],
    colors: [
      { name: 'Olive Green', hex: '#556B2F' },
      { name: 'Black', hex: '#111111' }
    ],
    tags: ['Bestseller'],
    description: 'Effortless one-and-done ensemble featuring a sleeveless notched collar bodice, tortoise buckle belt, and sweeping wide-leg pants.',
    material: 'Viscose Linen Blend',
    careInstructions: 'Machine wash delicate cold.',
    specs: [
      { label: 'Neck', value: 'V-Neck Lapel' },
      { label: 'Closure', value: 'Concealed Back Zipper' }
    ]
  },
  {
    id: 'wg-61',
    name: 'Floral Crop Top & Tiered Flared Maxi Skirt Set',
    brand: 'Sassafras',
    category: 'coords',
    subcategory: 'skirt-set',
    gender: 'Women',
    price: 1799,
    originalPrice: 3599,
    discount: 50,
    rating: 4.5,
    ratingCount: 1650,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 10 }
    ],
    colors: [
      { name: 'Blush Daisy', hex: '#FFB7B2' },
      { name: 'Sky Gingham', hex: '#87CEEB' }
    ],
    tags: ['Trending'],
    description: 'Vacation-ready vacation co-ord featuring a smocked back sweetheart crop top and matching voluminous tiered maxi skirt.',
    material: '100% Rayon Cotton',
    careInstructions: 'Machine wash cold.',
    specs: [
      { label: 'Set Style', value: '2-Piece Vacation Co-ord' }
    ]
  },
  {
    id: 'wg-62',
    name: 'Ribbed Knit Sweater & Wide-Leg Pants Lounge Set',
    brand: 'H&M',
    category: 'coords',
    subcategory: 'lounge-set',
    gender: 'Women',
    price: 2499,
    originalPrice: 4299,
    discount: 42,
    rating: 4.8,
    ratingCount: 1380,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 6 },
      { size: 'S', stock: 14 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 9 }
    ],
    colors: [
      { name: 'Heather Grey', hex: '#D3D3D3' },
      { name: 'Warm Cream', hex: '#FFFDD0' }
    ],
    tags: ['Bestseller'],
    description: 'Ultra-plush fine rib knit lounge set with relaxed drop-shoulder pullover sweater and matching drawstring elastic wide trousers.',
    material: 'Soft Viscose Modal Knit',
    careInstructions: 'Machine wash delicate, lay flat to dry.',
    specs: [
      { label: 'Occasion', value: 'Airport, Travel & Lounge' }
    ]
  },
  {
    id: 'wg-63',
    name: 'Tailored Satin Wrap Evening Jumpsuit',
    brand: 'Zara',
    category: 'coords',
    subcategory: 'evening-jumpsuit',
    gender: 'Women',
    price: 3990,
    originalPrice: 6590,
    discount: 39,
    rating: 4.8,
    ratingCount: 710,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 10 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 6 }
    ],
    colors: [
      { name: 'Emerald Green', hex: '#004B49' },
      { name: 'Obsidian Black', hex: '#0B0B0B' }
    ],
    tags: ['Editor Pick'],
    description: 'Sophisticated alternative to the cocktail dress with wrap surplice neckline, long bishop sleeves, and satin sash belt.',
    material: 'Heavy Crepe Satin',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Fit', value: 'Wide Leg Evening Cut' }
    ]
  },
  {
    id: 'wg-64',
    name: 'Resort Linen Short Sleeve Shirt & Shorts Co-Ord',
    brand: 'AND',
    category: 'coords',
    subcategory: 'resort-set',
    gender: 'Women',
    price: 2199,
    originalPrice: 3999,
    discount: 45,
    rating: 4.6,
    ratingCount: 880,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 11 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 12 }
    ],
    colors: [
      { name: 'Striped Navy', hex: '#000080' },
      { name: 'Sage Green', hex: '#9CAF88' }
    ],
    tags: ['New'],
    description: 'Breezy camp-collar button shirt paired with high-rise elastic drawstring shorts in pure washed cotton linen.',
    material: 'Cotton Linen Blend',
    careInstructions: 'Machine wash cold.',
    specs: [
      { label: 'Set Type', value: 'Camp Shirt + Shorts' }
    ]
  },

  // =========================================================================
  // 7. JACKETS, BLAZERS & OUTERWEAR (6 styles)
  // =========================================================================
  {
    id: 'wg-65',
    name: "Classic Trucker Denim Jacket in Vintage Wash",
    brand: "Levis",
    category: 'outerwear',
    subcategory: 'denim-jackets',
    gender: 'Women',
    price: 2899,
    originalPrice: 4999,
    discount: 42,
    rating: 4.8,
    ratingCount: 3400,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 18 },
      { size: 'M', stock: 24 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 6 }
    ],
    colors: [
      { name: 'Medium Indigo', hex: '#3B6A99' },
      { name: 'Washed Black', hex: '#2B2B2B' }
    ],
    tags: ['Bestseller'],
    description: 'The authentic original denim trucker jacket built with durable cotton twill, branded metal buttons, and dual chest button-flap pockets.',
    material: '100% Heavyweight Cotton Denim',
    careInstructions: 'Machine wash cold inside out with like colors.',
    specs: [
      { label: 'Closure', value: 'Front Shank Button Placket' },
      { label: 'Pockets', value: '2 Flap Chest Pockets & 2 Welt Hand Pockets' }
    ],
    isDealOfTheDay: true,
    dealEndsAt: '2026-12-31T23:59:59'
  },
  {
    id: 'wg-66',
    name: 'Tailored Double-Breasted Structured Wool-Blend Blazer',
    brand: 'Zara',
    category: 'outerwear',
    subcategory: 'blazers',
    gender: 'Women',
    price: 4590,
    originalPrice: 6990,
    discount: 34,
    rating: 4.9,
    ratingCount: 1620,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 14 },
      { size: 'M', stock: 17 },
      { size: 'L', stock: 9 }
    ],
    colors: [
      { name: 'Houndstooth Plaid', hex: '#333333' },
      { name: 'Classic Black', hex: '#0C0C0C' }
    ],
    tags: ['Editor Pick', 'Trending'],
    description: 'Impeccably sharp tailored blazer with peak lapels, tortoiseshell buttons, padded shoulders, and full satin interior lining.',
    material: 'Wool Viscose Blend with Polyester Lining',
    careInstructions: 'Professional dry clean only.',
    specs: [
      { label: 'Lapel', value: 'Peak Lapel' },
      { label: 'Fit', value: 'Tailored Structured Fit' }
    ]
  },
  {
    id: 'wg-67',
    name: 'Belted Double-Breasted Water-Resistant Trench Coat',
    brand: 'Mango',
    category: 'outerwear',
    subcategory: 'trench',
    gender: 'Women',
    price: 5499,
    originalPrice: 9999,
    discount: 45,
    rating: 4.8,
    ratingCount: 1180,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 9 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 10 }
    ],
    colors: [
      { name: 'Classic Khaki Tan', hex: '#C3B091' },
      { name: 'Navy', hex: '#000080' }
    ],
    tags: ['Editor Pick'],
    description: 'Timeless outerwear investment featuring storm flap, buckled wrist cuffs, epaulettes, and removable waist tie belt.',
    material: '100% Water-Resistant Cotton Twill',
    careInstructions: 'Dry clean only.',
    specs: [
      { label: 'Length', value: 'Knee Length' },
      { label: 'Belt', value: 'Buckled Waist Sash' }
    ]
  },
  {
    id: 'wg-68',
    name: 'Cashmere-Blend Button-Front Knit Cardigan',
    brand: 'Vero Moda',
    category: 'outerwear',
    subcategory: 'cardigans',
    gender: 'Women',
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    rating: 4.7,
    ratingCount: 1420,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'XS', stock: 7 },
      { size: 'S', stock: 16 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 12 }
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#D7C4B7' },
      { name: 'Sage Green', hex: '#9CAF88' }
    ],
    tags: ['Bestseller'],
    description: 'Cloud-soft fine knit cardigan with ribbed V-neckline, tortoiseshell statement buttons, and ribbed cuffs.',
    material: '5% Cashmere, 45% Wool, 50% Viscose',
    careInstructions: 'Hand wash cold, dry flat.',
    specs: [
      { label: 'Gauge', value: 'Fine 12-Gauge Knit' }
    ]
  },
  {
    id: 'wg-69',
    name: 'Cropped Denim Biker Jacket with Fringe',
    brand: 'Tokyo Talkies',
    category: 'outerwear',
    subcategory: 'cropped-jackets',
    gender: 'Women',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    rating: 4.4,
    ratingCount: 980,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 10 }
    ],
    colors: [
      { name: 'Washed Stone Blue', hex: '#58728F' }
    ],
    tags: ['Trending'],
    description: 'Edgy cropped biker silhouette in stonewashed denim with asymmetrical front zipper, silver snaps, and waist belt loops.',
    material: '100% Cotton Denim',
    careInstructions: 'Machine wash cold.',
    specs: [
      { label: 'Length', value: 'Cropped Waist Length' }
    ]
  },
  {
    id: 'wg-70',
    name: 'Longline Floral Embroidered Bohemian Shrug',
    brand: 'Global Desi',
    category: 'outerwear',
    subcategory: 'shrugs',
    gender: 'Women',
    price: 1799,
    originalPrice: 3499,
    discount: 48,
    rating: 4.6,
    ratingCount: 890,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: [
      { size: 'Free Size', stock: 30 },
      { size: 'S', stock: 10 },
      { size: 'M', stock: 15 }
    ],
    colors: [
      { name: 'Ivory Multicolor', hex: '#FFFFF0' },
      { name: 'Midnight Navy', hex: '#001F3F' }
    ],
    tags: ['New'],
    description: 'Semi-sheer open front layering shrug with colorful botanical embroidery along the lapels and breezy side slits.',
    material: 'Cotton Slub Georgette',
    careInstructions: 'Gentle hand wash.',
    specs: [
      { label: 'Length', value: 'Below Knee Longline' }
    ]
  }
];

export const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.brand))).sort();

export const CATEGORIES_LIST = [
  { id: 'all', name: "All Women's Garments" },
  { id: 'dresses', name: 'Dresses & Gowns' },
  { id: 'ethnic', name: 'Ethnic Wear & Kurtas' },
  { id: 'sarees', name: 'Sarees & Drapes' },
  { id: 'tops', name: 'Tops, Shirts & Blouses' },
  { id: 'bottoms', name: 'Jeans & Bottoms' },
  { id: 'coords', name: 'Co-Ords & Jumpsuits' },
  { id: 'outerwear', name: 'Jackets & Blazers' },
  { id: 'deals', name: 'Deals & Clearance' }
];
