"use client";
import { useEffect, useState } from "react";
import Heatmap from "./components/Heatmap";
import styles from "./page.module.css";

export default function Home() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://forinterview.onrender.com/people"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCandidates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserList();
  }, []);
  const selectCandidate = (id) => {
    setSelectedCandidate((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.has(id) ? updatedSet.delete(id) : updatedSet.add(id);
      return Array.from(updatedSet);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const responses = await Promise.all(
          selectedCandidate.map(async (id) => {
            const response = await fetch(
              `https://forinterview.onrender.com/people/${id}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch data for ID: ${id}`);
            }
            return await response.json();
          })
        );
        setSelectedData(responses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCandidate.length > 0) {
      fetchData();
    } else {
      setSelectedData([]);
    }
  }, [selectedCandidate]);

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <a href="#" className={styles.backLink}>
            ← Back to My Jobs
          </a>
          <h1>Posk_UXDesigner_sr001</h1>
          <span className={styles.candidateCount}>
            {candidates.length} Candidates
          </span>
        </div>
        <div className={styles.layout}>
          <div className={styles.sidebar}>
            {/* First Container: Most recommended */}
            <div className={styles.recommendedContainer}>
              <h2>Most recommended</h2>
              <ul>
                {candidates.map((candidate) => (
                  <li key={candidate.id}>
                    <span className={styles.dot}></span>
                    <a
                      href="#"
                      className={styles.recommendedName}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {candidate.name}
                      <button
                        onClick={() => selectCandidate(candidate.id)}
                        className={styles.addUser}
                      >
                        +
                      </button>
                    </a>
                  </li>
                ))}
              </ul>
              <p>
                Recommendations are based on your skill requirements and
                candidates performance
              </p>
            </div>

            {/* Second Container:  list of names */}
            <div className={styles.additionalContainer}>
              <ul>
                {candidates.map((candidate) => (
                  <li key={candidate.id}>
                    <span className={styles.dot}></span>
                    <a
                      href="#"
                      className={styles.recommendedName}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {candidate.name}
                      <button
                        onClick={() => selectCandidate(candidate.id)}
                        className={styles.addUser}
                      >
                        +
                      </button>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Heatmap
            selectedData={selectedData}
            selectedCandidate={selectedCandidate}
          />
        </div>
      </main>
    </div>
  );
}
