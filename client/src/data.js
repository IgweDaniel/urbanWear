export const categories = [
  "SUMMER wear",
  "HOODIES",
  "ACCESORIES",
  "TROUSER",
  "JACKETS",
  "SUITS",
];

export const products = [
  {
    id: 1,
    images: [
      "https://images.topman.com/i/TopMan/TM81T29VBLK_F_1.jpg?$w700$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM81T29VBLK_M_1.jpg?$w700$&fmt=webp&qlt=80",
    ],
    price: 10.0,
    discount: null,
    final_price: 5.0,
    category: "Jackets",
    name: "Ribbed Hoodie",
    sizes: ["XL", "XS", "XXS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
    inCart: false,
  },
  {
    id: 2,
    images: [
      "https://images.topman.com/i/TopMan/TM83L12VGRY_F_1.jpg?$w700$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM83L12VGRY_C_1.jpg?$w700$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM83L12VGRY_D_1.jpg?$w700$&fmt=webp&qlt=80",
    ],
    price: 10.0,
    discount: 0.5,
    final_price: 5.0,
    category: "Shirts",
    name: "Blue Long shirt",
    inCart: false,
    sizes: ["XL", "XXL", "XS", "L", "M"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 3,
    images: [
      "https://images.topman.com/i/TopMan/TM71G37BBLE_M_1.jpg?$w700$&fmt=webp&qlt=80",
      "https://images.topman.com/i/TopMan/TM71G37BBLE_F_1.jpg?$w700$&fmt=webp&qlt=80",
      // "https://images.topman.com/i/TopMan/TM83L12VGRY_D_1.jpg?$w700$&fmt=webp&qlt=80",
    ],
    price: 10.0,
    discount: 0.5,
    final_price: 5.0,
    category: "Shirts",
    name: "Blue Long shirt",
    inCart: false,
    sizes: ["XL", "XXL", "XS", "L", "M"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
];

export const cart = products.map((product) => ({
  product,
  size: "XL",
  quantity: Math.round(Math.random() * 9 + 1),
}));
export const sizes = ["XL", "XXL", "L", "S", "XS", "M", "XXS"];
