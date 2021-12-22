import { useSelector, useDispatch } from "react-redux";

function useFavourites() {
  const dispatch = useDispatch();
  const faves = useSelector((state) => state.faves);

  function toggleFavById(id) {
    console.log(`handle fav clicked ${id}`);

    let tempFaves = [...faves];
    if (tempFaves.includes(id)) {
      const index = tempFaves.indexOf(id);
      tempFaves.splice(index, 1);
    } else {
      tempFaves.push(id);
    }
    localStorage.setItem("faves", JSON.stringify(tempFaves));
    console.log(tempFaves);
    dispatch({ type: "set-faves", payload: tempFaves });
  }

  return { toggleFavById };
}

export { useFavourites };
