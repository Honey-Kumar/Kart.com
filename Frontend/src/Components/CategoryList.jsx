import ProductCard from "./ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryList = ({ Title, product }) => {
    const { wishlist } = useSelector(state => state.Wishlist)
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3, // optional, default to 1.
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
            partialVisibilityGutter: 30
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
            partialVisibilityGutter: 30
        }
    };

    return (
        <div className="mt-10 max-sm:mt-8 mb-16 border-4 p-4 overflow-hidden z-0">
            <p className="text-2xl font-bold text-pink-600 pb-2 max-sm:text-center">{Title}</p>
            <div className="pt-5 pb-3">
                {
                    product?.response ?
                        <Carousel
                            className="z-0"
                            responsive={responsive}
                            additionalTransfrom={0}
                            arrows
                            autoPlaySpeed={3000}
                            centerMode={false}
                            draggable
                            focusOnSelect={false}
                            infinite
                            keyBoardControl
                            minimumTouchDrag={80}
                            pauseOnHover
                            renderArrowsWhenDisabled={false}
                            renderButtonGroupOutside={false}
                            renderDotsOutside={false}
                            rewind={false}
                            rewindWithAnimation={false}
                            rtl={false}
                            shouldResetAutoplay
                            showDots={false}
                            swipeable
                        >
                            {
                                product?.response?.map((e, id) =>
                                    <Link to={`/product/${e?._id}`} key={id}>
                                        <ProductCard
                                            key={id}
                                            description={e?.description}
                                            headline={e?.name}
                                            image={e?.image.at(0)?.url}
                                            ratings={e?.ratings}
                                            id={e?._id}
                                            fav={wishlist.some(i => i?.id === e?._id) ? true : false}
                                            price={e.price}
                                        />
                                    </Link>

                                )
                            }
                        </Carousel>
                        : <div className="w-full text-center">
                            <p className=" w-full p-4 text-2xl font-semibold text-pink-600">No Data Exists</p>
                        </div>
                }
            </div>
        </div>
    );
}

export default CategoryList;



