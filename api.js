const API_KEY = "uxtaJMpvBqMmmoVU25qXXMLx7NYmncRsgblfGoKO";
const alertsDiv = document.getElementById("alerts");
const btn = document.getElementById("checkBtn");

async function fetchData(type, title, impact) {
  const start = new Date().toISOString().split("T")[0];
  const end = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const url = `https://api.nasa.gov/DONKI/${type}?startDate=${start}&endDate=${end}&api_key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.length > 0) {
      alertsDiv.innerHTML += `<h2>${title}</h2>`;
      data.slice(0, 2).forEach((ev) => {
        const time = ev.startTime || ev.beginTime || ev.eventTime || "Unknown";
        alertsDiv.innerHTML += `
          <div class="alert">
            <p><b>Observation:</b> ${ev.note || ev.messageType || "N/A"}</p>
            <p><b>Impact:</b> ${impact}</p>
            <p><b>Time:</b> ${time}</p>
          </div>
        `;
      });
    } else {
      alertsDiv.innerHTML += `
        <div class="alert">
          <h3>${title}</h3>
          <p>No events are expected in the coming days 🚫</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    alertsDiv.innerHTML += `
      <div class="alert">
        <h3>${title}</h3>
        <p>An error occurred while loading the data ⚠️</p>
      </div>
    `;
  }
}

async function loadAlerts() {
  alertsDiv.innerHTML = " Loading... ⏳";
  await fetchData("CME", "☀ CME", "Magnetic storms may occur.");
  await fetchData("FLR", "⚡ Solar Flare", "It may affect communications.");
  await fetchData("GST", "🧭 Geomagnetic Storm", "It may affect electrical networks.");
}

btn.addEventListener("click", loadAlerts);

setInterval(loadAlerts, 10 * 60 * 1000);

loadAlerts();



const API_KEYv = "uxtaJMpvBqMmmoVU25qXXMLx7NYmncRsgblfGoKO"; // ضع مفتاحك هنا
const alertsDivv = document.getElementById("aler");
const btnv = document.getElementById("checkBtn");

async function fetchData(type, title, impact) {
  const today = new Date().toISOString().split("T")[0];
  const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]; // آخر 7 أيام
  const url = `https://api.nasa.gov/DONKI/${type}?startDate=${start}&endDate=${today}&api_key=${API_KEYv}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.length > 0) {
    data.slice(0, 2).forEach(ev => {
      const time = ev.startTime || ev.beginTime || ev.eventTime || "Unknown";
      alertsDiv.innerHTML += `
        <div class="alert">
          <h3>${title}</h3>
          <p><b>Observation:</b> ${ev.note || ev.messageType || "N/A"}</p>
          <p><b>Impact:</b> ${impact}</p>
          <p><b>Time:</b> ${time}</p>
        </div>
      `;
    });
  }
}

async function loadAlerts() {
  alertsDiv.innerHTML = "⏳ Loading...";
  await fetchData("CME", "☀ CME", "Can trigger geomagnetic storms");
  await fetchData("FLR", "⚡ Solar Flare", "May disrupt communications");
  await fetchData("GST", "🧭 Geomagnetic Storm", "Can affect power grids");
}

// يدوي
btn.addEventListener("click", loadAlerts);

// أوتوماتيك كل 10 دقائق
setInterval(loadAlerts, 10 * 60 * 1000);

// أول تحميل
loadAlerts();