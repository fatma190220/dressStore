import React from "react";
import { usePrivacy } from "../../hooks/usePrivacy";

export default function Privacy() {
  const { data, isLoading, isError } = usePrivacy();

  if (isLoading) return <p className="text-center mt-5">جاري التحميل...</p>;
  if (isError) return <p className="text-center mt-5 text-danger">حدث خطأ أثناء التحميل</p>;

  return (
    <div style={{ width: "50%", margin: "auto", paddingTop: "100px", paddingBottom: "100px" }} className="shadow p-4 my-5 rounded bg-white">
      <h3 className="text-center mb-4">{data?.title}</h3>
      <p className="text-center mb-4" dangerouslySetInnerHTML={{ __html: data?.content }} />
    </div>
  );
}
