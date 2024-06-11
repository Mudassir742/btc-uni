"use client"
import React from 'react';
import SH1Text from './text/SH1Text';
import AboutTheEducatorCard from './AboutTheEducatorCard';
import Image from "next/image";
import SH2Text from './text/SH2Text';
import { transformWpUrl } from '@/utils/url';

const AboutTheEducator = () => {
  // Define constants for educatorImageSrc, educatorName, and educatorBio
  // const educatorImageSrc = transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/07/Linson-Jamison-300x300-1.jpg");
  const educatorImageSrc = "https://cms.btcuniversity.com/wp-content/uploads/2023/07/Linson-Jamison-300x300-1.jpg";
  const educatorFirstName = "Mary";
  const educatorLastName = "Rector";
  const educatorHandle = "@educatorhandleeducatorhandleeducatorhandleeducatorhandle";
  const educatorBio = "Super short generic bio goes here. super short generic bio goes here. if longer than 3 lines will truncate. here here here here here words.if longer than 3 lines will truncate.";
  const educatorSlug = "/educator/matty-conrad";

  const numberOfEducators = 2; // Change this to the actual number of educators

  const educatorText = numberOfEducators > 1 ? "Educators" : "Educator";

  return (
    <div>
      <SH2Text text={`About The ${educatorText}`}  />
      <div className="space-under-category-titles" />

      {/* Pass the constants as props */}
      <AboutTheEducatorCard
        educatorImageSrc={educatorImageSrc}
        educatorFirstName={educatorFirstName}
        educatorLastName={educatorLastName}
        educatorBio={educatorBio}
        educatorHandle={educatorHandle}
        educatorSlug={educatorSlug}
      />

      <AboutTheEducatorCard
        educatorImageSrc={educatorImageSrc}
        educatorFirstName={educatorFirstName}
        educatorLastName={educatorLastName}
        educatorBio={educatorBio}
        educatorHandle={educatorHandle}
        educatorSlug={educatorSlug}
      />
    </div>
  );
}

export default AboutTheEducator;
