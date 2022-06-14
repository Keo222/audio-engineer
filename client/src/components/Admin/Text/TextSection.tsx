import React, { useState, useEffect } from "react";
import { useMeasure } from "react-use";
import {
  useSpring,
  useSpringRef,
  animated,
  config,
  useChain,
} from "react-spring";
import styled from "styled-components";

// Types
import type { TextTitle } from "../../../types/types";

// Icons
import upArrow from "../../../icons/upArrowWhite.svg";
import downArrow from "../../../icons/downArrowWhite.svg";

// Imported Styled Components
import { SectionTitle } from "../../../styled/typography";
import { handleColorType } from "../../../styled/styleHelperFuncs";

// Styled Components
const UpdateSection = styled.div`
  margin: 3rem 0;
`;
const SectionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 2rem;
  border-radius: 10px;
  &:hover {
    background: ${(props) => props.theme.color.textDark};
  }
`;

const Arrow = styled.img`
  height: 3rem;
  width: 3rem;
`;

const UpdateInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTextArea = styled(animated.textarea)`
  display: block;
  width: 90%;
  max-width: 800px;
  min-height: 300px;
  margin: 2rem auto 0;
  font-family: inherit;
  border: 4px solid ${({ color }) => handleColorType(color)};
  border-radius: 5px;
`;

const UpdateButton = styled(animated.button)`
  font-weight: 500;
  font-size: 1.4rem;
  width: fit-content;
  color: ${(props) => props.theme.color.textDark};
  background: ${({ color }) => handleColorType(color)};
  border: none;
  width: fit-content;
  font-family: inherit;
  margin: 3rem auto 0;
  text-decoration: none;
  padding: 1.5rem 2rem;
  border-radius: 5px;
  transition: all 0.3s;
  text-transform: capitalize;
  cursor: pointer;
  &:hover,
  &:active {
    filter: brightness(0.7);
  }
`;

type Props = {
  sectionTitle: string;
  text: string;
  section: TextTitle;
  color: string;
  setAboutText: React.Dispatch<React.SetStateAction<string>>;
  updateText: (
    e: React.MouseEvent<Element, MouseEvent>,
    textName: TextTitle
  ) => Promise<void>;
};

const TextSection = ({
  sectionTitle,
  text,
  section,
  color,
  setAboutText,
  updateText,
}: Props) => {
  // ANIMATE INFO DIV
  const [showInner, setShowInner] = useState(false);
  const defaultHeight = "0px";
  const [contentHeight, setContentHeight] = useState<number | string>(
    defaultHeight
  );
  const [heightRef, { height }] = useMeasure<HTMLDivElement>();

  const expandRef = useSpringRef();
  const showRef = useSpringRef();

  const expand = useSpring({
    config: { ...config.gentle, bounce: 1.2 },
    height: showInner ? `${contentHeight}px` : defaultHeight,
    ref: expandRef,
  });

  const show = useSpring({
    config: { duration: 300 },
    to: showInner
      ? async (next, cancel) => {
          await next({ display: "block" });
          await next({ opacity: 1 });
        }
      : async (next, cancel) => {
          await next({ opacity: 0 });
          await next({ display: "none" });
        },
    from: { opacity: 0, display: "none" },
    ref: showRef,
  });

  useChain(
    showInner ? [expandRef, showRef] : [showRef, expandRef],
    showInner ? [0, 0.35] : [0, 0.4]
  );

  // Info Div height toggle animation
  useEffect(() => {
    //Sets initial height
    setContentHeight(height);

    //Adds resize event listener
    window.addEventListener("resize", setContentHeight(height)!);

    // Clean-up
    return window.removeEventListener("resize", setContentHeight(height)!);
  }, [height]);
  return (
    <UpdateSection>
      <SectionBar onClick={() => setShowInner((showInner) => !showInner)}>
        <SectionTitle color={color}>{sectionTitle}</SectionTitle>
        <Arrow src={showInner ? upArrow : downArrow} />
      </SectionBar>
      <animated.div style={expand}>
        <UpdateInner ref={heightRef}>
          <StyledTextArea
            style={show}
            color={color}
            value={text}
            onChange={(e) => setAboutText(e.target.value)}
          />
          <UpdateButton
            style={show}
            color={color}
            onClick={(e) => updateText(e, section)}
          >
            Update {section}
          </UpdateButton>
        </UpdateInner>
      </animated.div>
    </UpdateSection>
  );
};

export default TextSection;
