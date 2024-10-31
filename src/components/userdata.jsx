function UserTag(props) {
  //deconstructing props
  const { img, name } = props;
  return (
    <>
      <img style={{ width: "50px" }} src={img} />
      <h1>{name}</h1>
    </>
  );
}

export default UserTag;
