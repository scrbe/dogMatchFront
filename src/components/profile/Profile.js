import React from "react";
import { getUserService } from "../../service/user.service";
import { useParams } from "react-router-dom";
import DogForm from "../form/DogForm";
import { createDogService } from "../../service/dog.service";
import { Link } from "react-router-dom";
import "./profile.css";

function UserProfile() {
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");

  const getUser = async (userId) => {
    try {
      const { data: userInfo } = await getUserService(userId);
      console.log("userInfo :>> ", userInfo);
      console.log("userInfo TEST :>> ", userInfo.outbox);
      setUser(userInfo);
    } catch (error) {
      // if (error.response.data.message === "this user does not exist") {
      //   setErrorMessage("this user does not exist");
      // }
      console.log("error :>> ", error);
    }
  };

  React.useEffect(() => {
    getUser(userId);
  }, [userId]);

  const handleSubmit = async (dogForm) => {
    const { data: newDog } = await createDogService(dogForm);
    // podría llamar a getUser, pero para evitar una llamada adicional a la BD:
    const updatedUser = { ...user, ownedDogs: [...user.ownedDogs, newDog] };
    setUser(updatedUser);
  };

  return (
    <div key={user._id} className="profile-container">
      <div className="user-info-container">
        {user && (
          <img
            src={user.userImage}
            alt={user.username}
            className="profile-img"
          ></img>
        )}
        <div>
          <h3>
            Username: <span className="user-info">{user.username}</span>
          </h3>
          <h3>
            Email: <span className="user-info">{user.email}</span>
          </h3>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
      <h2>User's Dogs:</h2>
      <div className="dogs-container">
        {user.ownedDogs &&
          user.ownedDogs.map((dog) => {
            return (
              <div key={dog._id} className="profile-dog-card">
                <div>
                  <Link to={`/dogs/${dog._id}`}>
                    <img
                      src={dog.dogImage}
                      alt={dog.name}
                      className="profile-dog-img"
                    ></img>
                  </Link>
                </div>
                <div className="profile-dog-details">
                  <h2 className="profile-dog-title">{dog.name}</h2>
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
                <Link className="view-button" to={`/dogs/${dog._id}`}>
                  View details
                </Link>
              </div>
            );
          })}
      </div>

      <h2>User's Favorite Dogs:</h2>

      <div className="dogs-container">
        {user.favoriteDogs &&
          user.favoriteDogs.map((dog) => {
            return (
              <div key={dog._id} className="profile-dog-card">
                <div>
                  <Link to={`/dogs/${dog._id}`}>
                    <img
                      src={dog.dogImage}
                      alt={dog.name}
                      className="profile-dog-img"
                    ></img>
                  </Link>
                </div>
                <div className="profile-dog-details">
                  <h2 className="profile-dog-title">{dog.name}</h2>
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
                <Link className="view-button" to={`/dogs/${dog._id}`}>
                  View details
                </Link>
              </div>
            );
          })}
      </div>
      <div className="messages-container">
        <h2>Messages Sent:</h2>
        {user.inbox &&
          user.inbox.map((message) => {
            console.log("message", message);
            return (
              <div key={message._id}>
                <h4>
                  Author:
                  <span className="dog-info">{message.author.username}</span>
                </h4>
                <h4>
                  Message for dog:{" "}
                  <span className="dog-info">{message.dog}</span>
                </h4>
                <p>{message.message}</p>
              </div>
            );
          })}
      </div>
      <div className="create-dog-container">
        <h2>Create your own Dog:</h2>
        <DogForm onSubmit={handleSubmit}></DogForm>
      </div>
    </div>
  );
}

export default UserProfile;
