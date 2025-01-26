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
    <div className="text-center">
      <h1 className="text-bold text-2xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, bio, gender, profile } =
          connection;
        return (
          <div key={_id} className="flex">
            <img
              className="w-20 h-20 rounded-full"
              alt="photo"
              src={profile}
            ></img>
            <h2 className="text-2xl font-bold">{firstName + " " + lastName}</h2>
            <p>{bio}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
