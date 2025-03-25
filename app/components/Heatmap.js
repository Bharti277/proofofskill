import { useState } from "react";
import styles from "../Heatmap.module.css";
import ColorBoxes from "./ColorBoxes";

const Heatmap = ({ selectedData, selectedCandidate }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skills = [
    "Experience",
    "Join in",
    "Minimum salary expected",
    "Creating Wireframes",
    "Creating Basic Prototypes",
    "Applying Gestalt Theory",
    "Using Figma for Design",
    "Application of Typography",
    "Creating Effective Icons",
    "Optimizing Touch Points",
    "Addressing User Pain Points",
    "Conducting User Research",
    "Applying Questioning Skills",
    "Conducting Heuristic Evaluation",
    "Gathering User Feedback",
    "Conducting Usability Tests",
    "Creating User Personas",
    "Conducting Market Research",
    "Crafting Effective Questions",
    "Creating Effective Surveys",
    "Designing User Flows",
  ];

  const allSkills = [
    ...new Set(
      selectedData?.flatMap((user) =>
        user?.data?.data?.skillset?.flatMap((a) =>
          a?.skills?.map((b) => b?.name)
        )
      )
    ),
  ];

  // Handle Skill Selection
  const handleSkillChange = (e) => {
    const value = e.target.value;
    setSelectedSkills((prev) =>
      prev.includes(value)
        ? prev.filter((skill) => skill !== value)
        : [...prev, value]
    );
  };

  // Filter Skills
  const filteredSkills = selectedSkills.length
    ? allSkills.filter((skill) => selectedSkills.includes(skill))
    : allSkills;

  return (
    <div className={styles.heatmapContainer}>
      <div className={styles.heatmapHeader}>
        <div className={styles.viewOptions}>
          <button className={styles.active}>Compare View</button>
          <button>Individual</button>
          <button>Shortlist candidates</button>
          <div className={styles.arrows}>
            <button>←</button>
            <button>→</button>
          </div>
        </div>
      </div>

      {/* Multi-Select Filter */}
      <div className={styles.skillsColumnEmpty}>
        <div className={styles.filter}>
          <select value={selectedSkills} onChange={handleSkillChange}>
            <option value="">Filter</option>
            {allSkills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCandidate.length === 0 && (
        <div className={styles.emptySkill}>
          <div>
            {skills.map((skill, i) => (
              <div key={i}>{skill}</div>
            ))}
          </div>
          <button className={styles.compareButton}>
            Select candidate to compare
          </button>
        </div>
      )}
      {/* Heatmap Grid */}
      {selectedCandidate && (
        <div className={styles.heatmapGrid}>
          <div className={styles.skillsColumn}>
            <div className={styles.skillsColumnAlign}>
              {selectedData.map((user) => (
                <div key={user.id}>
                  <div>
                    {user.name.split(" ").map((name) => (
                      <span key={name}>{name.charAt(0)}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Display Filtered Skills */}
            {filteredSkills.map((skill, index) => (
              <div key={index} className={styles.skillCell}>
                <div className={styles.skillWidth}>{skill}</div>
                {selectedData.map((user) => (
                  <div key={user.id} className={styles.colorBoxes}>
                    <ColorBoxes skill={skill} user={user} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Consensus Score Column */}
          {selectedData && <div className={styles.consensusColumn}></div>}
          <div className={styles.candidatesGridWrapper}>
            <div className={styles.candidatesGrid}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heatmap;
