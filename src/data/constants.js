const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_SHORT =["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const START_HOUR =6;
const END_HOUR =22;
const DURATIONS =[ 30, 60, 120, 180, 240];
const PRIORITIES =["High", "Medium", "Low"];
const SUBJECTS ={
  Math: "#6366f1",
  Physics: "#0ea5e9",
  Coding: "#10b981",
  Reading: "#f59e0b",
  Language: "#ec4899",
  Other: "#64748b"
};
const STORAGE_KEY ="studyflow.tasks.v1";
const SAMPLE_TASKS =[
  {id: "s1", title: "Calculus practice", day: 0, time: "09:00", duration: 90, subject: "Math", priority: "High", done: true},
  {id: "s2", title: "Algorithms drill", day: 1, time: "10:00", duration: 120, subject: "Coding", priority: "High", done: false},
  {id: "s3", title: "Quantum notes", day: 2, time: "14:00", duration: 60, subject: "Physics", priority: "Medium", done: false},
  {id: "s4", title: "Read research paper", day: 3, time: "18:00", duration: 60, subject: "Reading", priority: "Low", done: false},
  {id: "s5", title: "Spanish vocab", day: 4, time: "08:00", duration: 30, subject: "Language", priority: "Medium", done: false},
  {id: "s6", title: "Mock contest", day: 5, time: "11:00", duration: 180, subject: "Coding", priority: "High", done: false}
];
