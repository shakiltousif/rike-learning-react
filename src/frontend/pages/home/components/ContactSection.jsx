import React from 'react'

function ContactSection() {
  return (
    <>
      <section className="contact-section bg-[#112263]">
        <div className="container mx-auto px-4 py-16 lg:py-40">
          <div className="mx-auto">
            <h2 className="section-header text-5xl text-white text-center font-bold uppercase mb-8">Our Location</h2>
            <div className="lg:grid-cols-3 md:gap-0 sm:gap-0 lg:gap-2">
              <div className="bg-white rounded-md shadow-md p-2 col-span-2 w-full">
                <div className="w-full h-fill md:h-60 sm:h-60 lg:h-[450px]">
                  <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23456.78901234567!2d-77.0368707!3d38.9071923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDIzJzE4LjYiTiA3N8KwMzQnMjMuNiJX!5e0!3m2!1sen!2sus!4v1626059942520!5m2!1sen!2sus"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactSection