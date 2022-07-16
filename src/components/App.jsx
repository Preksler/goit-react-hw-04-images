import { useState, useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import getImagePixabay from "../services/pixabay";
import Container from "./Container/Container";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";

export function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const CARD_HEIGHT = 260;

  useEffect(() => {
    if (search === "") {
      return;
    }

    async function getImages() {
      setIsLoading(true);
      try {
        const searchImagesData = await getImagePixabay(search, page);
        if (searchImagesData.totalHits === 0) {
          setIsLoading(false);
          setError(new Error("No results were found for this query"));
          return;
        }
        setImages(prevState => [...prevState, ...searchImagesData.hits]);
        setIsLoading(false);
        setTotalImages(searchImagesData.totalHits);
      } catch (error) {
        setError(new Error(`Something went wrong. ${error.message}`));
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [search, page]);

  useEffect(() => {
    if (images.length > 0 && page > 1) {
      window.scrollBy({
        top: CARD_HEIGHT * 2,
        behavior: "smooth"
      });
    }
  }, [images.length, page]);
  
  const handleFormSubmit = (searchText) => {
    setSearch(searchText.trim());
    setPage(1);
    setImages([]);
    setError(null);
  }

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  }
  
  const imagesOnScreen = images.length;
  return (
    <>
      <Container>
        <Searchbar onSearch={handleFormSubmit} />
        {error && <h2 className="error">{error.message}</h2>}
        {imagesOnScreen > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {imagesOnScreen > 0 && imagesOnScreen < totalImages && <Button onLoadMore={loadMore} />}
      </Container>
    </>
  );
}
