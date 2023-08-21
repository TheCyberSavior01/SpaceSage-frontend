import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Spinner from "../components/Spinner";

export default function Home() {
  const [forSaleData, setForSaleData] = useState([]);
  const [forRentData, setForRentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const forSaleUrl =
    "https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=4&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=16";
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

  const forRentUrl =
    "https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=4&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=16";
  const forRentOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "06c8ce184dmshdd54f507eb437f5p1872cdjsn311c8fc13150",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetch(forRentUrl, forRentOptions)
      .then((res) => res.json())
      .then((data) => {
        setForRentData(data.hits);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Slider />

      <div className="lg:px-32 sm:px-12 md:px-24">
        {/* For Sale Section */}

        <div className="my-10">
          <h1 className="text-2xl font-bold mb-1">Properties For Sale</h1>
          <Link to="/for-sale">
            <p className="font-semibold leading-6 hover:underline text-[#DA4167]">
              See more places for sale
            </p>
          </Link>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {forSaleData.map((item) => (
              <PropertyCard key={item.id} propertyData={item} />
            ))}
          </div>
        </div>

        {/* For Rents Section */}
        <div className="my-10">
          <h1 className="text-2xl font-bold mb-1">Properties For Rent</h1>
          <Link to="/for-rent">
            <p className="font-semibold leading-6 hover:underline text-[#DA4167]">
              See more places for rent
            </p>
          </Link>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {forRentData.map((item) => (
              <PropertyCard key={item.id} propertyData={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
