import React from "react";
import { getUserService } from "../../service/user.service";
import { useParams } from "react-router-dom";
import DogForm from "../form/DogForm";
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

  return (
    <div key={user._id}>
      <div>
        <img src={user.userImage} alt={user.email} className="img"></img>
        <h4>Email: {user.email}</h4>
      </div>
      <div>
        <h2>User's Dogs:</h2>
        {user.ownedDogs &&
          user.ownedDogs.map((dog) => {
            return (
              <div key={dog._id}>
                <img src={dog.dogImage} alt={dog.name} className="img"></img>
                <h4>Name: {dog.name}</h4>
                <p>Age: {dog.age} years old</p>
                <p>Breed: {dog.breed}</p>
              </div>
            );
          })}
      </div>
      <div>
        <h2>User's Favorite Dogs:</h2>
        {user.favoriteDogs &&
          user.favoriteDogs.map((dog) => {
            return (
              <div key={dog._id}>
                <img src={dog.dogImage} alt={dog.name} className="img"></img>
                <h4>Name: {dog.name}</h4>
                <h3>Age: {dog.age} years old</h3>
                <h3>Breed: {dog.breed}</h3>
              </div>
            );
          })}
      </div>
      <div>
        <h2>User's Requests:</h2>
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
      <h2>Create your own Dog:</h2>
      <DogForm></DogForm>
    </div>
  );
}

export default UserProfile;
