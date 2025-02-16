import React from "react"

const DroneInfoSection = () => {
    return (
        <section className="py-12 bg-green-100">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <img
                        src="https://cdn.pixabay.com/photo/2020/08/28/05/36/apple-5523590_1280.jpg"
                        alt="Drone in Orchard"
                        className="rounded-full shadow-lg"
                    />
                </div>
                <div className="md:w-1/2 md:pl-12">
                    <h2 className="text-3xl font-bold text-green-700 mb-4">
                        KNOW HOW DRONES HELP IN THE{" "}
                        <span className="text-green-900">
                            ORCHARD MANAGEMENT
                        </span>
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                    <button className="bg-red-600 text-white py-2 px-4 rounded">
                        About Us
                    </button>
                </div>
            </div>
        </section>
    )
}

export default DroneInfoSection
