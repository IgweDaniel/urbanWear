export const categories = [
  { id: 1, name: "summer wear" },
  { id: 2, name: "hoodies" },
  { id: 3, name: "accessories" },
  { id: 4, name: "Bottoms" },
  { id: 5, name: "jackets" },
  { id: 6, name: "tops" },
  { id: 7, name: "sweaters" },

  { id: 8, name: "shirts" },
  { id: 9, name: "foot wear" },
];

export const products = [
  {
    id: 1,
    images: [
      require("./assets/temp/Colour-Block-Hoodie-With-Front-Print-1.jpg"),
      require("./assets/temp/Colour-Block-Hoodie-With-Front-Print-2.jpg"),
    ],

    price: 20.0,
    discount: null,
    final_price: 10.0,
    category: "Hoodies",
    name: "Colour Block Hoodie With Front Print",
    sizes: ["XL", "XS", "XXS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
    inCart: false,
  },
  {
    id: 2,
    images: [
      require("./assets/temp/Ripped-Skinny-Fit-Jeans-1.jpg"),
      require("./assets/temp/Ripped-Skinny-Fit-Jeans-2.jpg"),
    ],

    price: 10.0,
    discount: 0.5,
    final_price: 5.0,
    category: "bottoms",
    name: "Ripped Skinny Fit Jeans",
    inCart: false,
    sizes: ["XL", "XXL", "XS", "L", "M"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 3,
    images: [
      require("./assets/temp/High-Waist-Denim-Shorts-1.jpg"),
      require("./assets/temp/High-Waist-Denim-Shorts-2.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "bottoms",
    name: "High Waist Denim Shorts",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },

  {
    id: 4,
    images: [
      require("./assets/temp/cargo-chino-2.jpg"),
      require("./assets/temp/cargo-chino-1.jpg"),
    ],

    price: 10.0,
    discount: 0,
    final_price: 10.0,
    category: "Bottoms",
    name: "Cargo Chino",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 5,
    images: [
      require("./assets/temp/finger-up-crop-1.jpg"),
      require("./assets/temp/finger-up-crop-2.jpg"),
    ],

    price: 10.0,
    discount: 0,
    final_price: 10.0,
    category: "shirts",
    name: "finger up crop",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 6,

    images: [
      require("./assets/temp/High-Top-Sneakers-1.jpg"),
      require("./assets/temp/High-Top-Sneakers-2.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "foot wear",
    name: "High Top Sneakers",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 7,
    images: [
      require("./assets/temp/The-White-Stripes-1.jpg"),
      require("./assets/temp/The-White-Stripes-2.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "tops",
    name: "The White Stripes",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 8,
    images: [
      require("./assets/temp/Two-Tone-Gabardine-And-Piqué-Jacket-1.jpg"),
      require("./assets/temp/Two-Tone-Gabardine-And-Piqué-Jacket-2.jpg"),
    ],
    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "Jackets",
    name: "Two-Tone Gabardine And Piqué Jacket",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 9,
    images: [
      require("./assets/temp/Oversized-W-Sweater-1.jpg"),
      require("./assets/temp/Oversized-W-Sweater-2.jpg"),
      require("./assets/temp/Oversized-W-Sweater-3.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "sweaters",
    name: "Oversized W Sweater",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 10,
    images: [
      require("./assets/temp/Sadie-Sink-Cropped-Hoodie-1.jpg"),
      require("./assets/temp/Sadie-Sink-Cropped-Hoodie-2.jpg"),
      require("./assets/temp/Sadie-Sink-Cropped-Hoodie-3.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "hoodies",
    name: "Sadie Sink Cropped Hoodie",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 11,
    images: [
      require("./assets/temp/Monochrome-Sneakers-2.jpg"),
      require("./assets/temp/Monochrome-Sneakers-1.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "foot wear",
    name: "Monochrome Sneakers",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 12,
    images: [
      require("./assets/temp/Removable-Faux-Fur-Lining-1.jpg"),
      require("./assets/temp/Removable-Faux-Fur-Lining-4.jpg"),
      require("./assets/temp/Removable-Faux-Fur-Lining-3.jpg"),
      require("./assets/temp/Removable-Faux-Fur-Lining-2.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "jackets",
    name: "Removable Faux Fur Lining",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 13,
    images: [
      require("./assets/temp/Push-up-Trousers-1.jpg"),
      require("./assets/temp/Push-up-Trousers-2.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "bottoms",
    name: "Push-up Trousers",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 14,
    images: [
      require("./assets/temp/Faux-Fur-Sweater-1.jpg"),
      require("./assets/temp/Faux-Fur-Sweater-2.jpg"),
      require("./assets/temp/Faux-Fur-Sweater-3.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "sweaters",
    name: "Faux Fur Sweater",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 15,
    images: [
      require("./assets/temp/Navy-blue-coach-jacket-with-neon-detail-2.jpg"),
      require("./assets/temp/Navy-blue-coach-jacket-with-neon-detail-1.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "jackets",
    name: "Navy blue coach jacket with neon detail",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 16,
    images: [
      require("./assets/temp/Ribbed-Hoodie-1.jpg"),
      require("./assets/temp/Ribbed-Hoodie-2.jpg"),
      require("./assets/temp/Ribbed-Hoodie-3.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "hoodies",
    name: "Ribbed Hoodie",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 17,
    images: [
      require("./assets/temp/Men’s-Thong-Sandal-1.jpg"),
      require("./assets/temp/Men’s-Thong-Sandal-2.jpg"),
      require("./assets/temp/Men’s-Thong-Sandal-3.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "foot wear",
    name: "Men’s Thong Sandal",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
  {
    id: 18,
    images: [
      require("./assets/temp/Side-Pockets-Backpack-1.jpg"),
      require("./assets/temp/Side-Pockets-Backpack-2.jpg"),
      require("./assets/temp/Side-Pockets-Backpack-3.jpg"),
    ],

    price: 5.0,
    discount: 0.5,
    final_price: 2.5,
    category: "accessories",
    name: "Side Pockets Backpack",
    inCart: false,
    sizes: ["XL", "XXL", "XS"],
    desc:
      "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
  },
];

export const cart = products
  .map((product) => ({
    product,
    size: "XL",
    quantity: Math.round(Math.random() * 9 + 1),
  }))
  .slice(0, 3);

export const orders = [
  {
    id: 234,
    date: "2020-11-05T16:17:13.851Z",
    status: "pending",
    total: 200,
  },
];

// export const products = [
//   {
//     id: 1,
//     images: [
//       require("./assets/temp/Ribbed-Hoodie-1.webp"),
//       require("./assets/temp/Ribbed-Hoodie-2.webp"),
//     ],
//     // images: [
//     //   "https://images.topman.com/i/TopMan/TM81T29VBLK_F_1.jpg?$w700$&fmt=webp&qlt=80",
//     //   "https://images.topman.com/i/TopMan/TM81T29VBLK_M_1.jpg?$w700$&fmt=webp&qlt=80",
//     // ],
//     price: 20.0,
//     discount: null,
//     final_price: 10.0,
//     category: "Jackets",
//     name: "Ribbed Hoodie",
//     sizes: ["XL", "XS", "XXS"],
//     desc:
//       "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
//     inCart: false,
//   },
//   {
//     id: 2,
//     images: [
//       require("./assets/temp/Blue-Long-shirt-1.webp"),
//       require("./assets/temp/Blue-Long-shirt-2.webp"),
//     ],
//     // images: [
//     //   "https://images.topman.com/i/TopMan/TM83L12VGRY_C_1.jpg?$w700$&fmt=webp&qlt=80",
//     //   "https://images.topman.com/i/TopMan/TM83L12VGRY_F_1.jpg?$w700$&fmt=webp&qlt=80",
//     //   "https://images.topman.com/i/TopMan/TM83L12VGRY_D_1.jpg?$w700$&fmt=webp&qlt=80",
//     // ],
//     price: 10.0,
//     discount: 0.5,
//     final_price: 5.0,
//     category: "Shirts",
//     name: "Blue Long shirt ",
//     inCart: false,
//     sizes: ["XL", "XXL", "XS", "L", "M"],
//     desc:
//       "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
//   },
//   {
//     id: 3,
//     images: [
//       require("./assets/temp/Brown-shirt-1.webp"),
//       require("./assets/temp/Brown-shirt-2.webp"),
//     ],
//     // images: [
//     //   "https://images.topman.com/i/TopMan/TM71G37BBLE_M_1.jpg?$w700$&fmt=webp&qlt=80",
//     //   "https://images.topman.com/i/TopMan/TM71G37BBLE_F_1.jpg?$w700$&fmt=webp&qlt=80",
//     //   "https://images.topman.com/i/TopMan/TM71G37BBLE_B_1.jpg?$w700$&fmt=webp&qlt=80",
//     // ],
//     price: 5.0,
//     discount: 0.5,
//     final_price: 2.5,
//     category: "Shirts",
//     name: "Brown shirt",
//     inCart: false,
//     sizes: ["XL", "XXL", "XS"],
//     desc:
//       "Remember, it’s a hammer. But this isn’t just any hammer This hammer features a 'vibration absorbing grip to improve user comfort' and is a light 14oz 'for a fast swing and reduced fatigue.''",
//   },]
