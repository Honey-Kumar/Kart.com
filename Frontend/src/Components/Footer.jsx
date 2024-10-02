import { Link } from "react-router-dom";
import Logo from "../assets/Kart.com-1.png"
import {
    AiFillFacebook,
    AiFillLinkedin,
    AiFillInstagram,
    AiOutlineYoutube,
    AiOutlineInstagram,
    AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
    return (
        <>
            <footer className="bg-black text-gray-600 body-font">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <Link to={'/'} className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        <span className="text-pink-600 text-4xl hover:scale-2.5">
                            Kart <span className="text-white text-4xl">.com</span>
                        </span>
                    </Link>
                    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                        © 2020 Kart.com — @Kart.com
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-between">
                        <AiFillFacebook
                            size={26}
                            className="p-0.5 flex justify-center items-center"
                        />
                        <AiOutlineYoutube
                            size={26}
                            className="p-0.5 flex justify-center items-center"
                        />
                        <AiOutlineInstagram
                            size={26}
                            className="p-0.5 flex justify-center items-center"
                        />
                        <AiOutlineTwitter
                            size={26}
                            className="p-0.5 flex justify-center items-center"
                        />
                        <AiFillLinkedin
                            size={26}
                            className="p-0.5 flex justify-center items-center"
                        />
                    </span>
                </div>
            </footer>
        </>
    )
}
export default Footer