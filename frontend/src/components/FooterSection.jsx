import React from "react"
import FooterLinks from "./FooterLinks"
import FooterCopyright from "./FooterCopyright"

const FooterSection = () => {
    return (
        <footer className="bg-green-900 text-white py-8 px-4">
            <div className="container mx-auto px-20 py-6">
                <FooterLinks />
                <FooterCopyright />
            </div>
        </footer>
    )
}

export default FooterSection
