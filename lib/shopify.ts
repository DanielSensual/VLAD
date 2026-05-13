/**
 * Shopify Storefront API client.
 *
 * Status: scaffold. Wires up GraphQL fetch, types, and a product query
 * against jvladimir.store. Activate by setting these env vars in
 * .env.local (and on Vercel):
 *
 *   SHOPIFY_STORE_DOMAIN=jvladimir.store
 *   SHOPIFY_STOREFRONT_API_TOKEN=<your-storefront-access-token>
 *
 * To create the token: jvladimir.store admin → Settings → Apps and sales
 * channels → Develop apps → Create app → Configure Storefront API access.
 * Grant `unauthenticated_read_product_listings` at minimum.
 *
 * Until credentials are set, `isShopifyEnabled()` returns false and the
 * site falls back to the curated data in lib/content.ts. The /collect
 * page is designed to seamlessly swap to live data on flip.
 */

const SHOPIFY_API_VERSION = '2025-01';

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  totalInventory: number | null;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  collections: { nodes: { handle: string; title: string }[] };
}

export const isShopifyEnabled = (): boolean =>
  Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_STOREFRONT_API_TOKEN,
  );

interface ShopifyFetchOptions<TVars> {
  query: string;
  variables?: TVars;
  /** ISR revalidate window in seconds. Default 1h. */
  revalidate?: number;
}

async function shopifyFetch<TData, TVars = Record<string, unknown>>({
  query,
  variables,
  revalidate = 3600,
}: ShopifyFetchOptions<TVars>): Promise<TData> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN;

  if (!domain || !token) {
    throw new Error(
      'Shopify env vars missing — call isShopifyEnabled() before shopifyFetch',
    );
  }

  const res = await fetch(
    `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    },
  );

  if (!res.ok) {
    throw new Error(`Shopify ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as {
    data?: TData;
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    throw new Error(
      `Shopify GraphQL errors: ${json.errors.map((e) => e.message).join('; ')}`,
    );
  }

  if (!json.data) throw new Error('Shopify returned no data');
  return json.data;
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  productType
  vendor
  tags
  availableForSale
  totalInventory
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  featuredImage { url altText width height }
  images(first: 6) {
    nodes { url altText width height }
  }
  collections(first: 4) {
    nodes { handle title }
  }
`;

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes { ${PRODUCT_FIELDS} }
    }
  }
`;

const PRODUCTS_BY_COLLECTION_QUERY = `
  query ProductsByCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      title
      description
      products(first: $first) {
        nodes { ${PRODUCT_FIELDS} }
      }
    }
  }
`;

/** Returns up to `first` products from the store, or null when unconfigured. */
export async function getAllProducts(
  first = 50,
): Promise<ShopifyProduct[] | null> {
  if (!isShopifyEnabled()) return null;
  const data = await shopifyFetch<{ products: { nodes: ShopifyProduct[] } }>({
    query: PRODUCTS_QUERY,
    variables: { first },
  });
  return data.products.nodes;
}

/** Products in a Shopify collection by handle (e.g. "red-stripe-rabbits"). */
export async function getProductsByCollection(
  handle: string,
  first = 24,
): Promise<{ title: string; description: string; products: ShopifyProduct[] } | null> {
  if (!isShopifyEnabled()) return null;
  const data = await shopifyFetch<{
    collection: {
      title: string;
      description: string;
      products: { nodes: ShopifyProduct[] };
    } | null;
  }>({
    query: PRODUCTS_BY_COLLECTION_QUERY,
    variables: { handle, first },
  });
  if (!data.collection) return null;
  return {
    title: data.collection.title,
    description: data.collection.description,
    products: data.collection.products.nodes,
  };
}
