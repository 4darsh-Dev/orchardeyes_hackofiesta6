import React from "react"
import OrchardCard from "./OrchardCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

const OrchardSlider = ({ orchards }) => {
    if (!orchards || orchards.length === 0) return null // Pre-check for orchards array

    return (
        <div className="relative flex items-center">
            <button className="absolute left-0 p-2 text-gray-600 hover:text-gray-800">
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="flex space-x-4 overflow-x-auto">
                {orchards.map((orchard, index) => (
                    <OrchardCard key={index} orchard={orchard} />
                ))}
            </div>
            <button className="absolute right-0 p-2 text-gray-600 hover:text-gray-800">
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    )
}

export default OrchardSlider
