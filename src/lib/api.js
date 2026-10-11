const API_BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchFromApi(endpoint, opts = {}) {
  for (const base of API_BASES) {
    try {
      const res = await fetch(`${base}${endpoint}`, {
        next: { revalidate: 60 },
        ...opts,
      });
      if (res.ok) return res.json();
    } catch {}
  }
  return null;
}

export async function getAllCategories() {
  const data = await fetchFromApi("/categories");
  return Array.isArray(data) ? data : [];
}

export async function getCategoryBySlug(slug) {
  const data = await fetchFromApi(`/categories/${slug}`);
  if (data && (data.slug || data.id)) return data;
  const all = await getAllCategories();
  return all.find((c) => c.slug === slug || c.id === slug) || null;
}

export async function getAllProducts() {
  const data = await fetchFromApi("/products");
  return Array.isArray(data) ? data : [];
}

export async function getProductsByCategory(categorySlug) {
  const data = await fetchFromApi(
    `/products?category=${encodeURIComponent(categorySlug)}`
  );
  if (Array.isArray(data)) return data;
  const all = await getAllProducts();
  return all.filter((p) => p.category === categorySlug);
}

export async function getProductById(idOrSlug) {
  const data = await fetchFromApi(`/products/${idOrSlug}`);
  if (data && data.nameBn) return data;
  const all = await getAllProducts();
  const found = all.find(
    (p) => p.slug === idOrSlug || String(p.id) === String(idOrSlug)
  );
  if (found) {
    const detail = await fetchFromApi(`/products/${found.id}`);
    return detail || found;
  }
  return null;
}
