import React, { useState, useEffect } from 'react';
import Breadcrumb from '../layouts/Breadcrumb.jsx';
import Pageloader from '../layouts/PageLoader.jsx';
import faqImage from "../../../assets/faq/faq-section.jpg";
import axios from 'axios';

const Faq = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.usrike-learning.com/public/api/frontend/faq'
        );
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <Pageloader title="FAQ"/>;
  }

  const { pageTitle, faqs } = data;

  return (
    <>
        <Breadcrumb title={pageTitle} />
        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className='w-full flex justify-center items-center'>
                    <img className='w-7/12 h-auto' src={faqImage} alt='faq'/>
                </div>
                <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 uppercase text-center">Frequently asked questions</h2>
                <div className="pt-8 text-left border-t border-gray-200">
                {faqs.map((faq) => (
                    <div className="mb-10" key={faq.id}>
                        <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                            {faq.question}
                        </h3>
                        <p className="text-gray-500">{faq.answer}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </>
  );
};

export default Faq;
