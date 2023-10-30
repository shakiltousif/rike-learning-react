import books from "../../../../assets/home/card-books.svg"
import teachers from "../../../../assets/home/card-teachers.svg"
import timer from "../../../../assets/home/card-timer.svg"
import cardImage from "../../../../assets/home/learning.gif";
import studyImg from "../../../../assets/home/home.jpg";

const CardSection = () => {
    return (
        <>
            <section className="CardSection mx-auto px-4 pt-10 p-[100px] overflow-hidden">
                <div className='text-center mb-5'>
                    <div className='flex justify-center items-center mb-2'>
                        <img src={cardImage} className='w-2/12' alt='' />
                    </div>
                    <div>
                        <p className='text-xl'>Our main objective is to make your free time efficient for learning and earning</p>
                    </div>
                </div>
                <div className='flex flex-col lg:grid grid-cols-2 items-center'>
                    <div className="CardSection-main flex p-8 gap-1">
                        <div className="card mr-1 rounded-lg p-8 flex flex-col justify-center bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 text-white">
                            <div className='card-animation-image'>
                                <img src={books} className='w-full h-full' alt='' />
                            </div>
                            <div className="card-content text-center mt-4 text-white">
                                <h3 className="card-title">12+ courses</h3>
                                <p className="card-description">Check out the list of courses</p>
                            </div>
                        </div>
                        <div className="card rounded-lg p-8 flex flex-col justify-center bg-gradient-to-r to-[#070c44] from-[#422e9d] text-white">
                            <div className='card-animation-image'>
                                <img src={teachers} className='w-full h-full' alt='' />
                            </div>
                            <div className="card-content text-center mt-4 text-white">
                                <h3 className="card-title">Expert Trainer</h3>
                                <p className="card-description">Provide support and development in one or more</p>
                            </div>
                        </div>
                        <div className="card rounded-lg p-4 w-full flex flex-col lg:flex-row justify-between item-center gap-7 bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900">
                            <div className='card-animation-image'>
                                <img src={timer} className='w-full h-full' alt='' />
                            </div>
                            <div className="card-content text-center text-white">
                                <h3 className="card-title">Lifetime Access</h3>
                                <p className="card-description">You can easily access courses</p>
                            </div>
                        </div>
                    </div>
                    <div className="order-last flex justify-center hidden md:block">
                        <img src={studyImg} className='h-[50%] w-[50%]' alt='' />
                    </div>
                </div>
            </section>
        </>
    );
};

export default CardSection;