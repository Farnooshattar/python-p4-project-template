import logo from "../media/events.jpg";
function EventsImage() {
  const imgStyle = {
    width: "100px", // Set the desired width
    height: "auto", // Maintain aspect ratio
  };
  return <img src={logo} alt="events" className="img-fluid" style={imgStyle} />;
}
export default EventsImage;
