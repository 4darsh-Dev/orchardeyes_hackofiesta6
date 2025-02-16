import React from "react"
import OrchardSlider from "./OrchardSlider"

const OrchardSection = ({ orchards }) => {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">
                    Preferred Apple Orchards
                </h2>
                <OrchardSlider orchards={orchards} />
            </div>
        </section>
    )
}

export default OrchardSection
