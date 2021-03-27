import React from "react";
import { getOneDogService } from "../../service/dog.service";
import { addToFavoritesService } from "../../service/user.service";
import { deleteDogService } from "../../service/dog.service";
import { updateDogService } from "../../service/dog.service";
import { getUserService } from "../../service/user.service.js";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.utils";
import MessageForm from "../form/MessageForm";
import { sendMessagesService } from "../../service/message.service";
import DogForm from "../form/DogForm";
import "./dogDetails.css";

function DogDetails() {
  const { user } = useAuth();
  const { push } = useHistory();
  const params = useParams();
  const { dogId } = params;

  const [dog, setDog] = React.useState([]);
  const [editForm, setEditForm] = React.useState(false);
  const [isFav, setIsFav] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  // const [isLoading, setLoading] = React.useState(false);

  const getOneDog = async (dogId) => {
    try {
      // setLoading(true);
      const { data: dog } = await getOneDogService(dogId);
      console.log("dog :>> ", dog);
      setDog(dog);
      let userInfo = await getUser();
      userInfo.favoriteDogs.forEach((dog) => {
        if (dog._id === dogId) {
          setIsFav(true);
        }
      });
      // setLoading(false);
    } catch (error) {
      const noDog = error.response.data.message === "this dog does not exist";
      if (noDog) {
        setErrorMessage("this dog does not exist");
      }
      console.log("error :>> ", error);
      // setLoading(false);
    }
  };

  const getUser = async () => {
    const { data: userInfo } = await getUserService(user.id);
    return userInfo;
  };

  let isDogOwner = user.id === dog.owner;

  const handleClick = async () => {
    const { data } = await addToFavoritesService(dogId);
    setIsFav(data.isFavorite);
  };

  const handleEditFormDisplay = async () => {
    setEditForm(!editForm);
  };

  const handleDelete = async () => {
    await deleteDogService(dogId);
    push("/dogs");
  };

  const handleUpdate = async (state) => {
    const { data: updatedDog } = await updateDogService(dogId, state);
    setDog(updatedDog);
  };

  const handleSendMessage = async (messageBody) => {
    const { data: newMessage } = await sendMessagesService(dogId, messageBody);
  };

  React.useEffect(() => {
    getOneDog(dogId);
  }, [dogId]);

  // HANDLE ERROR
  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  return (
    <div className="dog-detail-view">
      <div key={dog._id} className="dog-detail-card">
        {errorMessage && errorMessage}
        <div className="img-container">
          <h2 className="dog-title">{dog.name}</h2>
          <img
            src={dog.dogImage}
            alt={dog.name}
            className="dog-detail-img"
          ></img>
        </div>

        <div className="dog-detail-text">
          <h3>
            Age: <span className="dog-info">{dog.age} years old</span>
          </h3>
          <h3>
            Breed: <span className="dog-info">{dog.breed}</span>
          </h3>
          <h3>
            Gender: <span className="dog-info">{dog.gender}</span>
          </h3>
          <div className="dog-description">
            <h3>Description:</h3>
            <p className="dog-info">{dog.description}</p>
          </div>
          {isFav || (
            <button onClick={handleClick} className="fav-button">
              Add to Favorites
            </button>
          )}
          {isFav && (
            <button onClick={handleClick} className="fav-button">
              Remove from Favorites
            </button>
          )}
        </div>
      </div>
      <div>
        <h4>Send a request</h4>
        <MessageForm onSubmit={handleSendMessage}></MessageForm>
      </div>

      {
        <div>
          {isDogOwner && (
            <div>
              <button onClick={handleDelete}>Delete Dog</button>
              <button onClick={handleEditFormDisplay}>Edit Dog</button>
              {editForm && (
                <DogForm onSubmit={handleUpdate}>
                  <h4>Edit your dog:</h4>
                </DogForm>
              )}
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default DogDetails;
