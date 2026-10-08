const pad =n =>String(n).padStart(2, "0");
const toMinutes =t =>{
  const [h, m] =t.split(":").map(Number);
  return h*60+m;
};
const formatHour=h=>`${pad(h)}:00`;
const formatDuration =m =>
  m < 60 ? `${m} min`: m % 60 ===0 ? `${m / 60} h` : `${Math.floor(m / 60)} h ${m % 60} min`;
const formatHours = m =>`${+(m / 60).toFixed(1)}h`;
const todayIndex = () =>(new Date().getDay() + 6) % 7;
const nowWeekMinutes = () =>{
  const d =new Date();
  return todayIndex() * 1440 + d.getHours() * 60 + d.getMinutes();
};
