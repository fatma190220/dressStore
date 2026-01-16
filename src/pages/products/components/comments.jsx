import React from "react";
import { useRatings } from "../../../hooks/useRatings";

export default function Comments({ productId }) {
  const { data: ratings, isLoading, isError } = useRatings(productId);

  if (isLoading) return <p>Loading comments...</p>;
  if (isError) return <p>Error loading comments</p>;
  if (!ratings || ratings.length === 0) return <p>No comments yet</p>;

  return (
    <div>
      {ratings.map((rating) => {
        const userName = rating.user?.name || "User";
        const firstLetter = userName.charAt(0).toUpperCase();

        return (
          <div key={rating.id} className="mb-5">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                {rating.user?.avatar ? (
                  <img
                    src={rating.user.avatar}
                    alt={userName}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : ( 
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      color: "#555",
                      fontSize: "20px",
                      textTransform: "uppercase",
                    }}
                  >
                    {firstLetter}
                  </div>
                )}

                <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                  {userName}
                </span>
              </div>

              <div className="my-3">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`bi me-1 ${
                      index < rating.rating
                        ? "bi-star-fill text-warning"
                        : "bi-star text-secondary"
                    }`}
                  ></i>
                ))}
              </div>
            </div>

            <p className="mt-2">{rating.review}</p>
          </div>
        );
      })}
    </div>
  );
}
