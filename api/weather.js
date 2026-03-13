module.exports = async function handler(req, res) {
  try {
    const city = req.query.city || "Belgrade";
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(200).json({ error: "API key missing" });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    
    const data = await response.json();
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
    
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
}
