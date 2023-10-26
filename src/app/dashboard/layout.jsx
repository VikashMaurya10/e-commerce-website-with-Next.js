import Header from "@/components/dashboardHeader/Header"

const DashboardLayout = ({ children }) => {
    return (
        <section className="flex min-h-[85vh]">
            <div className="flex w-[80%] mx-auto gap-4 my-4">
                <nav className="border shrink-0 border-gray-500 rounded h-full min-w-[20%] px-8 bg-gray-100">
                    <Header />
                </nav>

                <div className="border border-gray-500 rounded h-full p-4 bg-gray-100 w-full">
                    {children}
                </div>
            </div>.

        </section>
    )
}

export default DashboardLayout