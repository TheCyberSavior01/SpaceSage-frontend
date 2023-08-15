import { Carousel, IconButton, Typography } from "@material-tailwind/react";
import sliderData from "../data/sliderData.json";

export default function Slider() {
  const data = sliderData.property;


  return (
    <Carousel
      className="rounded-xl h-[280px] lg:h-[300px]"
      autoplay="true"
    >

      {data.map((item) => (
          <img
            src={item.image}
            key={item.id}
            className="h-full w-full object-cover"
          /> 
      ))}

    </Carousel>
  );
}
