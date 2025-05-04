import { useState, useEffect } from "react";
import Container from "./components/Container/Container";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import { fetchImages } from "./components/services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { UnsplashImage } from "./types";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(true);
  const [modalData, setModalData] = useState<UnsplashImage | null>(null);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page, { signal });
        if (data.results.length === 0) {
          if (page === 1) toast("No images found.");
          setHasMoreImages(false);
        } else {
          setImages((prev) => [...prev, ...data.results]);
          if (data.results.length < 12) {
            toast("End of collection.");
            setHasMoreImages(false);
          }
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
    return () => controller.abort();
  }, [query, page]);

  const handleSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      toast.error("Please enter a valid search term.");
      return;
    }
    setQuery(trimmed);
    setPage(1);
    setImages([]);
    setHasMoreImages(true);
  };

  return (
    <Container>
      <SearchBar handleSearch={handleSearch} />
      <ImageGallery images={images} openModal={setModalData} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && hasMoreImages && (
        <LoadMoreBtn onLoadMore={() => setPage((p) => p + 1)} />
      )}
      {modalData && (
        <ImageModal data={modalData} onClose={() => setModalData(null)} />
      )}
      <Toaster position="top-right" />
    </Container>
  );
};

export default App;
