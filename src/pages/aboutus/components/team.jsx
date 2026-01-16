import React from "react";
import Personcard from "./Personcard";
import { useTeam } from "../../../hooks/useTeam";
import { useTranslation } from "react-i18next";

export default function Team() {
  const { t } = useTranslation("team");
  const { data: team = [], isLoading, isError } = useTeam();

  if (isLoading) return <p>{t("loading")}</p>;
  if (isError) return <p>{t("error")}</p>;

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center"
      style={{ marginBottom: "100px", width: "100%" }}
    >
      <h3 className="mb-3">{t("title")}</h3>
      <p className="fw-light text-center mb-4" style={{ maxWidth: "700px" }}>
        {t("description")}
      </p>

      {team.length === 0 ? (
        <p>{t("noData")}</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {team.map((member) => (
            <Personcard
              key={member.id}
              image={`https://maxim-test.courseszone-eg.com/storage/${member.image}`}
              name={member.name}
              title={member.role}
            />
          ))}
        </div>
      )}
    </div>
  );
}
