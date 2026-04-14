export interface ProductDto {
  slug: string;
  name: string;
  brand: string;
  description: string;
  image_url: string;
  display_price: string | number | null;
  currency: string;
}
