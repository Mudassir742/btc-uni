"use client";

// deprecated following Hamzahs updates on Oct 2-3

import { useEffect, ReactNode } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

import useAuth from "../hooks/useAuth";


// export default function UnAuthContent({ children }: { children: ReactNode }) {
//   const { loggedIn, loading } = useAuth();
//   const router = useRouter();

//   // Navigate authenticated users to Members page.
//   useEffect(() => {
//     if (!loading && loggedIn) {
//       router.push('/members');
//     }
//   }, [loggedIn, loading, router]);

//   if (!loggedIn) {
//     return <>{children}</>;
//   }

//   return <p>Loading...</p>;
// }

export default function UnAuthContent({ children }: { children: ReactNode }) {
    const { loggedIn, loading } = useAuth();
    const router = useRouter();
  
    // Navigate authenticated users to Members page.
    useEffect(() => {
      if (!loading && loggedIn) {
        router.push('/members');
      }
    }, [loggedIn, loading, router]);
  
    if (!loggedIn) {
      return <>{children}</>;
    }
  
    return <p>Loading...</p>;
  }

// interface UnAuthContentProps {
//     children: ReactNode;
//     loggedIn: boolean;
//     loading: boolean;
//   }
  
//   export default function UnAuthContent({ children, loggedIn, loading }: UnAuthContentProps) {
//     const router = useRouter();
  
//     // Navigate authenticated users to Members page.
//     useEffect(() => {
//       if (!loading && loggedIn) {
//         router.push('/members');
//       }
//     }, [loggedIn, loading, router]);
  
//     if (!loggedIn) {
//       return <>{children}</>;
//     }
  
//     return <p>Loading...</p>;
//   }
