'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const PageHeader = () => {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState('Welcome Back');

  useEffect(() => {
    if (pathname === '/repository') {
      setPageTitle('Explore All Repositories');
    } else if (pathname === '/my-repository') {
      setPageTitle('Do what you gotta do');
    } else {
      setPageTitle("Welcome Back, Ma'am Doods");
    }
  }, [pathname]);

  return <p className="text-xl font-extrabold text-gray-800 drop-shadow-md">{pageTitle}</p>;
};

export default PageHeader;
