import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <>
        <header className="bg-slate-800">
            <div className="px-4 md:p-10 mx-auto max-w-5xl py-10 lg:px-0">
                <h1 className="text-xl text-center md:text-start md:text-3xl font-extrabold text-white uppercase">
                    Products Administrator
                </h1>
            </div>
        </header>

        <main className="px-4 md:p-10 my-10 mx-auto max-w-5xl bg-white shadow-md">
          <Outlet/>
        </main>
    </>
  )
}
