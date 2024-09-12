import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({params} : LoaderFunctionArgs) {
  if(params.id !== undefined) {
    const product = await getProductById(+params.id)
    if(!product) {
      return redirect('/')
    }

    return product
  }
}

export async function action({ request, params } : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData()) 
  
  let error = ''
  if(Object.values(data).includes('')){
    error = 'All fields are required'
  }

  if(error.length) {
    return error
  }

  if(params.id !== undefined) {
    await updateProduct(data, +params.id)
    
    return redirect('/')
  }
}

const availabilityOptions = [
  { name: 'Available', value: true},
  { name: 'Not available', value: false}
]

export default function EditProduct() {

  const product = useLoaderData() as Product
  const error = useActionData() as string

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-600 uppercase">Edit product</h2>
        <Link
          to="/"
          className="rounded-md p-3 bg-red-700 hover:bg-red-500 text-sm text-white shadow-sm"
        >
          Go Back To Products
        </Link>
      </div>
      
      {error && <ErrorMessage>{ error }</ErrorMessage>}
      <Form
        className="mt-10"
        method="POST"
      >
        <ProductForm
            product={product}
        />

        <div className="mb-4 ">
            <label
              className="text-gray-800 font-bold"
              htmlFor="availability"
            >Availability</label>
            <select 
              id="availability"
              className="mt-2 block w-full p-3 bg-gray-200"
              name="availability"
              defaultValue={product?.availability.toString()}
            >
                {availabilityOptions.map(option => (
                  <option key={option.name} value={option.value.toString()}>{option.name}</option>
                ))}
            </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full uppercase bg-indigo-600 p-2 text-white font-bold cursor-pointer rounded"
          value="Save Changes"
        />
      </Form>
    </>
  )
}
