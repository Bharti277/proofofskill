"use client";
import { useEffect, useState } from "react";
import styles from "../Heatmap.module.css";

export default function ColorBoxes({ skill, user }) {
  const [consensusScore, setConsensusScore] = useState(0);

  useEffect(() => {
    const skillSet = user?.data?.data?.skillset
      ?.flatMap((category) => category.skills)
      ?.find((s) => s.name === skill);

    setConsensusScore(skillSet?.pos?.[0]?.consensus_score ?? 0);
  }, [skill, user]);

  return (
    <div className={styles.consensusCell} data-score={consensusScore}>
      {consensusScore}
    </div>
  );
}
