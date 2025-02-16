import { useState } from "react"
import { XCircle, ChevronRight } from "lucide-react"
import Card from "./Card"

const SideBarRight = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState([
        {
            title: "New Message",
            content: "You have a new message from John Doe.",
        },
        { title: "Meeting Reminder", content: "Team meeting in 30 minutes." },
        {
            title: "Task Completed",
            content: "Project X has been marked as complete.",
        },
        {
            title: "System Update",
            content: "A new system update is available.",
        },
        {
            title: "New Feature",
            content: "Check out our latest feature release!",
        },
    ])

    const handleDeleteNotification = (index) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((_, i) => i !== index),
        )
    }

    return (
        <div
            className={`fixed top-0 right-0 h-screen w-64 bg-[#E2F0E2]  rounded-l-2xl z-50 text-gray-700 p-4 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-60"} border border-green-500`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -left-4 top-1/2 bg-green-500 text-white p-1 rounded-full shadow-lg"
            >
                <ChevronRight
                    size={20}
                    className={`transition-transform duration-300 ${isOpen ? "" : "rotate-180"}`}
                />
            </button>
            <div className="p-1 overflow-y-scroll">
                <h2 className="text-xl font-bold mb-4">Notifications</h2>
                {notifications.map((notification, index) => (
                    <Card key={index} margin="mb-4" bgColor="bg-gray-50">
                        <div className="w-full">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-medium">
                                    {notification.title}
                                </h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() =>
                                        handleDeleteNotification(index)
                                    }
                                >
                                    <XCircle size={24} />
                                </button>
                            </div>
                            <p className="mb-3">{notification.content}</p>
                            <button className="text-blue-500 hover:text-blue-700">
                                View Details
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default SideBarRight
