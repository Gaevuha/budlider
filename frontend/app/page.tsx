import { Suspense } from 'react';
import HomeClient from './HomeClient';
import Loader from '@/components/Loader/Loader'; // твій компонент спінера

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <HomeClient />
    </Suspense>
  );
}
