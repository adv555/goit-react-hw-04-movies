export function ShearchMessage() {
  return <h1 style={{ color: '#3f51b5' }}>Enter Your Request</h1>;
}
function NothingFoundMessage() {
  return (
    <h2 style={{ color: 'tomato' }}>
      No movie has been found. Please enter a more specific query!
    </h2>
  );
}

export default NothingFoundMessage;
