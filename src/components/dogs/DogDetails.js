import React from "react";
import { getOneDogService } from "../../service/dog.service";
import { addToFavoritesService } from "../../service/user.service";
import { deleteDogService } from "../../service/user.service";
import { updateDogService } from "../../service/user.service";
import { getUserService } from "../../service/user.service.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.utils";
import MessageForm from "../form/MessageForm";
import DogForm from "../form/DogForm";

function DogDetails() {
  const { user } = useAuth();
  console.log("USER-->", user);
  const params = useParams();
  const { dogId } = params;
  const [dog, setDog] = React.useState([]);
  const [dogUser, setUser] = React.useState(false);
  const [editForm, setEditForm] = React.useState(false);

  const getUser = async (userId) => {
    const { data: userInfo } = await getUserService(userId);
    console.log("USERINFO -->", userInfo);
    setUser(userInfo);
  };

  const isOwnedDog = dogUser.ownedDogs;
  console.log("isOwnedDog", isOwnedDog);
  // isOwnedDog.filter((dog) => (dog._id = dogId));

  const getOneDog = async (dogId) => {
    const { data: dog } = await getOneDogService(dogId);
    setDog(dog);
  };

  const handleClick = async () => {
    await addToFavoritesService(dogId);
  };

  const handleEditFormDisplay = async () => {
    setEditForm(!editForm);
  };

  // const handleDelete = async (dogId) => {
  //   await deleteDogService(dogId);
  // };

  // const handleUpdate= async (dogId) => {
  //   await updateDogService(dogId);
  // };

  React.useEffect(() => {
    getUser(user.id);
    getOneDog(dogId);
  }, [dogId, user.id]);

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
      {/* <div>
        {isOwnedDog && (
          <form onSubmit={handleUpdate}>
            <button type="submit">Delete Dog</button>
          </form>
        )}
      </div> */}
      {/* <div>
        {isOwnedDog && (
          <form onSubmit={}>
          if(editForm){
          return <Dogform onSubmit={handleDelete}>    
          </Dogform>
          } 
          </form>
            
        )}
      </div> */}
    </div>
  );
}

export default DogDetails;
