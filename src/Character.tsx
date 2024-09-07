// Character.tsx
import React from "react";
import { Card, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./Character.css";

interface CharacterProps {
  character: {
    id: number;
    name: string;
    species: string;
    gender: string;
    status: string;
    location: {
      name: string;
    };
    episode: {
      name: string;
    }[];
    image: string;
  };
}

const Character: React.FC<CharacterProps> = ({ character }) => {
  const { t } = useTranslation(); // Hook de traducción

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Alive":
        return (
          <span className="status-badge bg-success">
            <i className="bi bi-circle-fill"></i> {t("status_alive")}
          </span>
        );
      case "Dead":
        return (
          <span className="status-badge bg-danger">
            <i className="bi bi-x-circle-fill"></i> {t("status_dead")}
          </span>
        );
      default:
        return (
          <span className="status-badge bg-secondary">
            <i className="bi bi-question-circle-fill"></i> {t("status_unknown")}
          </span>
        );
    }
  };

  return (
    <Col md={6} lg={4} xl={3} className="mb-4">
      <Card className="character-card h-100 shadow-sm border-0 hover-effect">
        <Card.Img
          variant="top"
          src={character.image}
          alt={character.name}
          className="character-image"
        />
        <Card.Body className="text-white d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="character-name">{character.name}</Card.Title>
            <p className="character-status mb-2">
              {getStatusBadge(character.status)}{" "}
              <span className="species-info">
                {t("species_info", {
                  species: character.species,
                  gender: character.gender,
                })}
              </span>
            </p>
            <p className="character-location mb-1">
              <strong>{t("last_location")}</strong> <br />{" "}
              {character.location.name}
            </p>
            <p className="character-episode">
              <strong>{t("first_seen")}</strong> <br />{" "}
              {character.episode[0]?.name || t("status_unknown")}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Character;
