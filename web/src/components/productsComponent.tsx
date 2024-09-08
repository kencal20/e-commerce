import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { products } from "../data/productsData"
import CardComponent from "./cardComponent"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { componentProps } from "../objects.model"
import { Link } from "react-router-dom"

type Props = {
    products: componentProps['productsProps'][]
    setProducts: React.Dispatch<React.SetStateAction<componentProps['productsProps'][]>>
    showShopLink: boolean
}

export default function ProductsComponent({ showShopLink }: Props) {
    return (
        <div className="px-10 py-10 font-medium sm:flex-wrap bg-white text-black dark:bg-dark_theme-background dark:text-dark_theme-text">
            <div className="flex flex-row justify-between p-4  dark:text-dark_theme-header">
                <h1 className="text-4xl">PRODUCTS</h1>
                {showShopLink && (
                    <u>
                        <Link to="/products" className="text-blue-500 dark:text-dark_theme-link">
                            GO TO SHOP
                        </Link>
                    </u>
                )}
            </div>
            <div className="flex flex-wrap justify-between">
                {products.map((product, index) => (
                    <CardComponent
                        title={product.name}
                        key={index}
                        className="text-2xl font-medium shadow-xl bg-slate-100 dark:bg-dark_theme-background border-0"
                        childrenClassName=""
                        titleClassName=""
                    >
                        <img src={product.img} alt={product.name} />
                        <div className="flex justify-between mt-5">
                            <p>${product.price}</p>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </div>
                    </CardComponent>
                ))}
            </div>
        </div>
    )
}
