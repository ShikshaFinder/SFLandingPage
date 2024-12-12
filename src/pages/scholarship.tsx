// pages/scholarships.js
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// Supabase configuration
const SUPABASE_URL = "https://fslbqtbaaarlceqjiwoa.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbGJxdGJhYWFybGNlcWppd29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MjMxNDcsImV4cCI6MjA0OTQ5OTE0N30.xS2UPl7bLxv7yibB1PUce1aZLLLVyDsUDiSTSjSqwKI";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const Scholarships = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchScholarships = async () => {
      const { data, error } = await supabase
        .from("scholarship")
        .select(
          "scholarship_name, eligibility_criteria, application_method, application_deadline, link"
        );

      if (error) {
        console.error("Error fetching scholarships:", error.message);
      } else {
        setScholarships(data);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "16px",
      }}
    >
      {scholarships.map((scholarship, index) => (
        <ScholarshipCard key={index} scholarship={scholarship} />
      ))}
    </div>
  );
};

// Card component
interface Scholarship {
  scholarship_name: string;
  eligibility_criteria: string;
  application_method: string;
  application_deadline: string;
  link: string;
}

const ScholarshipCard = ({ scholarship }: { scholarship: Scholarship }) => {
  const truncateText = (text: string | any[], maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "300px",
      }}
    >
      <img
        src="/sf.webp"
        alt={scholarship.scholarship_name}
        style={{ width: "100%", borderRadius: "8px 8px 0 0" }}
      />
      <h2 style={{ fontSize: "18px", margin: "8px 0" }}>
        {scholarship.scholarship_name}
      </h2>
      <p style={{ fontSize: "14px", color: "#555" }}>
        <strong>Eligibility:</strong>{" "}
        {truncateText(scholarship.eligibility_criteria, 100)}
      </p>
      <p style={{ fontSize: "14px", color: "#555" }}>
        <strong>Application Method:</strong>{" "}
        {truncateText(scholarship.application_method, 50)}
      </p>
      <p style={{ fontSize: "14px", color: "#555" }}>
        <strong>Deadline:</strong> {scholarship.application_deadline}
      </p>
      <a
        href={scholarship.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          marginTop: "8px",
          textAlign: "center",
          color: "#0070f3",
          textDecoration: "none",
        }}
      >
        Apply Now
      </a>
    </div>
  );
};

export default Scholarships;
