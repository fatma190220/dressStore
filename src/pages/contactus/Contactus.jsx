import React, { useState, useEffect } from "react";
import AccordionComp from "./components/Accordion";
import { useBranches } from "../../hooks/useBranches";
import { useTranslation } from "react-i18next";

export default function Contactus() {
  const { t } = useTranslation("contactus");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: branches = [], isLoading, isError } = useBranches();

  useEffect(() => {
    if (branches.length && !selectedBranch) {
      setSelectedBranch(branches[0]);
    }
  }, [branches, selectedBranch]);

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p className="text-center my-5">{t("loadingBranches")}</p>;
  if (isError) return <p className="text-center my-5">{t("errorBranches")}</p>;

  return (
    <div>
      <div className="container mt-5 mb-4">
        <div className="row justify-content-between align-items-start">
          {/* Left Side */}
          <div className="col-12 col-lg-5 mb-4 mb-lg-0">
            <h3>
              {t("allBranches")} <span>({branches.length})</span>
            </h3>

            <div className="input-icon-wrapper flex-wrap shadow mb-4 mt-5 w-100">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="main-bg px-4 py-2 rounded border-0">
                {t("searchButton")}
              </button>
            </div>

            <div>
              {filteredBranches.map((branch, index) => (
                <AccordionComp
                  key={index}
                  branch={branch}
                  onSelect={setSelectedBranch}
                />
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="col-12 col-lg-7 position-relative">
            <iframe
              title="map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                selectedBranch?.address || ""
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="w-100"
              style={{ height: "577px", objectFit: "cover", borderRadius: "0.5rem" }}
              frameBorder="0"
              allowFullScreen
            ></iframe>

            <div
              className="p-3 rounded shadow-sm bg-white position-absolute start-50 translate-middle-x"
              style={{ bottom: "10px", width: "94%" }}
            >
              <h5 className="mb-2 text-primary">{selectedBranch?.name}</h5>
              <hr />
              <div className="d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center gap-1 mb-2">
                  <img
                    src="assets/location.png"
                    alt="branch"
                    style={{ height: "20px", marginLeft: "10px" }}
                  />
                  <h5 className="mb-2">{selectedBranch?.address}</h5>
                </div>
                <span>
                  <img
                    src="assets/phone.png"
                    alt="branch"
                    style={{ height: "20px", marginLeft: "10px" }}
                  />
                  {selectedBranch?.phone}
                </span>
                <span>
                  <img
                    src="assets/whatsapp.png"
                    alt="branch"
                    style={{ height: "20px", marginLeft: "10px" }}
                  />
                  {selectedBranch?.whatsapp}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
