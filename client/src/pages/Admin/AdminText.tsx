import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Types
import type { Text, TextTitle } from "types/types";

// Imported Components
import UpdateNotification from "components/Admin/UpdateNotification";
import { TextSection } from "components/Admin/TextSection";

// Imported Styled Components
import { PageHeading } from "styled/typography";

const TextUpdateContainer = styled.div`
  width: clamp(275px, 60%, 900px);
  margin: 0 auto 5rem;
`;

const AdminText = () => {
  const [aboutText, setAboutText] = useState("About Text");
  const [contactText, setContactText] = useState("Contact Text");
  const [pricingText, setPricingText] = useState("Pricing Text");
  const [hireText, setHireText] = useState("Hire Text");
  const [updated, setUpdated] = useState(false);

  const whichText = (textName: TextTitle) => {
    switch (textName) {
      case "about":
        return aboutText;
      case "contact":
        return contactText;
      case "pricing":
        return pricingText;
      case "hire":
        return hireText;
      default:
        return null;
    }
  };

  const updateText = async (
    e: React.MouseEvent<Element, MouseEvent>,
    textName: TextTitle
  ) => {
    e.preventDefault();
    const sectionText = whichText(textName);

    if (sectionText !== null) {
      const pArray = sectionText.split(/\n/g).filter((t) => t !== "");
      const data = { name: textName, text: pArray };
      if (data.text.length !== 0) {
        try {
          await fetch("/api/text", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
          });
          setUpdated(true);
          setTimeout(() => {
            setUpdated(false);
          }, 3000);
        } catch (err) {
          console.error("Error updating text", err);
        }
      } else {
        console.error("Text not found");
      }
    }
  };

  const setTexts = async () => {
    const res = await fetch("/api/text?name=all");
    const allTexts = await res.json();
    const about = allTexts
      .find((t: Text) => t.name === "about")
      .stored_text.join("\n\n");
    const contact = allTexts
      .find((t: Text) => t.name === "contact")
      .stored_text.join("\n\n");
    const pricing = allTexts
      .find((t: Text) => t.name === "pricing")
      .stored_text.join("\n\n");
    const hire = allTexts
      .find((t: Text) => t.name === "hire")
      .stored_text.join("\n\n");

    setAboutText(about);
    setContactText(contact);
    setPricingText(pricing);
    setHireText(hire);
  };
  useEffect(() => {
    setTexts();
  }, []);
  return (
    <>
      <title>JG Admin | Site Text</title>
      <PageHeading>Site Text</PageHeading>
      <TextUpdateContainer>
        {/* ABOUT TEXT */}
        <TextSection
          sectionTitle={"About Text"}
          text={aboutText}
          setAboutText={setAboutText}
          updateText={updateText}
          section={"about"}
          color={"1"}
        />
        {/* CONTACT TEXT */}
        <TextSection
          sectionTitle={"Contact Text"}
          text={contactText}
          setAboutText={setContactText}
          updateText={updateText}
          section={"contact"}
          color={"2"}
        />
        {/* PRICING TEXT */}
        <TextSection
          sectionTitle={"Pricing Text"}
          text={pricingText}
          setAboutText={setPricingText}
          updateText={updateText}
          section={"pricing"}
          color={"3"}
        />
        {/* Hire Text */}
        <TextSection
          sectionTitle={"Hire Text"}
          text={hireText}
          setAboutText={setHireText}
          updateText={updateText}
          section={"hire"}
          color={"1"}
        />
      </TextUpdateContainer>
      {updated && <UpdateNotification />}
    </>
  );
};

export default AdminText;
