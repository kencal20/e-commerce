import React from 'react';
import ServicesComponent from '../components/servicesComponent';
import ProductsComponent from '../components/productsComponent';
import HeroComponent from '../components/heroComponent';
import DiscountComponent from '../components/discountComponent';
import { componentProps } from "../objects.model";

type Props = {
  products: componentProps['productsProps'][]
  setProducts: React.Dispatch<React.SetStateAction<componentProps['productsProps'][]>>
};



export default function HomeScreen({ products, setProducts }: Props) {
  return (
    <div>
      <HeroComponent />
      <ServicesComponent />
      <DiscountComponent />
      <ProductsComponent products={products} setProducts={setProducts} showShopLink={true} />
    </div>
  );
}
