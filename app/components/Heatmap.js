import { useState } from "react";
import styles from "../Heatmap.module.css";
import ColorBoxes from "./ColorBoxes";

const Heatmap = ({ selectedData, selectedCandidate }) => {
  const allSkills = [
    ...new Set(
      selectedData?.flatMap((user) =>
        user?.data?.data?.skillset?.flatMap((a) =>
          a?.skills?.map((b) => b?.name)
        )
      )
    ),
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);

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
          <span>Filter by Skills</span>
          <select multiple value={selectedSkills} onChange={handleSkillChange}>
            {allSkills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Heatmap Grid */}
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

      {/* Compare Button */}
      {selectedCandidate.length === 0 && (
        <button className={styles.compareButton}>
          Select candidate to compare
        </button>
      )}
    </div>
  );
};

export default Heatmap;
