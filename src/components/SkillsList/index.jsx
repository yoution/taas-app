/**
 * SkillsList
 *
 * Shows list of skills with "N more" link which is showing tooltip with a full list of skills.
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import _ from "lodash";
import "./styles.module.scss";
import IconCheck from "../../assets/images/icon-check.svg";
import IconCross from "../../assets/images/icon-cross.svg";
import { usePopper } from "react-popper";
import OutsideClickHandler from "react-outside-click-handler";

const SkillsList = ({ skills, limit = 3 }) => {
  const skillsToShow = skills.slice(0, limit);
  const skillsToHide = skills.slice(limit);

  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [
      {
        name: "flip",
        options: {
          fallbackPlacements: ["top"],
        },
      },
      {
        name: "offset",
        options: {
          // use offset to move the dropdown slightly down
          offset: [0, 5],
        },
      },
      {
        name: "preventOverflow",
        options: {
          // padding from browser edges
          padding: 16,
        },
      },
      {
        name: "computeStyles",
        options: {
          // to fix bug in IE 11 https://github.com/popperjs/popper-core/issues/636
          gpuAcceleration: false,
        },
      },
    ],
  });

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <div styleName="skills-list">
      {_.map(skillsToShow, "name").join(", ")}
      {skillsToHide.length > 0 && (
        <>
          {" and "}
          <OutsideClickHandler onOutsideClick={close} display="inline">
            <span
              styleName="more"
              onClick={toggle}
              onMouseEnter={open}
              onMouseLeave={close}
              role="button"
              tabIndex={0}
              ref={setReferenceElement}
            >
              {skillsToHide.length > 0} more
            </span>

            {isOpen && (
              <div
                styleName="popover"
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
              >
                <div styleName="popover-content">
                  {skills && (
                    <div styleName="skills-section">
                      <div styleName="skills-title">Skills</div>
                      <ul styleName="skills-list">
                        {skills.map((skill) => (
                          <li key={skill.id}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </OutsideClickHandler>
        </>
      )}
    </div>
  );
};

export const skillShape = PT.shape({
  id: PT.string,
  name: PT.string,
});

SkillsList.propTypes = {
  skills: PT.arrayOf(skillShape),
  limit: PT.number,
};

export default SkillsList;
