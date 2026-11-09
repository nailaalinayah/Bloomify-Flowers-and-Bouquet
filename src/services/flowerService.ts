import type { Flower, WikiSummary } from "../types/flower";

const WIKI_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/";

// Data tokomu sendiri (harga & kategori).
// Deskripsi dan gambar diambil dari API berdasarkan wikiTitle.
const catalog = [
  {
    id: 1,
    wikiTitle: "Rose",
    name: "Rose Bouquet",
    category: "Mawar",
    price: 150000,
  },
  {
    id: 2,
    wikiTitle: "Sunflower",
    name: "Sunflower Bouquet",
    category: "Sunflower",
    price: 120000,
  },
  {
    id: 3,
    wikiTitle: "Peony",
    name: "Pink Peony Bouquet",
    category: "Pink",
    price: 135000,
  },
  {
    id: 4,
    wikiTitle: "Lilium",
    name: "White Lily Bouquet",
    category: "Putih",
    price: 140000,
  },
];

type CatalogItem = (typeof catalog)[number];

// Promise buatan sendiri: resolve() kalau sukses, reject() kalau gagal.
// fetch() adalah async function bawaan, hasilnya diproses dengan .then().
function getWikiSummary(title: string): Promise<WikiSummary> {
  return new Promise((resolve, reject) => {
    fetch(WIKI_URL + encodeURIComponent(title))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Status " + response.status);
        }
        return response.json() as Promise<WikiSummary>;
      })
      .then((result) => {
        resolve(result);
      })
      .catch(() => {
        reject(
          new Error("Gagal mengambil data bunga. Periksa koneksi internetmu."),
        );
      });
  });
}

// Menggabungkan data toko + data dari API menjadi object Flower
function toFlower(item: CatalogItem, summary: WikiSummary): Flower {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    description: summary.extract,
    image: summary.thumbnail?.source ?? "",
  };
}

// Custom async function: ambil semua bunga.
// Promise.all menunggu semua request selesai.
export async function getFlowers(): Promise<Flower[]> {
  const summaries = await Promise.all(
    catalog.map((item) => getWikiSummary(item.wikiTitle)),
  );
  return catalog.map((item, index) => toFlower(item, summaries[index]));
}

// Custom async function: ambil satu bunga berdasarkan id.
export async function getFlowerById(id: number): Promise<Flower> {
  const item = catalog.find((entry) => entry.id === id);

  if (!item) {
    throw new Error("Produk tidak ditemukan");
  }

  const summary = await getWikiSummary(item.wikiTitle);
  return toFlower(item, summary);
}
