import React from 'react';
import Card from '../../components/common/Card';
import Counter from './Counter';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Website and Web Application Development',
      description: 'We develop professional websites tailored to various industries, featuring flexible and precise content management systems. We rely on the latest programming technologies to ensure high performance, security, and user-friendly experiences.',
      icon: '/images/img_group_2.png',
    },
    {
      id: 2,
      title: 'Mobile Application Development',
      description: 'We design and build custom applications for iOS, Android, and other platforms, with a focus on user experience, speed, and seamless integration with content management systems or databases as needed.',
      icon: '/images/img_vector_91x91.png',
    },
    {
      id: 3,
      title: 'Enterprise Resource Planning (ERP) Systems',
      description: 'We provide comprehensive management systems that help businesses organize human resources, project management, accounting, procurement, and inventory. All systems are fully customizable to match the nature of each business and client needs.',
      icon: '/images/img_group.png',
    },
    {
      id: 4,
      title: 'E-Commerce Solutions',
      description: 'We offer integrated solutions for building and managing efficient online stores, featuring secure payment gateways, order tracking systems, and logistics integrations — expanding digital commerce reach and supporting sustainable sales growth.',
      icon: '/images/img_layer5.png',
    },
    {
      id: 5,
      title: 'Professional Translation and Transcription',
      description: 'Our translation team specializes in general, legal, and technical translation, in addition to professional transcription, video translation, and high-quality subtitle creation tailored for businesses and media projects.',
      icon: '/images/img_group_90x90.png',
    },
    {
      id: 6,
      title: 'Digital Marketing and Advertising',
      description: '*Sponsored advertising on social media platforms\n*Content and business page management\n*Search engine optimization (SEO)\n*Advertising data analysis and ROI optimization\n*building digital brand identities and strengthening online presence',
      icon: '/images/img_vector_90x90.png',
    },
  ];

  return (
    <section className="bg-background-light dark:bg-optra-darkGray py-20 transition-colors">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-5xl font-extrabold text-text-light dark:text-white leading-tight mb-8 font-cairo transition-colors">
            Quality you can rely on, in services you truly deserve
          </h2>
          <p className="text-lg text-text-light dark:text-white max-w-3xl font-cairo transition-colors">
            Embark on a journey of innovation and technology with our wide range of services that enhance your digital presence, starting from captivating designs to intelligent, strategic solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              title={service.title}
              description={service.description}
              icon={
                <img 
                  src={service.icon} 
                  alt={service.title} 
                  className="h-12 filter dark:invert dark:brightness-100 dark:contrast-100 invert-0 brightness-0 contrast-100"
                />
              }
              className="h-full"
            />
          ))}
        </div>

        <div>
          <h3>Clients</h3>
          <div><Counter end={12000} suffix="K" /></div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;