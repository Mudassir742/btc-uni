
import React from 'react';
import H1Text from './text/H1Text';
import SH2Text from './text/SH2Text';


function HomePageSignInNonSubscriber() {
  return (

    <div>
      There will be 3 total homepages (dependant on who is viewing).
      <br />
      <div className='text-red'>
        Below is the home page, for those  who are not subscribers, but are signed in (free subs) , still need to promote subscription!
      </div>

    </div>
  );
}

export default HomePageSignInNonSubscriber;
