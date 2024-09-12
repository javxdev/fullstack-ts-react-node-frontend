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
            <td className="p-3 text-lg text-gray-800">
                {product.name}
                
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-xs text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} border border-black hover:cursor-pointer rounded p-2 text-xs font-bold w-full`}
                    >
                        {isAvailable ? 'Available' : 'Not Available'}
                    </button>
                </fetcher.Form>
                
            </td>
            <td className="text-lg text-gray-800">
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
                            className="border  border-red-700 text-red-700 rounded w-full p-2 font-bold text-xs text-center cursor-pointer"
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}
