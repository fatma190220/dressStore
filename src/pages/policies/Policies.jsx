import React from "react";
import { useTerms } from "../../hooks/useTerms";

export default function Policies() {
  const { data, isLoading, isError } = useTerms();

  
  return (
    <div style={{ width: "50%", margin: "auto", paddingTop: "100px", paddingBottom: "100px" }} className="shadow p-4 my-5 rounded bg-white">
      <h3 className="text-center mb-4">{data?.title}</h3>
      <p className="text-center mb-4" dangerouslySetInnerHTML={{ __html: data?.content }} />
    </div>
  );
}
