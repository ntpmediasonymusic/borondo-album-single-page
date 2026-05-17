export const SHOPIFY_SDK_URL =
  "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
export const SHOPIFY_SCRIPT_ID = "shopify-buy-button-sdk";
export const SHOPIFY_DOMAIN = "5020-records.myshopify.com";
export const SHOPIFY_TOKEN = "4443eca50ab567dff741d5d6b7bd8790";
export const SHOPIFY_PRODUCT_ID = "8614737543305";
export const FALLBACK_PRODUCT_URL =
  "https://5020records.rosecityworks.com/products/beele-borondo-2lp";

// ── Types ────────────────────────────────────────────────────────────────────

export interface ShopifyProductComponent {
  addToCart(): void;
  [key: string]: unknown;
}

interface ShopifyBuyClient {
  [key: string]: unknown;
}

interface ShopifyBuyUI {
  createComponent(
    type: string,
    config: Record<string, unknown>
  ): Promise<ShopifyProductComponent>;
}

declare global {
  interface Window {
    ShopifyBuy: {
      buildClient(config: {
        domain: string;
        storefrontAccessToken: string;
      }): ShopifyBuyClient;
      UI: {
        onReady(client: ShopifyBuyClient): Promise<ShopifyBuyUI>;
      };
    };
  }
}

// ── SDK loader ───────────────────────────────────────────────────────────────
// Waits for both window.ShopifyBuy AND window.ShopifyBuy.UI to be available.

export function loadShopifySdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Not in browser"));
      return;
    }

    if (window.ShopifyBuy?.UI) {
      resolve();
      return;
    }

    const poll = (timeoutMs = 10_000) => {
      const deadline = Date.now() + timeoutMs;
      const id = setInterval(() => {
        if (window.ShopifyBuy?.UI) {
          clearInterval(id);
          resolve();
        } else if (Date.now() > deadline) {
          clearInterval(id);
          reject(new Error("Shopify SDK timeout — UI not ready"));
        }
      }, 100);
    };

    // Script already injected — just wait for it to finish
    if (document.getElementById(SHOPIFY_SCRIPT_ID)) {
      poll();
      return;
    }

    const script = document.createElement("script");
    script.id = SHOPIFY_SCRIPT_ID;
    script.async = true;
    script.src = SHOPIFY_SDK_URL;
    script.onerror = () => reject(new Error("Failed to load Shopify SDK script"));
    script.onload = () => {
      if (window.ShopifyBuy?.UI) {
        resolve();
      } else {
        poll(3_000);
      }
    };
    (document.head || document.body).appendChild(script);
  });
}

// ── Shopify product/cart component options ───────────────────────────────────

export const SHOPIFY_PRODUCT_OPTIONS = {
  product: {
    // Hide all visual elements — we render our own UI
    contents: {
      img: false,
      title: false,
      price: false,
      options: false,
      quantity: false,
      button: true, // keep the button so addToCart() works internally
    },
    text: { button: "Agregar al carrito" },
    styles: {
      button: {
        "background-color": "#000000",
        ":hover": { "background-color": "#000000" },
        ":focus": { "background-color": "#000000" },
        "border-radius": "0",
      },
    },
  },
  cart: {
    text: {
      total: "Subtotal",
      button: "Finalizar compra",
    },
    styles: {
      button: {
        "background-color": "#000000",
        ":hover": { "background-color": "#111111" },
        ":focus": { "background-color": "#111111" },
        "border-radius": "0",
      },
    },
  },
  toggle: {
    styles: {
      toggle: {
        "background-color": "#000000",
        ":hover": { "background-color": "#111111" },
        ":focus": { "background-color": "#111111" },
      },
    },
  },
};
