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
import { Link } from "react-router-dom";
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
  const [isOwnDog, setIsOwnDog] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  // const [isLoading, setLoading] = React.useState(false);

  const getOneDog = async (dogId) => {
    try {
      setIsOwnDog(false);
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
      if (userInfo._id === user.id) {
        setIsOwnDog(true);
      }
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
          {/* <Link to={`/profile/${dog.owner._id}`}>
            <p className="dog-title">User: {dog.owner.username}</p>
          </Link> */}

          <img
            src={dog.dogImage}
            alt={dog.name}
            className="dog-detail-img"
          ></img>
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

        <div className="dog-detail-text">
          <div className="dog-detail-wrapper">
            <h3>
              Age: <span className="dog-info">{dog.age} years old</span>
            </h3>
            <h3>
              Breed: <span className="dog-info">{dog.breed}</span>
            </h3>
            <h3>
              Gender: <span className="dog-info">{dog.gender}</span>
            </h3>
          </div>
          <div className="dog-description">
            <h3>Description:</h3>
            <p className="dog-info">{dog.description}</p>
          </div>
        </div>
      </div>

      {
        <div className="edit-btn-wrapper">
          {isOwnDog && (
            <div>
              <button onClick={handleDelete} className="edit-btn">
                Delete Dog
              </button>

              <button onClick={handleEditFormDisplay} className="edit-btn">
                Edit Dog
              </button>
            </div>
          )}
        </div>
      }

      <div className="edit-btn-wrapper">
        {editForm && (
          <DogForm onSubmit={handleUpdate}>
            <h4>Edit your dog:</h4>
          </DogForm>
        )}
      </div>
      <div className="request-container">
        <h4>Send a request</h4>
        <MessageForm onSubmit={handleSendMessage}></MessageForm>
      </div>
    </div>
  );
}

export default DogDetails;
