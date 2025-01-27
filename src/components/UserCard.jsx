import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, bio, age, gender, profile } = user;

  const handleRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/sendRequest/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center mt-20">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src={
              profile ||
              "https://media.istockphoto.com/id/1393750072/de/vektor/flat-white-icon-mann-f%C3%BCr-webdesign-silhouette-flache-illustration-vektorillustration.jpg?s=612x612&w=0&k=20&c=zuxQgntCXxxFodGjiGi4eS8XvPGeUyQGS4rXSKLFhkY="
            }
            alt="Profile image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{gender}</p>
          <p>{bio}</p>
          <p>{age}</p>
          <div className="card-actions justify-center mt-16">
            <button
              className="btn btn-secondary mr-5"
              onClick={() => handleRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
