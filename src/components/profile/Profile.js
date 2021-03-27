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

  const getUser = async (userId) => {
    const { data: userInfo } = await getUserService(userId);
    console.log("user", userInfo);
    setUser(userInfo);
  };

  React.useEffect(() => {
    getUser(userId);
  }, [userId]);

  const handleSubmit = async (dogForm) => {
    const { data: newDog } = await createDogService(dogForm);
    console.log("NEWDOG-->", newDog);
    // podría llamar a getUser, pero para evitar una llamada adicional a la BD:
    const updatedUser = { ...user, ownedDogs: [...user.ownedDogs, newDog] };
    setUser(updatedUser);
  };

  const profileIcon =
    "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
  return (
    <div key={user._id} className="profile-container">
      <div className="user-info-container">
        {user && <img src={profileIcon} alt={user.email} className="img"></img>}

        <h4>
          Email: <span className="user-info">{user.email}</span>
        </h4>
      </div>
      <div className="dogs-container">
        <h2>User's Dogs:</h2>
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
      <div className="dogs-container">
        <h2>User's Favorite Dogs:</h2>

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
      <div>
        <h2>Messages Sent:</h2>

        {user.requests &&
          user.requests.map((request) => {
            return (
              <div key={request._id}>
                <h4>Author: {request.author}</h4>
                <h4>Message for {request.dog}:</h4>
                <p>{request.message}</p>
              </div>
            );
          })}
      </div>
      <div>
        <h2>Create your own Dog:</h2>
        <DogForm onSubmit={handleSubmit}></DogForm>
      </div>
    </div>
  );
}

export default UserProfile;
