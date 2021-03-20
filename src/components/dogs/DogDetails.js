import React from "react";
import { getOneDogService } from "../../service/dog.service";
import { addToFavoritesService } from "../../service/user.service";
// import { deleteDogService } from "../../service/dog.service";
// import { updateDogService } from "../../service/dog.service";
// import { getUserService } from "../../service/user.service.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.utils";
import MessageForm from "../form/MessageForm";
// import DogForm from "../form/DogForm";
import "./dogDetails.css";

function DogDetails() {
  const { user } = useAuth();
  console.log("USER-->", user);
  const params = useParams();
  const { dogId } = params;
  const [dog, setDog] = React.useState([]);
  // const [editForm, setEditForm] = React.useState(false);

  const getOneDog = async (dogId) => {
    const { data: dog } = await getOneDogService(dogId);
    console.log("DOG -->", dog);
    setDog(dog);
  };

  const handleClick = async () => {
    await addToFavoritesService(dogId);
  };

  // const handleEditFormDisplay = async () => {
  //   setEditForm(!editForm);
  // };

  // const handleDelete = async (dogId) => {
  //   await deleteDogService(dogId);
  // };

  // const handleUpdate = async (dogId) => {
  //   await updateDogService(dogId);
  //   console.log("dog deleted");
  // };

  React.useEffect(() => {
    getOneDog(dogId);
  }, [dogId, user.id]);

  return (
    <div className="dog-detail-view">
      <div key={dog._id} className="dog-detail-card">
        <img src={dog.dogImage} alt={dog.name} className="dog-img"></img>
        <h2>Name: {dog.name}</h2>
        <h3>Age: {dog.age} years old</h3>
        <h3>Breed: {dog.breed}</h3>
        <h3>Gender: {dog.gender}</h3>
        <div className="dog-description">
          <h3>Description:</h3>
          <p>{dog.description}</p>
        </div>
        {user.favoriteDogs || (
          <button onClick={handleClick} className="fav-button">
            Add to Favorites
          </button>
        )}
        {user.favoriteDogs && (
          <button onClick={handleClick} className="fav-button">
            Remove from Favorites
          </button>
        )}
      </div>

      <div>
        <h4>Send a request</h4>
        <MessageForm></MessageForm>
      </div>
      {/* <div>
        {isOwnedDog && <button onClick={handleDelete}>Delete Dog</button>}
      </div>
      <div>
        <h4>Edit your dog:</h4>
        {isOwnedDog && <DogForm onSubmit={handleUpdate}></DogForm>}
      </div> */}
    </div>
  );
}

export default DogDetails;
