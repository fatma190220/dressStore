import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "../../../component/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ShippingDetails() {
  const navigate = useNavigate();
  const { t } = useTranslation("order");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    houseNumber: "",
    street: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    // خزّن البيانات في localStorage
    localStorage.setItem("shippingData", JSON.stringify(formData));

    // بعدين يروح لصفحة الدفع
    navigate("/paymethod");
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h5 className="mb-4 text-center fw-bold" style={{ color: "#646464", fontSize: "16px" }}>
        {t("shippingDetails.title")}
      </h5>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">{t("shippingDetails.recipientName")}</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("shippingDetails.enterFullName")}
            className="custom-input"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">{t("shippingDetails.phone")}</Form.Label>
          <InputGroup>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("shippingDetails.enterPhone")}
              className="custom-input text-start"
              dir="ltr"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">{t("shippingDetails.city")}</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder={t("shippingDetails.enterCity")}
            className="custom-input"
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className="fw-bold">{t("shippingDetails.houseNumber")}</Form.Label>
              <Form.Control
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                placeholder={t("shippingDetails.enterHouseNumber")}
                className="custom-input"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="fw-bold">{t("shippingDetails.street")}</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder={t("shippingDetails.enterStreet")}
                className="custom-input"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">{t("shippingDetails.address")}</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder={t("shippingDetails.enterAddress")}
            className="custom-input"
          />
        </Form.Group>

        <div className="d-flex flex-column gap-2">
          <Button title={t("shippingDetails.continuePurchase")} onClick={handleContinue}></Button>
          <button
            className="w-100 bg-white rounded border"
            style={{ borderColor: "#ccc", height: "50px" }}
            onClick={() => navigate("/cart")}
          >
            {t("shippingDetails.backToCart")}
          </button>
        </div>
      </Form>
    </div>
  );
}
