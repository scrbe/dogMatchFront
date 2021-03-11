import React from "react";
import { getOneDogService } from "../../service/dog.service";
import { useParams } from "react-router-dom";

function DogDetails() {
  const params = useParams();
  const { dogId } = params;
  const [dog, setDog] = React.useState([]);

  const getOneDog = async (dogId) => {
    const { data: dog } = await getOneDogService(dogId);
    setDog(dog);
  };

  React.useEffect(() => {
    getOneDog(dogId);
  }, [dogId]);

  return (
    <div key={dog._id}>
      <img src={dog.dogImage} alt={dog.name} className="img"></img>
      <h2>Name: {dog.name}</h2>
      <h3>Age: {dog.age} years old</h3>
      <h3>Breed: {dog.breed}</h3>
      <h3>Description:</h3>
      <p>{dog.description}</p>
    </div>
  );
}

export default DogDetails;
