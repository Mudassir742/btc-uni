"use client"
import { usePathname } from 'next/navigation';
import StickyCalltoAction from './header/StickyCalltoAction';

const ParentStickyCallToAction = () => {
  const pathname = usePathname() || "";

  // Define an array of path prefixes you want to exclude
  const excludedPathPrefixes = [
    // '/log-in',
    '/log-out',
    // '/forgot-password',
    '/subscribe',
    '/set-password',
    '/success',
    '/basics',
    '/welcome',
    '/signup',
    '/free',
    '/checkout',
    // '/',
  ];

  return (
    <div >
      {/* {!(pathname.startsWith('/sign-up') || excludedPathPrefixes.some(prefix => pathname.startsWith(prefix))) && (
        <StickyCalltoAction />
      )} */}
    </div>
  );
}

export default ParentStickyCallToAction;

