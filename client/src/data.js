export const categories = [
  { id: 1, name: "summer wear" },
  { id: 2, name: "hoodies" },
  { id: 3, name: "accessories" },
  { id: 4, name: "trouser" },
  { id: 5, name: "jackets" },
  { id: 6, name: "suits" },
  { id: 7, name: "shirts" },
];

export const products = [
  {
    id: 1,
    images: [
      require("./assets/temp/Ribbed-Hoodie-1.webp"),
      require("./assets/temp/Ribbed-Hoodie-2.webp"),
    ],
    // images: [
    //   "https://images.topman.com/i/TopMan/TM81T29VBLK_F_1.jpg?$w700$&fmt=webp&qlt=80",
    //   "https://images.topman.com/i/TopMan/TM81T29VBLK_M_1.jpg?$w700$&fmt=webp&qlt=80",
    // ],
    price: 20.0,
    discount: null,
    final_price: 10.0,
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
      require("./assets/temp/Blue-Long-shirt-1.webp"),
      require("./assets/temp/Blue-Long-shirt-2.webp"),
    ],
    // images: [
    //   "https://images.topman.com/i/TopMan/TM83L12VGRY_C_1.jpg?$w700$&fmt=webp&qlt=80",
    //   "https://images.topman.com/i/TopMan/TM83L12VGRY_F_1.jpg?$w700$&fmt=webp&qlt=80",
    //   "https://images.topman.com/i/TopMan/TM83L12VGRY_D_1.jpg?$w700$&fmt=webp&qlt=80",
    // ],
    price: 10.0,
    discount: 0.5,
    final_price: 5.0,
    category: "Shirts",
    name: "Blue Long shirt ",
    inCart: false,
    sizes: ["XL", "XXL", "XS", "L", "M"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 3,
    images: [
      require("./assets/temp/Brown-shirt-1.webp"),
      require("./assets/temp/Brown-shirt-2.webp"),
    ],
    // images: [
    //   "https://images.topman.com/i/TopMan/TM71G37BBLE_M_1.jpg?$w700$&fmt=webp&qlt=80",
    //   "https://images.topman.com/i/TopMan/TM71G37BBLE_F_1.jpg?$w700$&fmt=webp&qlt=80",
    //   "https://images.topman.com/i/TopMan/TM71G37BBLE_B_1.jpg?$w700$&fmt=webp&qlt=80",
    // ],
    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "Shirts",
    name: "Brown shirt",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
];

export const cart = products.map((product) => ({
  product,
  size: "XL",
  quantity: Math.round(Math.random() * 9 + 1),
}));
// .slice(0, 2);
