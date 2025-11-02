import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export default function Product() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        const productData = data.data.productByHandle;
        setProduct(productData);
        
        if (productData?.variants.edges[0]) {
          setSelectedVariant(productData.variants.edges[0].node);
          const initialOptions: Record<string, string> = {};
          productData.variants.edges[0].node.selectedOptions.forEach((opt: any) => {
            initialOptions[opt.name] = opt.value;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const variant = product.variants.edges.find((v: any) => {
      return v.node.selectedOptions.every((opt: any) => newOptions[opt.name] === opt.value);
    });

    if (variant) {
      setSelectedVariant(variant.node);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.title} has been added to your cart.`,
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/shop')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const image = product.images.edges[0]?.node;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative aspect-square bg-secondary/10 rounded-lg overflow-hidden">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag className="w-20 h-20 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
            
            <p className="text-2xl font-bold mb-6">
              {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
            </p>

            <p className="text-muted-foreground mb-8">
              {product.description}
            </p>

            {product.options?.map((option: any) => (
              <div key={option.name} className="mb-6">
                <label className="block text-sm font-semibold mb-3">{option.name}</label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value: string) => (
                    <Button
                      key={value}
                      variant={selectedOptions[option.name] === value ? "default" : "outline"}
                      onClick={() => handleOptionChange(option.name, value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
              size="lg"
              className="w-full"
            >
              {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
