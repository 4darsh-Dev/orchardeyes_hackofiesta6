import React from "react"

const FooterCopyright = () => {
    return (
        <div className="text-center text-gray-400 text-sm mt-6">
            &copy; {new Date().getFullYear()} Orchard Management. All Rights
            Reserved.
        </div>
    )
}

export default FooterCopyright
