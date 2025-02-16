import appleCountMap5095 from "../assets/models-report-img/apple-count-map50-95.png"
import appleCountMap50 from "../assets/models-report-img/apple-count-map50.png"
import appleCountPrecision from "../assets/models-report-img/apple-count-precision.png"
import appleCountRecall from "../assets/models-report-img/apple-count-recall.png"
import appleDiseaseAccuracy from "../assets/models-report-img/apple-disease-accuracy.png"
import appleDiseaseLoss from "../assets/models-report-img/apple-disease-loss.png"
import appleDiseaseLr from "../assets/models-report-img/apple-disease-lr.png"
import appleLeavesVariety from "../assets/models-report-img/apple-leaves-variety.jpeg"
import confusionMatrix1 from "../assets/models-report-img/confusion_matrix(1).png"
import F1Curve from "../assets/models-report-img/F1_curve.png"
import leavesVariety2 from "../assets/models-report-img/leaves-variety2.jpeg"
import RCurve from "../assets/models-report-img/R_curve.png"
import treePartMap5095 from "../assets/models-report-img/tree-part-mAP50-95.png"
import treePartMap50 from "../assets/models-report-img/tree-part-mAP50.png"
import treePartPrecision from "../assets/models-report-img/tree-part-precision.png"
import treePartRecall from "../assets/models-report-img/tree-part-recall.png"
import treePartClassificationImg from "../assets/models-report-img/tree-part-classification.jpg"
import treePartClassificationImg2 from "../assets/models-report-img/tree-part-classification2.jpg"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Card from "../components/Card"

