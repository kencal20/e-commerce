import { useState } from "react";
import InputComponent from "../components/inputComponent";
import { componentProps } from "../objects.model";
import FormComponent from "../components/formComponent";
import SubmitButtonComponent from "../components/submitButtonComponent";

type Props = {
    products: componentProps['productsProps'][]
    setProducts: React.Dispatch<React.SetStateAction<componentProps['productsProps'][]>>
};

export default function CreateProduct({ products, setProducts }: Props) {
    const [input, setInput] = useState<componentProps['productsProps']>({
        name: "",
        brand: "",
        price: 0,
        img: ""
    });
    const [isloading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<{ text: string, variant: "success" | "danger" | undefined }>({
        text: "",
        variant: undefined
    })

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true)
        try {
            const { name, brand, price, img }: componentProps['productsProps'] = input
            const newProduct: componentProps['productsProps'] = ({
                name, brand, price, img
            })
            setProducts([...products, newProduct])
            setInput({ name: '', brand: '', price: 0, img: '' })
            setStatus({ text: "The Product has Been created and registed Successfully", variant: "success" })
        } catch (error) {
            setStatus({ text: "Error in creating Product", variant: 'danger' })
        }
        finally {
            setIsLoading(false)
        }
    }



    return (
        <FormComponent
            className="max-w-md mx-auto"
            onSubmit={handleSubmit}
        >


            {
                status.text && (
                    <div id="alert-1" className={`flex items-center p-4 mb-4 text-sm rounded-lg ${status.variant === "success"
                        ? "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                        : "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        }`} role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div className="ms-3 text-sm font-medium">
                            {status.text}
                        </div>
                        <button type="button" onClick={() => setStatus({ text: "", variant: undefined })} className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                )
            }

            <InputComponent
                type="text"
                label="Name"
                value={input.name}
                name="name"
                onChange={handleInputChange}
                required={true}
            />
            <InputComponent
                type="text"
                label="Brand"
                value={input.brand}
                name="brand"
                onChange={handleInputChange}
                required={true}
            />
            <InputComponent
                type="number"
                label="Price"
                value={input.price.toString()}
                name="price"
                onChange={handleInputChange}
                required={true}
            />
            <InputComponent
                type="text"
                label="Image"
                value={input.img}
                name="img"
                onChange={handleInputChange}
                required={true}
            />
          <SubmitButtonComponent isloading={isloading}/>
        </FormComponent>
    );
}
