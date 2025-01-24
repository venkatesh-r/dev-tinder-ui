const UserCard = ({ user }) => {
  const { firstName, lastName, skills, bio, age, gender, profile } = user;
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
          <p>{bio}</p>
          <div className="card-actions justify-center mt-16">
            <button className="btn btn-secondary mr-5">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
