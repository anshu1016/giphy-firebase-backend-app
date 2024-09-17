/* eslint-disable no-undef */
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useGIF } from "../context/GIFContext";

// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key

// configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)

// Render the React Component and pass it your fetchGifs as a prop
// ReactDOM.render(<Grid width={800} columns={3} fetchGifs={fetchGifs} />, target);

//search

const GIPHY_RENDER = () => {
  const { word, setWord } = useGIF();
  GIPHY_ENDPOINT_KEY = GlVGYHkr3WSBnllca54iNt0yFbjz7L65;
  const gf = new GiphyFetch(GIPHY_ENDPOINT_KEY);
  const fetchGifs = async (offset) => await gf.trending({ offset, limit: 10 });

  // if(word){
  //   // const { data } = await gf.search(word, {
  //   //   sort: "relevant",
  //   //   lang: "es",
  //   //   limit: 10,
  //   //   type: "stickers",
  //   // });
  // }
  console.log(fetchGifs, "TRY-1");
  return (
    <div>
      <Grid width={800} columns={3} fetchGifs={fetchGifs} />
    </div>
  );
};
export { GIPHY_RENDER };
