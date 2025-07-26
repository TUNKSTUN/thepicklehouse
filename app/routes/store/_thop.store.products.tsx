import {
  json,
  redirect,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useActionData,
  useSearchParams,
  Link,
} from "@remix-run/react";
import { useEffect } from "react";
import { ChefHat } from "lucide-react";
import TheHouseOfPickleDisplay from "../assets/The House of Pickles Display.png";
import FilterSection from "../../components/StoreComponents/FilterSection";
import ProductCard from "../../components/StoreComponents/ProductCard";
import { ProductService } from "../../services/product.server";
import { CartService } from "../../services/cart.server";
import {
  commitSession,
  getOrCreateCart,
} from "../../lib/security/session.server";
import { createCsrfToken, verifyCsrfToken } from "../../lib/utils.server";
import type { Product } from "../../types/Product";
import { useCart } from "../../hooks/useCart";

interface LoaderData {
  products: Product[];
  total: number;
  error?: string;
}

interface ActionData {
  error?: string;
}

export const loader: LoaderFunctionArgs = async ({ request }) => {
  const url = new URL(request.url);
  const sortBy = url.searchParams.get("sortBy") || "popular";
  const filterSpice = url.searchParams.get("filterSpice") || "all";
  const filterVeg = url.searchParams.get("filterVeg") || "all";
  const filterSize = url.searchParams.get("filterSize") || "all";
  const category =
    url.searchParams.get("category") === "all"
      ? undefined
      : url.searchParams.get("category");

  try {
    let query: any = category ? { category } : {};
    if (filterSpice !== "all") {
      query.spiceLevel = parseInt(filterSpice);
    }
    if (filterVeg !== "all") {
      query.isVeg = filterVeg === "veg";
    }
    if (filterSize !== "all") {
      query.size = filterSize;
    }

    let sort: any = {};
    switch (sortBy) {
      case "popular":
        sort = { isFeatured: -1, rating: -1 };
        break;
      case "price-low":
        sort = { price: 1 };
        break;
      case "price-high":
        sort = { price: -1 };
        break;
      case "spice-low":
        sort = { spiceLevel: 1 };
        break;
      case "spice-high":
        sort = { spiceLevel: -1 };
        break;
      case "rating":
        sort = { rating: -1 };
        break;
    }

    const products = await ProductService.getProducts(query, sort);
    const total = await ProductService.countProducts(query);

    return json({ products, total });
  } catch (error) {
    console.error("Loader error:", error);
    return json(
      { products: [], total: 0, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};

export const action: ActionFunctionArgs = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("action");
  const { cart, session } = await getOrCreateCart(request);
  const userId = session.get("userId");
  const csrfToken = formData.get("csrf") as string;

  await verifyCsrfToken(request, csrfToken);

  if (actionType === "addToWishlist") {
    const productId = formData.get("productId") as string;
    if (!productId) {
      return json({ error: "Product ID is required" }, { status: 400 });
    }
    const product = await ProductService.addToWishlist(userId, productId);
    if (!product) {
      return json({ error: "Product not found" }, { status: 404 });
    }
    return json({ success: true });
  } else if (actionType === "addToCart") {
    const productId = formData.get("productId") as string;
    const quantity = parseInt(formData.get("quantity") as string) || 1;
    if (!productId) {
      return json({ error: "Product ID is required" }, { status: 400 });
    }
    const product = await ProductService.getProduct(productId);
    if (!product) {
      return json({ error: "Product not found" }, { status: 404 });
    }
    await CartService.addToCart(userId, cart.cartId, productId, quantity);
    return json(
      { success: true },
      { headers: { "Set-Cookie": await commitSession(session) } }
    );
  }

  return json({ error: "Invalid action" }, { status: 400 });
};

export default function Products() {
  const { products, total, error } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  useEffect(() => {
    if (actionData?.error) {
      console.error("Action error:", actionData.error);
    }
  }, [actionData]);

  const sortBy = searchParams.get("sortBy") || "popular";
  const filterSpice = searchParams.get("filterSpice") || "all";
  const filterVeg = searchParams.get("filterVeg") || "all";
  const filterSize = searchParams.get("filterSize") || "all";
  const category = searchParams.get("category") || "all";

  return (
    <div className="min-h-screen">
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-white">
          <img
            src={TheHouseOfPickleDisplay}
            alt="aunty-masala-making"
            className="w-full h-full object-cover opacity-50 blur-sm bg-blend-difference"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-foreground mb-6 animate-fade-up">
            Our <span className="text-primary">Products</span>
          </h1>
          <p
            className="text-masala-brown-muted text-xl italic leading-relaxed animate-fade-up max-w-3xl mx-auto"
            style={{ animationDelay: "0.2s" }}
          >
            Discover our authentic collection of traditional Hyderabadi pickles,
            each crafted with love and the finest ingredients.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterSection
            sortBy={sortBy}
            setSortBy={() => {}}
            filterSpice={filterSpice}
            setFilterSpice={() => {}}
            filterVeg={filterVeg}
            setFilterVeg={() => {}}
            filterSize={filterSize}
            setFilterSize={() => {}}
            category={category}
            setCategory={() => {}}
          />

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ChefHat className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Our Pickle Collection
                  </h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  {total} product{total !== 1 ? "s" : ""} found
                </div>
              </div>
            </div>

            <div className="h-[600px] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
              {error ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ChefHat className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Error
                  </h3>
                  <p className="text-muted-foreground">{error}</p>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <div
                      key={product.productId}
                      className="animate-stagger transform hover:scale-105 transition-transform duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard
                        product={{
                          ...product,
                          imageUrl: product.image,
                          id: product.productId,
                          originalPrice: product.discount
                            ? product.price
                            : undefined,
                          price: product.discount
                            ? product.price * (1 - product.discount / 100)
                            : product.price,
                          popular: product.isFeatured,
                          nonVegType: product.isVeg
                            ? undefined
                            : product.category,
                        }}
                        onAddToCart={() => addToCart(product.productId, 1)}
                        onAddToWishlist={() => {
                          const formData = new FormData();
                          formData.append("action", "addToWishlist");
                          formData.append("productId", product.productId);
                          formData.append("csrf", createCsrfToken());
                          fetch("/_thop.store.products", {
                            method: "POST",
                            body: formData,
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ChefHat className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to see more products or check if
                    products are seeded.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-masala-brown text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 animate-fade-up">
            Can't Find What You're Looking For?
          </h2>
          <p
            className="text-xl mb-8 opacity-90 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Contact us for custom pickle orders or special requests. We'd love
            to create something special for you!
          </p>
          <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/contact"
              className="btn-secondary inline-flex items-center"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