const ModelsReport = () => {
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        cssEase: "ease-in",
    }
    return (
        <div className="container mx-auto p-6 bg-[#f2f2f2] flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-8">
                Models Report
            </h1>
            {/* Leaf diseases model */}

            {/* Tree parts classification model */}
            <section className="mb-12 flex flex-col px-14">
                <h2 className="text-2xl font-bold mb-4">
                    Tree Parts Classification Model
                </h2>
                <div className="flex gap-[20px] items-start">
                    <div className="flex flex-col gap-[5px]">
                        <Card>
                            <h3 className="text-xl font-semibold mb-2 w-80">
                                Metrics
                            </h3>
                            <div className="mb-4">
                                <p>
                                    <strong>Model Name:</strong> Yolo V8
                                </p>
                                <p>
                                    <strong>Dataset:</strong> 1.2K images
                                </p>
                                <p>
                                    <strong>Accuracy:</strong> 0.67
                                </p>
                            </div>
                        </Card>
                        <Card>
                            <h3 className="text-xl font-semibold mb-2 w-80">
                                Sample Data
                            </h3>
                            <div className="flex gap-4">
                                <img
                                    className="h-[135px] w-[135px] rounded"
                                    src={treePartClassificationImg}
                                    alt="leaves"
                                />
                                <img
                                    className="h-[135px] w-[135px]"
                                    src={treePartClassificationImg2}
                                    alt="leaves"
                                />
                            </div>
                        </Card>
                    </div>

                    <div className="flex flex-col rounded-lg p-4 bg-[#91b091] shadow-md">
                        <h3 className="font-semibold mb-4 text-white ml-6 font-medium">
                            Training Stats
                        </h3>
                        <div className="slide-container relative">
                            <Slider
                                className="w-[60vw] h-[50vh] flex gap-[10px]"
                                {...settings}
                            >
                                <Card margin={"mx-6"}>
                                    <img
                                        src={treePartMap5095}
                                        alt="Apple Count Map 50-95"
                                        className="h-[240px]"
                                    />
                                </Card>
                                <Card margin={"mx-6"}>
                                    <img
                                        src={treePartMap50}
                                        alt="Apple Count Map 50-95"
                                        className="h-[240px]"
                                    />
                                </Card>
                                <Card margin={"mx-6"}>
                                    <img
                                        src={treePartRecall}
                                        alt="Apple Count Map 50-95"
                                        className="h-[240px]"
                                    />
                                </Card>
                                <Card margin={"mx-6"}>
                                    <img
                                        src={treePartPrecision}
                                        alt="Apple Count Map 50-95"
                                        className="h-[240px]"
                                    />
                                </Card>
                            </Slider>
                            {/* <div className="fade-effect"></div> */}
                        </div>
                    </div>
                </div>
            </section>
            <section className="mb-12 flex flex-col px-14">
                <h2 className="text-2xl font-bold mb-4">
                    Plant / Leaf Diseases Model
                </h2>
                <div className="flex gap-[20px] items-start">
                    <div className="flex flex-col gap-[5px]">
                        <Card>
                            <h3 className="text-xl font-semibold mb-2 w-80">
                                Metrics
                            </h3>
                            <div className="mb-4">
                                <p>
                                    <strong>Model Name:</strong> Microsft
                                    Resent9
                                </p>
                                <p>
                                    <strong>Dataset:</strong> 67K images
                                </p>
                                <p>
                                    <strong>Accuracy:</strong> 0.99
                                </p>
                            </div>
                        </Card>
                        <Card>
                            <h3 className="text-xl font-semibold mb-2 w-80">
                                Sample Data
                            </h3>
                            <div className="flex gap-4">
                                <img
                                    className="h-[135px]"
                                    src={appleLeavesVariety}
                                    alt="leaves"
                                />
                                <img
                                    className="h-[135px]"
                                    src={leavesVariety2}
                                    alt="leaves"
                                />
                            </div>
                        </Card>
                    </div>

                    <div className="flex flex-col rounded-lg p-4 bg-[#91b091] shadow-md">
                        <h3 className="font-semibold mb-4 text-white ml-6 font-medium">
                            Training Stats
                        </h3>
                        <div className="slide-container relative">
                            <Slider
                                className="w-[60vw] h-[50vh] flex gap-[10px]"
                                {...settings}
                            >
                                <Card margin={"mx-6"}>
                                    <img
                                        src={appleDiseaseAccuracy}
                                        alt="Apple Count Map 50-95"
                                        className="h-[240px]"
                                    />
                                </Card>
                                <Card margin={"mx-6"}>
                                    <img
                                        src={appleDiseaseLoss}
                                        alt="Apple Count Map 50-95"
                                        className="h-[240px]"
                                    />
                                </Card>
                                <Card margin={"mx-6"}>
                                    <img
                                        src={appleDiseaseLr}
                                        alt="Apple Count Map 50-95"
                                        className="h-[240px]"
                                    />
                                </Card>
                            </Slider>
                            {/* <div className="fade-effect"></div> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Apple count model*/}
            <section className="mb-12 flex flex-col px-14">
                <h2 className="text-2xl font-bold mb-4">Apple count model</h2>
                <div className="flex gap-[20px] items-start">
                    <div className="flex flex-col gap-[5px]">
                        <Card>
                            <h3 className="text-xl font-semibold mb-2 w-80">
                                Metrics
                            </h3>
                            <div className="mb-4">
                                <p>
                                    <strong>Model Name:</strong> Yolo V8
                                </p>
                                <p>
                                    <strong>Dataset:</strong> 67K images
                                </p>
                                <p>
                                    <strong>Accuracy:</strong> 0.99
                                </p>
                            </div>
                        </Card>
                        <Card>
                            <h3 className="text-xl font-semibold mb-2 w-80">
                                Sample Data
                            </h3>
                            <div className="flex gap-4">
                                <img
                                    className="h-[135px]"
                                    src={appleLeavesVariety}
                                    alt="leaves"
                                />
                                <img
                                    className="h-[135px]"
                                    src={leavesVariety2}
                                    alt="leaves"
                                />
                            </div>
                        </Card>
                    </div>

                    <div className="flex flex-col rounded-lg p-4 bg-[#91b091] shadow-md">
                        <h3 className="font-semibold mb-4 text-white ml-6 font-medium">
                            Training Stats
                        </h3>
                        <div className="slide-container relative">
                            <Slider
                                className="w-[60vw] h-[50vh] flex gap-[10px]"
                                {...settings}
                            >
                                <Card margin={"mx-6"}>
                                    <img
                                        src={appleCountMap5095}
                                        alt="Apple Count Map 50-95"
                                        className="h-[240px]"
                                    />
                                </Card>
                                <Card margin={"mx-6"}>
                                    <img
                                        src={appleCountMap50}
                                        alt="Apple Count Map 50-95"
                                        className="h-[240px]"
                                    />
                                </Card>
                                <Card margin={"mx-6"}>
                                    <img
                                        src={appleCountPrecision}
                                        alt="Apple Count Map 50-95"
                                        className="h-[240px]"
                                    />
                                </Card>
                                <Card margin={"mx-6"}>
                                    <img
                                        src={appleCountRecall}
                                        alt="Apple Count Map 50-95"
                                        className="h-[240px]"
                                    />
                                </Card>
                            </Slider>
                            {/* <div className="fade-effect"></div> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ModelsReport
