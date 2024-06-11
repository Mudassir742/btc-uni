"use client"

import React, { useState } from 'react';
import ProfileForm from './ProfileForm';

import BackWithOnClick from './buttons/BackWithOnClick';
import SH1Text from './text/SH1Text';
import { Button } from './ui/Button';



const MyInfo = () => {
  const [showMyInfo, setShowMyInfo] = useState(true);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const handleCloseClick = () => {
    setShowMyInfo(false);
  };

  const openResetPasswordModal = () => {
    setIsResetPasswordOpen(!isResetPasswordOpen);
  };



  return (
    <>
      {showMyInfo && (


        <div className="z-30 fixed top-0 left-0 w-full h-screen pt-2 bg-white overflow-y-auto">

          <div className='flex w-full flex-col justify-center bg-white p-5'>
            <div className='flex flex-row justify-between'>


              <BackWithOnClick onClick={handleCloseClick} />

            </div>

            <div className='space-between-categories' />
            <div className='md:flex md:justify-center'>
              <SH1Text text="My Info" />
            </div>

            <div className='space-between-categories' />

            <ProfileForm />


            <div className="space-under-category-titles" />
            <div className="space-under-category-titles" />
            {/* <div className='flex justify-center' onClick={openResetPasswordModal}> */}



            <div>

              <Button>Update Subscription</Button>


            </div>
          </div>
          <div className="space-under-category-titles" />

        </div>

      )}

      {/* {isResetPasswordOpen && (
        <ResetPassword />
      )} */}
    </>
  );
}

export default MyInfo;


