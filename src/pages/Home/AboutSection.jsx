import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-background-light dark:bg-optra-black py-20 transition-colors">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  <div className="mt-8 md:mt-12">
    <img 
      src="/images/img_picture.png" 
      alt="Team member" 
      className="w-full h-auto rounded-[20px] sm:w-auto sm:h-48 md:h-56 lg:h-auto"
    />
  </div>
  <div className="mt-0 md:-mt-4">
    <img 
      src="/images/img_picture_384x189.png" 
      alt="Team member" 
      className="w-full h-auto rounded-[20px] sm:w-auto sm:h-48 md:h-56 lg:h-auto"
    />
  </div>
  <div className="mt-8 md:mt-12">
    <img 
      src="/images/img_picture_1.png" 
      alt="Team member" 
      className="w-full h-auto rounded-[20px] sm:w-auto sm:h-48 md:h-56 lg:h-auto"
    />
  </div>
</div>

          
          <div>
            <h2 className="text-5xl font-extrabold text-optra-green mb-6 font-cairo sm:text-3xl md:text-4xl lg:text-5xl">
              About optra
            </h2>
            <p className="text-lg leading-9 text-text-light dark:text-white font-cairo transition-colors sm:text-base md:text-lg">
              We Are IT solutions Agency company specializing in providing integrated software solutions, catering to the needs of businesses and organizations. Established in 2024 in an exceptional environment, we have quickly established ourselves thanks to a clear vision and a highly qualified team. We offer our services to enable companies to transform digitally and achieve greater operational efficiency through software systems specifically designed to suit the nature of their businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;