module.exports = async function handler(req, res) {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(200).json({ error: "API key missing" });
    }

    let url;
    
    if (req.query.lat && req.query.lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${apiKey}&units=metric`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=Belgrade&appid=${apiKey}&units=metric`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      icon: data.weather[0].icon
    });
    
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
}
