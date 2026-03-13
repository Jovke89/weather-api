export default async function handler(req, res) {
  const city = req.query.city || "Belgrade";
  const apiKey = process.env.WEATHER_API_KEY;
  
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  
  const data = await response.json();
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({
    city: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    humidity: data.main.humidity
  });
}
