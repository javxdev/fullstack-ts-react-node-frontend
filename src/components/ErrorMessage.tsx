import { PropsWithChildren } from "react";

export default function ErrorMessage({children} : PropsWithChildren) {
  return (
    <div className=" text-center mt-10 bg-red-600 text-sm text-white uppercase font-bold p-3">
        {children}
    </div>
  )
}
