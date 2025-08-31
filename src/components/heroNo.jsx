import React from 'react';
import FlipNumbers from 'react-flip-numbers';

export default function HeroNo() {
  return (
    <div className="flex gap-8 items-center">
      <div>
        <div className="flex items-center">
          <FlipNumbers
            height={36}
            width={25}
            color="white"
            background="transparent"
            play
            duration={3}
            numbers="100"
            numberStyle={{ fontSize: '36px', fontWeight: '500' }}
          />
          <span className="text-white text-4xl font-medium">+</span>
        </div>
        <p className="text-white">Capital Rised</p>
      </div>
      <div>
        <div className="flex items-center">
          <FlipNumbers
            height={36}
            width={25}
            color="white"
            background="transparent"
            play
            numbers="99"
            duration={3}
            numberStyle={{ fontSize: '36px', fontWeight: '500' }}
          />
          <span className="text-white text-4xl font-medium">+</span>
        </div>
        <p className="text-white">Capital Rised</p>
      </div>
      <div>
        <div className="flex items-center">
          <FlipNumbers
            height={36}
            width={25}
            color="white"
            background="transparent"
            play
            numbers="26"
            duration={3}
            numberStyle={{ fontSize: '36px', fontWeight: '500' }}
          />
          <span className="text-white text-4xl font-medium">+</span>
        </div>
        <p className="text-white">Capital Rised</p>
      </div>
    </div>
  );
}