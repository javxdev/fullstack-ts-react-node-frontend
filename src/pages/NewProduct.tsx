import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request } : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData()) 
  
  let error = ''
  if(Object.values(data).includes('')){
    error = 'All fields are required'
  }

  if(error.length) {
    return error
  }

  await addProduct(data)
  
  return redirect('/')
}

export default function NewProduct() {

  const error = useActionData() as string

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-600 uppercase">Register new product</h2>
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
        <ProductForm/>

        <input
          type="submit"
          className="mt-5 w-full uppercase bg-indigo-600 p-2 text-white font-bold cursor-pointer rounded"
          value="Register"
        />
      </Form>
    </>
  )
}
