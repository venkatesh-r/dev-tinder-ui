import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.data);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No connections Found</h1>;

  return (
    <div className=" p-10">
      <h1 className="text-bold text-2xl text-center my-4">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, bio, gender, profile } =
          connection;
        return (
          <div key={_id} className="card card-side bg-base-100 shadow-xl my-5">
            <figure className="w-40 h-40">
              <img src={profile} alt="Profile Photo" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p>
                {age}, {gender}
              </p>
              <p>{bio}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
