const Loading = () => {
  console.log(process.env.PUBLIC_URL);

  return (
    <div>
      <h2>Loading...</h2>
      <img src={`${process.env.PUBLIC_URL}/horizontal-loading.gif`}></img>
    </div>
  );
};

export default Loading;
