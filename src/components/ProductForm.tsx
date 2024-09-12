import { Product } from "../types"

type ProductFormProps = {
    product?: Product
}

export default function ProductForm({ product } : ProductFormProps) {
  return (
    <>
        <div className="mb-4">
            <label
              className="text-gray-800 font-bold"
              htmlFor="name"
            >Name</label>
            <input 
              id="name"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-200"
              placeholder="Product Name"
              name="name"
              defaultValue={product?.name}
            />
        </div>

        <div className="mb-4">
            <label
              className="text-gray-800 font-bold"
              htmlFor="price"
            >Price</label>
            <input 
              id="price"
              type="number"
              className="mt-2 block w-full p-3 bg-gray-200"
              placeholder="Product Price. Example: 199, 599"
              name="price"
              defaultValue={product?.price}
            />
        </div>
    </>
  )
}
