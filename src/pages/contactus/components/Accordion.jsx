import { Accordion } from "react-bootstrap";

export default function AccordionComp({ branch, onSelect }) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(branch); // ✅ بعتنا الفرع كله
    }
  };

  return (
    <div>
      <Accordion className="custom-accordion mb-4">
        <Accordion.Item eventKey="0" onClick={handleClick}>
          <Accordion.Header>
            <img src="assets/location.png" alt="branch" style={{ height: '20px', marginLeft: '10px' }}/>
            {branch.name}
          </Accordion.Header>
          <Accordion.Body>
            <hr className="my-2" />
            <div className='d-flex justify-content-between align-items-center'>
              <span>
                <img src="assets/phone.png" alt="branch" style={{ height: '20px', marginLeft: '10px' }}/>
                {branch.phone}
              </span>
              <span>
                <img src="assets/whatsapp.png" alt="branch" style={{ height: '20px', marginLeft: '10px' }}/>
                {branch.whatsapp}
              </span>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
