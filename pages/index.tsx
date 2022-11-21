import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { GeneralLayout } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    <GeneralLayout>
      <NextSeo title='Portfolio' />

      <div className=''>
        <div>
          <h1 className='text-3xl font-bold underline '>Hello world!</h1>

          <p className={''}>Tailwind css is working!</p>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default HomePage;
