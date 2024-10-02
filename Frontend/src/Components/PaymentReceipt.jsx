import React from 'react';
import { FaClock, FaCloudDownloadAlt, FaShareAlt } from 'react-icons/fa';
import { IoIosPrint } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from "../assets/Kart.com-1.png";
import { toast, ToastContainer } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PaymentReceipt = ({ showreceipt = 'invisible' }) => {
    const { OrderList } = useSelector(state => state.Order);

    const handlePrint = () => {
        const receipt = document.getElementById('receipt');
        window.print();
    };

    const handleDownload = () => {
        const input = document.getElementById('receipt');

        const images = input.querySelectorAll('img');
        const promises = Array.from(images).map(img => {
            return new Promise((resolve, reject) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = reject;
                }
            });
        });

        Promise.all(promises)
            .then(() => {
                setTimeout(() => {
                    html2canvas(input, {
                        scale: 2.5,
                        useCORS: true,
                    }).then(canvas => {
                        const imgData = canvas.toDataURL('image/png');
                        const pdf = new jsPDF('p', 'mm', 'a4');
                        const imgWidth = 210;
                        const imgHeight = (canvas.height * imgWidth) / canvas.width;

                        if (imgHeight > 297) {
                            let position = 0;
                            const pageHeight = 297;

                            while (position < imgHeight) {
                                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                                position += pageHeight;
                                if (position < imgHeight) {
                                    pdf.addPage();
                                }
                            }
                        } else {
                            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                        }

                        pdf.save('receipt.pdf');
                    }).catch(error => {
                        console.error("Error generating canvas:", error);
                    });
                }, 500);
            })
            .catch(error => {
                console.error("Error loading images:", error);
            });
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Payment Receipt',
                    text: 'Payment receipt from Kart.com',
                    url: window.location.href,
                });
                toast.success('Thanks for sharing!');
            } else {
                toast.info('Sharing not supported on this browser. Please copy the link manually.');
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                toast.info('Sharing was canceled.');
            } else {
                toast.error(`Error: ${error.message}`);
            }
        }
    };

    const CustomerData = OrderList.length > 0 ? OrderList[0].shippingInfo : {};
    const PaymentData = OrderList.length > 0 ? OrderList[0].payment : {};

    // Calculate total price, total tax, shipping cost, and grand total
    const totalPrice = OrderList.reduce((total, item) => {
        return total + item.order.reduce((sum, order) => sum + (order.price * order.quantity), 0);
    }, 0);

    const totalTax = OrderList.reduce((total, item) => total + item.tax, 0); // Assuming tax is stored in the response
    const shippingCost = OrderList.reduce((total, item) => total + item.shippingCost, 0); // Assuming shipping cost is stored in the response
    const grandTotal = totalPrice + totalTax + shippingCost;

    return (
        <div id='receipt' className={`${showreceipt === 'visible' ? 'visible' : 'invisible'} shadow-2xl w-full bg-slate-200 rounded-lg mx-auto p-4 box-border overflow-visible`}>
            {showreceipt === 'visible' && (
                <>
                    <h2 className="text-3xl max-sm:text-xl max-sm:font-base font-bold m-4 p-4 text-center border-b-4 border-blue-600 border-dashed">Payment Receipt</h2>
                    <div className='my-10'>
                        <Link to={'/'} className="flex font-bold items-center justify-center">
                            <span className="text-pink-600 text-4xl hover:scale-2.5">
                                Kart <span className="text-blue-600 text-4xl">.com</span>
                            </span>
                        </Link>
                        <p className='font-semibold text-center text-blue-600 mt-4'>A Platform For All Your Needs</p>
                    </div>
                    <div className='flex flex-wrap iteam-center'>
                        <div className='w-1/2 max-sm:w-full'>
                            <div className='flex flex-wrap max-md:flex-col iteam-center justify-between'>
                                <div>
                                    <span className="text-2xl max-sm:text-xl max-sm:font-base font-bold p-4">Customer Data</span>
                                    <div className='p-4 text-xl max-sm:text-base font-semibold'>
                                        <p>{CustomerData.email}</p>
                                        <p>{CustomerData.phone}</p>
                                        <p>{CustomerData.address}</p>
                                        <p>{CustomerData.city}</p>
                                        <p>{CustomerData.state}</p>
                                        <p>{CustomerData.country}</p>
                                        <p>{CustomerData.pincode}</p>
                                    </div>
                                </div>
                                <div className='pr-2 mt-4'>
                                    <span className="text-2xl max-sm:text-xl max-sm:font-base font-bold">Payment Data</span>
                                    <table className="text-xl max-sm:text-base max-sm:font-base font-semibold px-2">
                                        <tbody>
                                            <tr>
                                                <th className='pr-6 text-start'>Id</th>
                                                <td className="mx-8 max-sm:mx-0 text-clip">{PaymentData.id}</td>
                                            </tr>
                                            <tr>
                                                <th className='pr-6 text-start'>Status</th>
                                                <td className="mx-8 max-sm:mx-0 text-clip ">{PaymentData.status}</td>
                                            </tr>
                                            <tr>
                                                <th className='pr-6 text-start'>Method</th>
                                                <td className="mx-8 max-sm:mx-0 text-clip ">{PaymentData.method}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <span className="text-2xl max-sm:text-xl max-sm:font-base font-bold p-4">Order Data</span>
                        <div className='p-4 text-xl max-sm:text-base font-semibold flex iteam-center flex-wrap'>
                            {OrderList.map((item) => (
                                <div key={item.id} className='w-1/2 max-sm:w-full flex iteam-center flex-wrap'>
                                    {item.order.map((e, id) => (
                                        <div key={id} className='w-full max-md:w-full p-4 m-2 border-4 rounded-lg shadow-2xl box-border overflow-clip relative'>
                                            <img src={e.image} alt={e.name} className="w-full h-48 object-contain rounded-md mb-4" />
                                            <h2 className="text-xl font-semibold mb-2 text-center">{e.name}</h2>
                                            <div className="text-base font-semibold mt-4 overflow-clip">
                                                <span className="text-pink-600">Id</span><span className="ml-2 text-clip">{e.productData}</span>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between gap-2 pt-4">
                                                <span className="text-2xl font-bold text-pink-600 dark:text-white">₹{e.price}</span>
                                                <div className="text-xl font-semibold mt-4 overflow-clip">
                                                    <span className="text-pink-600">Quantity</span><span className="ml-2 text-clip text-blue-600">{e.quantity}</span>
                                                </div>
                                            </div>
                                            <p className="text-2xl max-sm:text-xl max-sm:font-base font-bold p-4 text-center">Status</p>
                                            <table key={id} className="text-xl max-sm:text-base max-sm:font-base font-semibold px-6">
                                                <tbody>
                                                    <tr>
                                                        <th className='pr-6 text-start'>Order Status</th>
                                                        <td className="mx-8 text-clip ">{item.orderStatus}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='pr-6 text-start'>Order DeliverAt</th>
                                                        <td className="mx-8 text-clip ">{item.deliveredAt.toString().substr(0, 10) + ' At  ' + item.deliveredAt.toString().substr(12, 7)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='pr-6 text-start'>Date</th>
                                                        <td className="mx-8 max-sm:mx-0 text-clip ">{item.paidAt.toString().substr(0, 10)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='pr-6 text-start'>Time</th>
                                                        <td className="mx-8 max-sm:mx-0 text-clip ">{item.paidAt.toString().substr(12, 7)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* New Total Calculations Section */}
                    <div className='mt-8 p-4 border-t-2 border-gray-400'>
                        <h3 className="text-2xl max-sm:text-xl max-sm:font-base font-bold">Order Summary</h3>
                        <table className="text-xl max-sm:text-base font-semibold w-full mt-4">
                            <tbody>
                                <tr>
                                    <th className='pr-6 text-start'>Total Price</th>
                                    <td className="mx-8 text-clip">₹{totalPrice.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th className='pr-6 text-start'>Total Tax</th>
                                    <td className="mx-8 text-clip">₹{totalTax.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th className='pr-6 text-start'>Shipping Cost</th>
                                    <td className="mx-8 text-clip">₹{shippingCost.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th className='pr-6 text-start'>Grand Total</th>
                                    <td className="mx-8 text-clip font-bold text-xl">₹{grandTotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* End of New Total Calculations Section */}
                    <div className='mt-24 max-sm:mt-8'>
                        <div className="flex text-2xl items-center gap-2 justify-center">
                            <span className="text-green-600">Verified By</span>
                            <span><img className="w-12 h-12 rounded-full" src={Logo} alt="Logo" /></span>
                        </div>
                    </div>
                    <div className='flex flex-wrap iteam-center justify-center gap-10 my-12'>
                        <button onClick={handlePrint} className='px-12 max-sm:px-4 py-2 bg-blue-600 text-white rounded-lg flex iteam-center gap-4 hover:bg-blue-900 transition-all'>
                            <span><IoIosPrint size={30} /></span>
                            <span>Print</span>
                        </button>
                        <button onClick={handleDownload} className='px-12 max-sm:px-4 py-2 bg-blue-600 text-white rounded-lg flex iteam-center gap-4 hover:bg-blue-900 transition-all'>
                            <span><FaCloudDownloadAlt size={30} /></span>
                            <span>Download</span>
                        </button>
                        <button onClick={handleShare} className='px-12 max-sm:px-4 py-2 bg-blue-600 text-white rounded-lg flex iteam-center gap-4 hover:bg-blue-900 transition-all'>
                            <span><FaShareAlt size={30} /></span>
                            <span>Share</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentReceipt;
