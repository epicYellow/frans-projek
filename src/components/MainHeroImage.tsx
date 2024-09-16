import React from 'react';

import Image from 'next/image';

import config from '../config/index.json';

const MainHeroImage = () => {
  const { mainHero } = config;
  return (
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <Image
        src={mainHero.img}
        width={1000}
        height={600}
        alt="happy team image"
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
      />
    </div>
  );
};

export default MainHeroImage;
