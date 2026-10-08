function h(tag, props = {}, ...children){
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)){
    if (key === "class") el.className = value;
    else if (key.startsWith("on")) el.addEventListener(key.slice(2).toLowerCase(), value);
    else if (value !== false && value != null) el.setAttribute(key, value);
  }
  children.flat().forEach(child =>{
    if (child != null && child !== false) el.append(child);
  });
  return el;
}
