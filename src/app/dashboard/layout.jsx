import Header from "@/components/dashboardHeader/Header"

export const metadata = {
    title: "Dashboard | 😊"
}

const DashboardLayout = ({ children }) => {
    return (
        <section className="flex min-h-[85vh]">
            <div className="flex sm:w-[80%] w-[90%] mx-auto gap-4 my-4">
                {/* border border-gray-500 bg-gray-100 */}
                <nav className="shrink-0 shadow-normal rounded h-full min-w-[20%] px-8">
                    <Header />
                </nav>
                <div className="rounded shadow-normal h-full p-4 w-full">
                    {children}
                </div>
            </div>.

        </section>
    )
}

export default DashboardLayout