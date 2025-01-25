import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [profile, setProfile] = useState(user.profile);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [bio, setBio] = useState(user.bio);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/update",
        {
          firstName,
          lastName,
          gender,
          bio,
          profile,
          age,
        },
        {
          withCredentials: true, // Include credentials (cookies, auth headers, etc.)
          headers: {
            "Content-Type": "application/json", // Ensure JSON data format
          },
        }
      );
      dispatch(addUser(res.data));
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">First Name</span>
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="Type your email"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs mt-5">
            <div className="label">
              <span className="label-text font-bold">Last Name</span>
            </div>
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs mt-5">
            <div className="label">
              <span className="label-text font-bold">Photo Url</span>
            </div>
            <input
              value={profile}
              onChange={(e) => {
                setProfile(e.target.value);
              }}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs mt-5">
            <div className="label">
              <span className="label-text font-bold">Age</span>
            </div>
            <input
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs mt-5">
            <div className="label">
              <span className="label-text font-bold">Gender</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              value={gender}
              onChange={handleChange}
            >
              <option disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="diverse">Diverse</option>
            </select>
          </label>
          <label className="form-control w-full max-w-xs mt-5">
            <div className="label">
              <span className="label-text font-bold">Bio</span>
            </div>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
              value={bio}
              onChange={handleBioChange}
            ></textarea>
          </label>
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center mt-10">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 w-96 shadow-xl mt-10">
        <figure>
          <img
            src={
              user.profile ||
              "https://media.istockphoto.com/id/1393750072/de/vektor/flat-white-icon-mann-f%C3%BCr-webdesign-silhouette-flache-illustration-vektorillustration.jpg?s=612x612&w=0&k=20&c=zuxQgntCXxxFodGjiGi4eS8XvPGeUyQGS4rXSKLFhkY="
            }
            alt="Profile image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <span>Age: {age}</span>
          <span>{gender?.charAt(0).toUpperCase() + gender?.slice(1)}</span>

          <span>{bio}</span>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
