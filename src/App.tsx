// App.tsx
import React, { useEffect, useState } from "react";
import {
  Spinner,
  Container,
  Row,
  InputGroup,
  FormControl,
  Alert,
  Pagination,
  Button,
} from "react-bootstrap";
import Character from "./Character";
import { useTranslation } from "react-i18next";
import "./App.css";

interface CharacterData {
  id: number;
  name: string;
  species: string;
  gender: string;
  status: string;
  image: string;
  location: { name: string };
  episode: { name: string }[];
}

interface ApiResponse {
  info: {
    next: string | null;
    prev: string | null;
    pages: number;
  };
  results: CharacterData[];
}

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async (url: string, pageChange = 0) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: ApiResponse = await response.json();
      setCharacters(data.results);
      setNextPage(data.info.next);
      setPrevPage(data.info.prev);
      setCurrentPage((prev) => prev + pageChange);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters("https://rickandmortyapi.com/api/character");
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="text-center">{t("title")}</h1>
        <div>
          <Button variant="outline-light" onClick={() => changeLanguage("en")}>
            EN
          </Button>
          <Button
            variant="outline-light"
            onClick={() => changeLanguage("es")}
            className="ms-2"
          >
            ES
          </Button>
        </div>
      </div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={t("search_placeholder")}
          aria-label="Search characters"
          value={searchQuery}
          onChange={handleSearch}
          aria-describedby="search-icon"
          className="bg-dark text-white"
        />
        <InputGroup.Text id="search-icon" className="bg-dark text-white">
          <i className="bi bi-search"></i>
        </InputGroup.Text>
      </InputGroup>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error} <br />
          <Button
            onClick={() =>
              fetchCharacters("https://rickandmortyapi.com/api/character")
            }
          >
            {t("try_again")}
          </Button>
        </Alert>
      ) : (
        <Row>
          {filteredCharacters.map((character) => (
            <Character key={character.id} character={character} />
          ))}
        </Row>
      )}
      <Pagination className="justify-content-center my-4">
        <Pagination.First
          onClick={() =>
            fetchCharacters(
              "https://rickandmortyapi.com/api/character",
              -(currentPage - 1)
            )
          }
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => prevPage && fetchCharacters(prevPage, -1)}
          disabled={!prevPage}
        />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next
          onClick={() => nextPage && fetchCharacters(nextPage, 1)}
          disabled={!nextPage}
        />
        <Pagination.Last
          onClick={() =>
            fetchCharacters(
              "https://rickandmortyapi.com/api/character?page=" +
                (currentPage + 1),
              1
            )
          }
          disabled={!nextPage}
        />
      </Pagination>
    </Container>
  );
};

export default App;
