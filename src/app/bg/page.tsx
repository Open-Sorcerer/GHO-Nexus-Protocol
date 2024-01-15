import type { NextPage } from "next";

const Page: NextPage = () => {
    return (
        <div className="relative [background:linear-gradient(180deg,_#63ad9c,_#e6eee0),_#fff] w-full h-[61.38rem] overflow-hidden text-center text-[9.13rem] text-darkslategray font-kranky">
            <img
                className="absolute top-[18.3rem] left-[-0.89rem] w-[95.39rem] h-[37.74rem] object-cover"
                alt=""
                src="/last-tree-and-mountain.svg"
            />
            <div className="absolute top-[39.53rem] left-[19.26rem] inline-block w-[55.99rem] opacity-[0]">
                Adventure in the Jungle
            </div>
            <img
                className="absolute top-[24.38rem] left-[0rem] w-[94.5rem] h-[33.37rem] object-cover"
                alt=""
                src="/middle-tree-and-mountain.svg"
            />m
            <img
                className="absolute top-[32.95rem] left-[0rem] rounded-[10px] w-[94.5rem] h-[28.42rem] object-cover"
                alt=""
                src="/middle-mountain.svg"
            />
            <img
                className="absolute h-[47.77%] w-full top-[52.23%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                alt=""
                src="/foreground-tree-and-mountain.svg"
            />
            <img
                className="absolute top-[3.67rem] left-[36.69rem] w-[33.47rem] h-[33.47rem] object-cover"
                alt=""
                src="/sun.svg"
            />
            {/*<div className="absolute h-[4.58%] w-[94.25%] top-[4.38%] right-[2.38%] bottom-[91.04%] left-[3.37%] overflow-hidden text-left text-[1.13rem] text-black font-inter">*/}
            {/*    <div className="absolute top-[calc(50%_-_11px)] left-[calc(50%_-_218px)] flex flex-row items-start justify-start gap-[1.5rem]">*/}
            {/*        <b className="relative">Destinations</b>*/}
            {/*        <b className="relative">Activities</b>*/}
            {/*        <b className="relative">Packages</b>*/}
            {/*        <b className="relative">About Us</b>*/}
            {/*    </div>*/}
            {/*    <img*/}
            {/*        className="absolute h-[94.39%] w-[7.07%] top-[2.8%] right-[92.93%] bottom-[2.8%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"*/}
            {/*        alt=""*/}
            {/*        src="/junglegameartlogoisolated600w1231406437-1@2x.png"*/}
            {/*    />*/}
            {/*    <div className="absolute top-[0.67rem] left-[83.44rem] rounded-[20px] bg-goldenrod flex flex-row items-start justify-start py-[0.63rem] px-[1.13rem] text-[0.69rem] text-saddlebrown">*/}
            {/*        <b className="relative">Book Now</b>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <img
                className="absolute top-[6.15rem] left-[84.43rem] w-[0.73rem] h-[3.29rem] object-contain"
                alt=""
                src="/birds.svg"
            />
        </div>
    );
};

export default Page;
