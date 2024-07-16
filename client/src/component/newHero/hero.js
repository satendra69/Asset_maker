import Container from "../Container";
import SingleCrousel from "../Crousel";
import SearchBar from "../searchBar/searchBar";
import "./homePage.scss";

function HomePage() {
  const heroData = [
    {
      key: 1,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "9000000",
      imgUrl: "/h1.jpg",
    },
    {
      key: 2,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "1000000",
      imgUrl: "/h2.jpg",
    },
    {
      key: 3,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "6000000",
      imgUrl: "/h3.jpg",
    },
  ];
  return (
    <div className="homePage padingm ">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">
            {/* Find Real Estate & Get Your Dream Place */}
            <span>Find</span>
            <span>Real</span>
            <span>Estate</span>

            <span>&</span>
            <span>Get</span>
            <br />
            <span>Your</span>
            <span>Dream</span>
            <span>Place</span>
          </h1>
          <p>
            Step into a world of refined opulence as you enter the grand foyer
            adorned with exquisite marble flooring and cascading crystal
            chandeliers. The expansive living spaces boast panoramic views of
            verdant landscapes, inviting you to unwind in unparalleled comfort
            and style.
          </p>
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>
      </div>

      <div>
        {/* image slider */}
        <SingleCrousel data={heroData} />
        {/* Seachbar */}
        <div className="md:hidden  mb-32 mt-3">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
