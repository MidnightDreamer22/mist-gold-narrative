import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export default function Shop() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
        const sortedProducts = [...data.data.products.edges].sort((a, b) => {
          const order = ['Simona Pin', 'Tumbler Glass', 'Highball Glass', 'Simona\'s Jacket'];
          const indexA = order.findIndex(name => a.node.title.includes(name));
          const indexB = order.findIndex(name => b.node.title.includes(name));
          return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
        });
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.node.title} has been added to your cart.`,
      position: "top-center"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">The Simona Collection</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Carry the rhythm of Yerevan with you. Curated pieces for those who live creatively.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground mb-6">
              Our collection is coming soon. Check back later!
            </p>
            <p className="text-sm text-muted-foreground">
              Want to add products? Tell us what you'd like to sell in the chat.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const image = product.node.images.edges[0]?.node;
              const price = product.node.priceRange.minVariantPrice;
              
              return (
                <div key={product.node.id} className="group">
                  <Link to={`/product/${product.node.handle}`} className="block">
                    <div className="relative aspect-square bg-secondary/10 rounded-lg overflow-hidden mb-4">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {product.node.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {product.node.description}
                    </p>
                    <p className="font-bold">
                      {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                    </p>
                  </Link>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-3"
                  >
                    Add to Cart
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
