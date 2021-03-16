import React from "react";
import { getOneDogService } from "../../service/dog.service";
import { addToFavoritesService } from "../../service/user.service";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.utils";
import MessageForm from "../form/MessageForm";

function DogDetails() {
  const { user } = useAuth();
  console.log("USER-->", user);
  const params = useParams();
  const { dogId } = params;
  const [dog, setDog] = React.useState([]);

  const getOneDog = async (dogId) => {
    const { data: dog } = await getOneDogService(dogId);
    setDog(dog);
  };

  const handleClick = async () => {
    await addToFavoritesService(dogId);
  };

  // const isDogFavorite = user.favoriteDogs.includes(dogId)
  React.useEffect(() => {
    getOneDog(dogId);
  }, [dogId]);

  return (
    <div>
      <div key={dog._id}>
        <img src={dog.dogImage} alt={dog.name} className="img"></img>
        <h2>Name: {dog.name}</h2>
        <h3>Age: {dog.age} years old</h3>
        <h3>Breed: {dog.breed}</h3>
        <h3>Description:</h3>
        <p>{dog.description}</p>
      </div>

      {user.favoriteDogs || (
        <button onClick={handleClick}>Add to Favorites</button>
      )}
      {user.favoriteDogs && (
        <button onClick={handleClick}>Remove from Favorites</button>
      )}
      <div>
        <h4>Send a request</h4>
        <MessageForm></MessageForm>
      </div>
    </div>
  );
}

export default DogDetails;
