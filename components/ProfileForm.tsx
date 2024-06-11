"use client"
import React, { useState } from 'react';
import Completed from './icons/Completed';
import FullWidthForm from './forms/FullWidthForm';
import DropDownForm from './forms/DropDownForm';
import { Button } from './ui/Button';

interface Country {
  code: string;
  name: string;
}

export default function ProfileForm() {
  const country = "United States";
  const firstName = 'Briana';
  const lastName = 'Sanazzaro';
  const experianceLevel = 'Intermediate';
  const birthday = 'June 29, 1971';
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleButtonClick = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="flex flex-wrap md:px-[194px]">
      <form method="post" className='flex w-full flex-col md:flex-row' id="profile-form">
        <div className='w-full md:w-1/2'>
          <div className="text-center">
            <label htmlFor="profile-first-name" className='invisible'>First Name</label>
            <FullWidthForm
              placeholder={firstName}
              name="firstName"
              autoComplete="given-name"
            />

            <label htmlFor="profile-last-name" className='invisible'>Last Name</label>
            <FullWidthForm
              placeholder={lastName}
              name="lastName"
              autoComplete="family-name"
            />

            <label htmlFor="profile-experience-level" className='invisible'>Experience Level</label>
            <FullWidthForm
              placeholder={experianceLevel}
              name="experience"
            />

            <label htmlFor="profile-birthday" className='invisible'>Birthday</label>
            <FullWidthForm
              placeholder={birthday}
              name="birthday"
              autoComplete="birthday"
              type="date"
            />

            <label htmlFor="profile-email" className='invisible'>Email Address</label>
            <FullWidthForm
              placeholder="brianas@gmail.com"
              name="email"
              autoComplete="email"
            />
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <div className="text-center">
            <label htmlFor="profile-country" className='invisible'>Country</label>
            <DropDownForm
              placeholder={country}
              fill="black"
              defaultValue="United States"
              options={[
                "United States",
                "Canada",
                "United Kingdom",
                "Australia",
              ]}
            />
          </div>
          <div className="space-under-category-titles"/> 

          {showConfirmation && (
        <p className="profile-update-confirmation flex flex-row justify-center p-2">
          <span className='mr-2'><Completed fill={'black'} /></span> Profile details have been updated.
        </p>
      )}

      <div onClick={handleButtonClick}>
    
        <Button variant="secondary" >Submit</Button>

      </div>
        </div>
      </form>

     
    </div>
  );
}
