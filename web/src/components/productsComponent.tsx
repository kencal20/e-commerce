import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { products, } from "../data/productsData"
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
        <div className="px-10 py-10 font-medium  sm:flex-wrap ">
            <div className="flex flex-row justify-between p-4">
                <h1 className="text-4xl">PRODUCTS</h1>
                {showShopLink && (<u>
                    <Link to="/products">GO TO SHOP</Link>
                </u>)
                }
            </div>
            <div className="flex flex-wrap justify-between ">
                {
                    products.map((product, index) => (
                        <CardComponent
                            title={product.name}
                            key={index}
                            className="text-2xl font-medium"
                            childrenClassName=""
                            titleClassName=""
                        >
                            <img src={product.img} alt="" />
                            <div className="flex justify-between mt-5">
                                <p>${product.price}</p>
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </div>
                        </CardComponent>
                    ))
                }

            </div>
        </div>
    )
}