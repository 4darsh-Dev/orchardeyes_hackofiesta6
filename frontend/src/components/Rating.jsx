import PropTypes from "prop-types"
import { Star } from "lucide-react"

const Rating = ({ rating }) => {
    // Ensure rating is between 0 and 5
    const clampedRating = Math.min(Math.max(rating, 0), 5)

    // Calculate width of the yellow div (20% per star)
    const fillWidth = `${(clampedRating / 5) * 100}%`

    return (
        <div className="relative inline-flex">
            {/* Gray background stars */}
            <div className="flex">
                {[...Array(5)].map((_, index) => (
                    <Star key={index} size={24} className="text-gray-300" />
                ))}
            </div>

            {/* Yellow overlay */}
            <div
                className="absolute top-0 left-0 flex overflow-hidden"
                style={{ width: fillWidth }}
            >
                {[...Array(5)].map((_, index) => (
                    <Star key={index} size={24} className="text-yellow-400" />
                ))}
            </div>
        </div>
    )
}

export default Rating
Rating.propTypes = {
    rating: PropTypes.number.isRequired,
}
