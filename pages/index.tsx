import type { NextPage } from "next";
import { GeneralLayout } from "../components/layouts";

const Home: NextPage = () => {
  return (
    <GeneralLayout title="test">
      <div className="">
        <div>
          <h1 className="text-3xl font-bold underline ">Hello world!</h1>

          <p className={""}>Tailwind css is working!</p>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default Home;
