import React from 'react';

interface CourseContentVideoProps {
  embedCode: string;
}

const CourseContentVideo: React.FC<CourseContentVideoProps> = ({ embedCode }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: `
    <div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;">
    <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
      <iframe src="https://fast.wistia.net/embed/iframe/r5zzelx4b1?seo=false&videoFoam=true" title="#ONESHOT Hair Awards 2016 Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" msallowfullscreen width="100%" height="100%"></iframe>
    </div>
  </div>
  <script src="https://fast.wistia.net/assets/external/E-v1.js" async></script>
    ` }} />
  );
};

export default CourseContentVideo;





// import React from 'react';

// interface PromoTrailerProps {
//   embedCode: string;
// }

// const PromoTrailer: React.FC<PromoTrailerProps> = ({ embedCode }) => {
//   return (
//     <div dangerouslySetInnerHTML={{ __html: embedCode }} />
//   );
// };

// export default PromoTrailer;
