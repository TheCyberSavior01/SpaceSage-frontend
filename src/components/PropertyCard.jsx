import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function PropertyCard(props) {
  const { id, coverPhoto, baths, price, rooms, title } =
    props.propertyData;
  return (
    <Card className="w-full lg:w-64">
      <CardHeader shadow={false} floated={false} className="h-36">
        <img
          src={coverPhoto.url}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2">
          <Typography color="blue-gray" className="font-semibold text-base">
            {title}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ${price}
          </Typography>
        </div>
        <div className="flex gap-5">
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            rooms: {rooms}
          </Typography>

          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            baths: {baths}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-black text-white"
          >
            View Details
          </Button>

      </CardFooter>
    </Card>
  );
}
