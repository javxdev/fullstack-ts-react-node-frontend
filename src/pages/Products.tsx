import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateProductAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"

export async function loader(){
  const products = await getProducts()
  return products
}

export async function action({request} : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updateProductAvailability(+data.id)
  return {}
}

export default function Products() {

  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-black text-slate-600 uppercase">All Products</h2>
        <Link
          to="products/new"
          className="rounded-md p-3 bg-primary hover:bg-primaryHover text-sm text-white shadow-sm"
        >
          Add Product
        </Link>
      </div>

      <div>
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
              <tr>
                  <th className="p-2 text-start">Product</th>
                  <th className="p-2 text-start">Price</th>
                  <th className="p-2 text-start">Availability</th>
                  <th className="p-2 text-start ">Actions</th>
              </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductDetails
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
