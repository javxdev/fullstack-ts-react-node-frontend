import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsPros = {
    product: Product
}

export async function action({ params } : ActionFunctionArgs) {
    if(params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({product} : ProductDetailsPros) {

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

    return (
        <tr className="border-b ">
            <td className="text-sm md:text-lg p-3 text-gray-800">
                {product.name}
                
            </td>
            <td className="text-sm md:text-lg p-3 text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="text-xs p-3 text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`border ${isAvailable ? 'text-black border-black' : 'text-red-600 border-red-600'} hover:cursor-pointer rounded p-2 text-xs font-bold w-full`}
                    >
                        {isAvailable ? 'Available' : 'Not Available'}
                    </button>
                </fetcher.Form>
                
            </td>
            <td className="text-gray-800">
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                        className="border  border-blue-700 text-blue-700 rounded w-full p-2 font-bold text-xs text-center"
                    >Edit</button>

                    <Form
                        className="w-full"
                        method="POST"
                        action={`products/${product.id}/delete`}
                        onSubmit={(e) => {
                            if( !confirm('Delete?' )){
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type="submit"
                            value="Delete"
                            className="border border-red-700 text-red-700 rounded w-full p-2 font-bold text-xs text-center cursor-pointer"
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}
