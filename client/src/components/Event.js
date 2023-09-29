function Event({ event }) {
  const { id, title, description, created_at, updated_at } = event;
  return (
    <div>
      {title}
      {description}
    </div>
  );
}
export default Event;
