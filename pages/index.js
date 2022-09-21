import Link from "next/link";
import Head from "next/head";
// import Image from "next/image";

// import astronaut from "../src/images/astronaut.png";
// import img1 from "../public/img1.png";
// import img2 from "../public/img2.png";
// import img3 from "../public/img3.png";
// import img4 from "../public/img4.png";

const App = () => (
  <div>
    <Head>
      <title>W3Commerce</title>
      <meta property="og:title" content="W3Commerce" />
      <meta
        property="og:description"
        content="A tool that allows creator to get whitelisting for their upcoming project"
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/W3CommerceNFT.jpg" />
      <meta property="og:url" content="https://www.W3Commerce.live/" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.W3Commerce.live/" />
      <meta property="twitter:title" content="W3Commerce" />
      <meta
        property="twitter:description"
        content="A tool that allows creator to get whitelisting for their upcoming project"
      />
      <meta
        property="twitter:image"
        content="https://user-images.githubusercontent.com/43033153/170791310-c476115b-4073-48c5-8240-b31a99894648.jpg"
      />
    </Head>
    <section className="px-2 py-20  md:px-0">
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <div className="flex flex-wrap items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-7 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-yellow-500 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline no-select">W3Commerce</span>
              </h1>
              <p className="mx-auto text-base text-white sm:max-w-md lg:text-xl md:max-w-3xl">
                Support you favorite content creators and earn rewards
              </p>
              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <Link href="/marketplace" passHref>
                  <a className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-gradient-to-r from-yellow-500 to-yellow-100 text-black rounded-md sm:mb-0 hover:bg-yellow-700 sm:w-auto">
                    Explore Creators
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </Link>
                <a
                  href="https://vimeo.com/741964359?embedded=true&source=vimeo_logo&owner=182980018"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full h-auto overflow-hidden object-cover">
              {/* <Image src={hero} alt='hero image' /> */}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full  pt-7 pb-7 md:pt-20 md:pb-24">
      <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
        <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
          {/* <Image
            src={img1}
            className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "
            width="300px"
            height="300px"
            alt="image"
          /> */}
        </div>

        <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
          <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl text-yellow-400">
            Build a direct, meaningful connection with your audience
          </h2>
          <p className="pt-4 pb-8 m-0 leading-7 text-yellow-100 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
            No ads, no trolls, no algorithms. Enjoy direct access and deeper
            conversations with the people who matter the most.
          </p>
          <ul className="p-0 m-0 leading-6 border-0 border-gray-300 space-y-2">
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              With W3Commerce, its not about likes and views, you can really{" "}
              <br />
              connect with your fans.
            </li>
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              ignore the haters and focus on the positive. Id rather have 300{" "}
              <br />
              patrons than 3 million Instagram followers
            </li>
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              Adding support for multiple wallets to the login process
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section className="w-full  pt-7 pb-7 md:pt-20 md:pb-24">
      <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
        <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10 order-last">
          {/* <Image
            src={img2}
            className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "
            width="300px"
            height="300px"
            alt="image"
          /> */}
        </div>

        <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
          <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-yellow-300 lg:text-3xl md:text-2xl text-yellow-400">
            Develop a recurring income stream Stop rolling the dice of ad
            revenue and per-stream payouts.
          </h2>
          <p className="pt-4 pb-8 m-0 leading-7 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg text-yellow-100">
            Get recurring income through monthly payments from your patrons.
          </p>
          <ul className="p-0 m-0 leading-6 border-0 border-gray-300 space-y-2">
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              Using Twitter and Discord to authorize
              <br />
              projects so that users can&apos;t spam their W3Commerce
            </li>
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              Filtering users with multiple accounts automatically
              <br />
              by keeping track of their transaction activities
            </li>
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              Adding support for multiple wallets to the login process
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section className="w-full  pt-7 pb-7 md:pt-20 md:pb-24">
      <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
        <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
          {/* <Image
            src={img3}
            className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "
            width="300px"
            height="300px"
            alt="image"
          /> */}
        </div>

        <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
          <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl text-yellow-400">
            Take back creative control
          </h2>
          <p className="pt-4 pb-8 m-0 leading-7 text-yellow-100 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
            Create what you want and what your audience loves.
          </p>
          <ul className="p-0 m-0 leading-6 border-0 border-gray-300 space-y-2">
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              No ads, no trolls, no algorithms. Enjoy direct access and deeper
            </li>
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              You dont have to conform to popular taste or the constraints of{" "}
              <br />
              ad-based monetisation models.
            </li>
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-yellow-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              Adding support for multiple wallets to the login process
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

export default App;
