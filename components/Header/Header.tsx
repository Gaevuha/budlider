'use client';

import SearchForm from '../SearchForm/SearchForm';
import { useRouter } from 'next/navigation';
import Logo from '../Logo/Logo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Navigation from '../Navigation/Navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();

  // серверний action (через API або fetch до /api/products)
  const handleSearch = async (formData: FormData) => {
    const searchValue = formData.get('searchValue')?.toString().trim() || '';
    // зберігаємо у localStorage
    localStorage.setItem('budlider_search', searchValue);

    // переходимо на головну з query
    router.push(`/?search=${encodeURIComponent(searchValue)}`);
  };

  return (
    <header className="container header__container">
      <Link className="logo" href="/" aria-label="Site logo">
        <Logo />
      </Link>
      <ThemeToggle />
      <SearchForm action={handleSearch} />
      <Navigation />
    </header>
  );
}

// 'use client';

// import { useSearch } from '@/context/SearchProvider';
// import Logo from '../Logo/Logo';
// import ThemeToggle from '../ThemeToggle/ThemeToggle';
// import SearchForm from '../SearchForm/SearchForm';
// import Navigation from '../Navigation/Navigation';
// import Link from 'next/link';

// export default function Header() {
//   const { setSearchQuery } = useSearch();
//   const handleSearchChange = (q: string) => {
//     onSearch(q);
//   };

//   return (
//     <header className="container header__container">
//       <Link className="logo" href="/" aria-label="Site logo">
//         <Logo />
//       </Link>
//       <ThemeToggle />
//       <SearchForm
//         setSearchQuery={handleSearchChange}
//         initialValue={searchQuery}
//       />
//       <Navigation />
//     </header>
//   );
// }
