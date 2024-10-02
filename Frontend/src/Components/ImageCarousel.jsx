import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const ImageCarousel = () => {
    const images = [
        "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d9290fb51138d286.png?q=20",
        "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/e7554fcdb3042316.jpg?q=20",
        "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/37ad18792c32a169.jpg?q=20",
        "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/7c6cf1a109b087d2.jpg?q=20"
    ]
    return (
        <>
            <div
                style={{
                    paddingBottom: '30px',
                    position: 'relative'
                }}
                className="mt-24 max-sm:mt-8 max-sm:mb-8 mb-16 w-full shadow-2xl z-0"
            >
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 1
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 1
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {
                        images.map((e, id) => <img
                            key={id}
                            src={e}
                            style={{
                                display: 'block',
                                height: '100%',
                                margin: 'auto',
                                width: '100%'
                            }}
                        />)
                    }
                </Carousel>
            </div>
        </>
    )
}
export default ImageCarousel