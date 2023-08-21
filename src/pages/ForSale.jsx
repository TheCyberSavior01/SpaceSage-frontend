import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import PropertyCard from "../components/PropertyCard";

export default function ForSale() {
  const cardPerRow = 8;
  const [next, setNext] = useState(cardPerRow);
  const [forSaleData, setForSaleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleMoreImage = () => {
    setNext(next + 4);
  };

  const forSaleUrl =
    "https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=20&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=16";
  const forSaleOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "06c8ce184dmshdd54f507eb437f5p1872cdjsn311c8fc13150",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetch(forSaleUrl, forSaleOptions)
      .then((res) => res.json())
      .then((data) => {
        setForSaleData(data.hits);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="lg:px-32 sm:px-12 md:px-24">
      <h1 className="text-2xl font-bold my-10 text-center">Properties For Sale</h1>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-col-1 sm:grid-cols-2 gap-5">
        {forSaleData.slice(0, next).map((item) => (
          <PropertyCard key={item.id} propertyData={item} />
        ))}

        {next < forSaleData?.length && (
          <div>
            <button className="my-4 bg-btnColor text-white font-bold py-2 px-4 rounded hover:bg-hoverBtnColor transition duration-300 ease-in-out" onClick={handleMoreImage}>
            Load more
          </button>
          </div>
        )}
      </div>
    </div>
  );
}
