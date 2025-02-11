import { useEffect, useState } from "react"
import { Bell, ChevronDown, RotateCw } from "lucide-react"
import Card from "../components/Card"
import DoughnutChartWithImage from "../components/charts/DoughnutChartWithImage"
import leafForChart from "../assets/leaf_for_chart.svg"
import appleForChart from "../assets/apple_for_chart.png"
import sunCloud from "../assets/sun_cloud.svg"
import SidebarLeft from "../components/SideBarLeft"
import PieChart from "../components/charts/PieChart"
import SideBarRight from "../components/SideBarRight"

const OrchardManagement = () => {
    const [farmMetrics, setFarmMetrics] = useState(null)

    // Dummy data for development
    const data = {
        health: {
            fruit: {
                healthy: 86,
                unhealthy: 14,
            },
            leaves: {
                healthy: 90,
                unhealthy: 10,
            },
        },
        weather: {
            temperature: 32, // in degrees Celsius
            humidity: 50, // in percentage
            prediction: "Rainy", // could be "cloudy", "sunny", or "rain"
        },
        pestSeverity: 35, // on a scale of 1-100
        predictedDiseases: {
            disease: ["disease1", "disease2", "noDisease"],
            chance: [10, 43, 47], // percentages
        },
        appleCount: 1200, // total number of apples
        production: 5.5, // in tonnes
    }

    useEffect(() => {
        setFarmMetrics(data)
    }, [])

    // Destructure farmMetrics
    const {
        health: {
            fruit: { healthy: healthyFruits, unhealthy: unhealthyFruits } = {},
            leaves: { healthy: healthyLeaves, unhealthy: unhealthyLeaves } = {},
        } = {},
        weather: { temperature, humidity, prediction } = {},
        pestSeverity,
        predictedDiseases: { disease, chance } = {},
        appleCount,
        production,
    } = farmMetrics || {}

    return (
        <>
            <SidebarLeft />
            <SideBarRight />
            <div className="flex items-start justify-between px-5">
                <button className="mr-4 p-4 pt-7">
                    <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                    <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                </button>
                <div className="bg-white p-4 max-w-4xl flex flex-col gap-6">
                    <header className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                            <h1 className="text-3xl font-semibold text-gray-800">
                                Orchard Management
                            </h1>
                        </div>
                    </header>

                    {farmMetrics ? (
                        <>
                            <div className="flex gap-4 items-start">
                                <Card
                                    className="p-4"
                                    bgColor={"bg-[#EBFAEB]"}
                                    otherStyles={"border border-[#81ec81]"}
                                >
                                    <h2 className="font-semibold mb-2 text-lg">
                                        Leaves and Fruits
                                    </h2>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex space-x-4">
                                            <DoughnutChartWithImage
                                                img={leafForChart}
                                                label1="Healthy leaves"
                                                label2="Diseased Leaves"
                                                data1={healthyLeaves}
                                                data2={unhealthyLeaves}
                                            />
                                            <div className="mt-2 flex flex-col">
                                                <div className="flex items-center">
                                                    <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
                                                    <span className="text-sm">
                                                        Healthy Leaves
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                                                    <span className="text-sm">
                                                        Leaves with disease
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-4">
                                            <DoughnutChartWithImage
                                                img={appleForChart}
                                                label1="Healthy Apples"
                                                label2="Diseased Apples"
                                                data1={healthyFruits}
                                                data2={unhealthyFruits}
                                            />
                                            <div className="mt-2 flex flex-col">
                                                <div className="flex items-center">
                                                    <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
                                                    <span className="text-sm">
                                                        Healthy Apples
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                                                    <span className="text-sm">
                                                        Apples with disease
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <Card
                                    className="p-4 col-span-2 "
                                    bgColor={"bg-[#B7F1B7]"}
                                    otherStyles={"border border-[#48bc48]"}
                                >
                                    <h2 className="font-semibold mb-2 w-[25vw]">
                                        Overall
                                    </h2>
                                    {/* Content for Overall card */}
                                </Card>

                                <Card
                                    bgColor={"bg-[#D6F2EE]"}
                                    otherStyles={"border border-[#71c9bd]"}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center">
                                            <img
                                                src={sunCloud}
                                                alt="sun behing clouds"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-right flex gap-2  items-center">
                                                <span className="text-2xl font-light">
                                                    {temperature}&#176;
                                                </span>
                                                <span className="block text-l font-light">
                                                    {prediction}
                                                </span>
                                            </div>
                                            <div className="border-t border-black my-2"></div>
                                            <div className="flex flex-col">
                                                <div className="text-right flex gap-2  items-center">
                                                    <span className="text-md font-light">
                                                        {humidity}%
                                                    </span>
                                                    <span className="block text-sm font-light">
                                                        humidity
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="flex gap-4 items-start">
                                <Card
                                    className="p-4 bg-yellow-50"
                                    bgColor={"bg-[#EDF9DA]"}
                                >
                                    <div className="flex justify-between items-center">
                                        <h2 className="font-semibold">
                                            Pests and Diseases
                                        </h2>
                                        <ChevronDown />
                                    </div>
                                    <div className="mt-2 bg-yellow-200 rounded-full h-2"></div>
                                </Card>

                                <Card className="p-4" bgColor={"bg-[#FAEBEB]"}>
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="font-semibold">
                                            Production
                                        </h2>
                                        <RotateCw />
                                    </div>
                                    <div className="h-32 flex items-end space-x-2">
                                        <div className="bg-teal-500 w-1/4 h-full"></div>
                                        <div className="bg-blue-300 w-1/4 h-3/4"></div>
                                        <div className="bg-purple-500 w-1/4 h-5/6"></div>
                                        <div className="bg-yellow-500 w-1/4 h-1/2"></div>
                                    </div>
                                    <div className="text-center mt-2">
                                        weeks
                                    </div>
                                </Card>
                                <Card bgColor={"bg-[#FAEBEB]"}>
                                    <PieChart
                                        dataSet={chance}
                                        labels={disease}
                                    />
                                </Card>
                            </div>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className="p-4 pt-7">
                    <Bell className="text-gray-500" />
                </div>
            </div>
        </>
    )
}

export default OrchardManagement
