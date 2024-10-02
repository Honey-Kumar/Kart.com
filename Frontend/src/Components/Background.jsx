import { useEffect, useState } from "react"

const Background = () => {
    const BackImages = [
        "https://images-eu.ssl-images-amazon.com/images/G/31/Events/img24/Jupiter24/H1/J24_GW_PC_Hero_EN_2x_V4._CB563331696_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/pc_unrec_refresh._CB555261616_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img21/shoes/2024/GW/Aug/BAU/UNREC/allNEW/3000_PC_ALL._CB565541466_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2024/GW/August/Unrec/BAU/21Aug/2-1._CB565867124_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200_V3._CB558389732_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Consumables/X-GL/Feb5/PC_Hero_1_3000._CB582457311_.jpg",
    ]
    const [Imgsrc, setImgsrc] = useState(0);
    useEffect(() => {
        const slider = setInterval(() => {
            setImgsrc(prev => (prev + 1) % BackImages.length);
        }, 4000)

        return () => clearInterval(slider);
    }, [BackImages.length])

    const demolist = [
        "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08345R1ZW._SY116_CB667322346_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08RDL6H79._SY116_CB667322346_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B07G5J5FYP._SY116_CB667322346_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/186x116---wm._SY116_CB667322346_.jpg",
    ]
    const brandlist = [
        "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_boAt_0.5x._SY116_CB553870684_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_Noise_0.5x._SY116_CB553870684_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/MSO/PD3/PC_QuadCard_Zeb_0.5x_1._SY116_CB570220221_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_Boult_0.5x._SY116_CB553870684_.jpg",
    ]
    const deliverlist = [
        "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PC_WF/WF1-186-116._SY116_CB636048992_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PC_WF/WF2-186-116._SY116_CB636048992_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PC_WF/WF3-186-116._SY116_CB636048992_.jpg",
        "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PC_WF/WF4-186-116._SY116_CB636048992_.jpg",
    ]
    return (
        <>
            <div className="w-full h-full relative">
                <img src={BackImages[Imgsrc]} alt="Background" />
                <div className="flex max-sm:flex-col max-sm:gap-4 items-center justify-around w-full max-sm:relative absolute top-1/2 ">
                    <div className="p-4 bg-white rounded-lg border-red-600 ml-5 shadow-2xl">
                        <p className="font-semibold text-xl text-center text-pink-600">Buy Affordable Products Anythime</p>
                        <div className="gap-4 grid grid-cols-2 justify-center mx-auto pt-5">
                            {
                                demolist.map((e, id) => <div key={id}><img className="w-full h-full border rounded-xl" src={e} alt="Cover Image" /></div>)
                            }
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border-red-600 ml-5 shadow-2xl">
                        <p className="font-semibold text-xl text-center text-pink-600">Best Quality and Big Brands</p>
                        <div className="gap-4 grid grid-cols-2 justify-center mx-auto pt-5">
                            {
                                brandlist.map((e, id) => <div key={id}><img className="w-full h-full border rounded-xl" src={e} alt="Cover Image" /></div>)
                            }
                        </div>
                    </div>


                    <div className="p-4 bg-white rounded-lg border-red-600 ml-5 shadow-2xl">
                        <p className="font-semibold text-xl text-center text-pink-600">Easy to Exchange and Deliver</p>
                        <div className="gap-4 grid grid-cols-2 justify-center mx-auto pt-5">
                            {
                                deliverlist.map((e, id) => <div key={id}><img className="w-full h-full border rounded-xl" src={e} alt="Cover Image" /></div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Background