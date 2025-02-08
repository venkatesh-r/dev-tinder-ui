import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/reviews/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
      console.log(res.data.data);
      console.log(requests);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No requests found</h1>;

  return (
    <div className="text-center">
      <h1 className="text-bold text-4xl my-10">Connections</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, bio, profile } = request.fromUserId;
        return (
          <div key={_id} className="flex p-4 m-4 w-1/2 mx-auto">
            <div className="mr-10">
              <img
                className="w-20 h-20 rounded-full"
                alt="photo"
                src={profile}
              ></img>
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {firstName + " " + lastName}
              </h2>
              <p>{bio}</p>
            </div>
            <div className="ml-10">
              <button
                className="btn btn-primary mb-3"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Ignore
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Request;
