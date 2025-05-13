import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-background-light dark:bg-optra-black py-20 transition-colors">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <img 
                src="/images/img_picture.png" 
                alt="Team member" 
                className="w-full h-auto rounded-[20px] mb-4"
              />
            </div>
            <div className="col-span-1 mt-12">
              <img 
                src="/images/img_picture_384x189.png" 
                alt="Team member" 
                className="w-full h-auto rounded-[20px] mb-4"
              />
            </div>
            <div className="col-span-1 mt-8">
              <img 
                src="/images/img_picture_1.png" 
                alt="Team member" 
                className="w-full h-auto rounded-[20px]"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-5xl font-extrabold text-optra-green mb-6 font-cairo">
              About optra
            </h2>
            <p className="text-lg leading-9 text-text-light dark:text-white font-cairo transition-colors">
              We Are IT solutions Agency company specializing in providing integrated software solutions, catering to the needs of businesses and organizations. Established in 2024 in an exceptional environment, we have quickly established ourselves thanks to a clear vision and a highly qualified team. We offer our services to enable companies to transform digitally and achieve greater operational efficiency through software systems specifically designed to suit the nature of their businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;