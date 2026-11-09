export interface Flower {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export const flowers: Flower[] = [
  {
    id: 1,
    name: "Rose Bouquet",
    category: "Mawar",
    price: 150000,
    description:
      "Buket mawar romantis yang cocok untuk ulang tahun, anniversary, dan momen spesial.",
    image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=800",
  },
  {
    id: 2,
    name: "Sunflower Bouquet",
    category: "Sunflower",
    price: 120000,
    description:
      "Buket bunga matahari yang ceria untuk memberikan semangat dan kebahagiaan.",
    image:
      "https://images.unsplash.com/photo-1543409777-30250849aa3e?auto=format&fit=crop&fm=jpg&q=80&w=800",
  },
  {
    id: 3,
    name: "Pink Flower Bouquet",
    category: "Pink",
    price: 135000,
    description: "Buket bunga bernuansa pink dengan tampilan lembut dan manis.",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=800",
  },
  {
    id: 4,
    name: "White Flower Bouquet",
    category: "Putih",
    price: 140000,
    description:
      "Buket bunga putih yang elegan, cocok untuk hadiah dan berbagai acara.",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800",
  },
];

export const formatRupiah = (amount: number) =>
  "Rp" + amount.toLocaleString("id-ID");

// Bentuk response dari Wikipedia REST API
export interface WikiSummary {
  title: string;
  extract: string;
  thumbnail?: { source: string };
}
