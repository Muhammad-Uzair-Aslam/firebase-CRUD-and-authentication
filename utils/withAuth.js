"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";

const withAuth = (Component) => {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // For loading state
    const [isAuthenticated, setIsAuthenticated] = useState(false); // For authentication state
    const [user,setUser]=useState({})
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true); // User is authenticated
          setUser(user)
        } else {
          router.push("/login"); // Redirect if not authenticated
        }
        setLoading(false); // Authentication check is done
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      // Show a loading spinner while checking authentication
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-500">Loading...</div>
        </div>
      );
    }

    if (!isAuthenticated) {
      // Optionally, you could show a fallback message
      return null;
    }
    

    return <Component {...props} user={user} />;
  };
};

export default withAuth;
