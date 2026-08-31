import os
from datetime import datetime

from pyowm import OWM # type: ignore
from pyowm.commons.exceptions import OWMError # type: ignore


def create_weather_manager(api_key=None):
	api_key = api_key or os.getenv("OWM_API_KEY")
	if not api_key:
		raise ValueError(
			"Missing OpenWeatherMap API key. Set the OWM_API_KEY environment variable."
		)
	return OWM(api_key)


def format_weather(city_name, weather):
	wind = weather.wind()
	sunrise = datetime.fromtimestamp(weather.sunrise_time()).strftime("%H:%M:%S")
	sunset = datetime.fromtimestamp(weather.sunset_time()).strftime("%H:%M:%S")
	return (
		f"\nWeather in {city_name}\n"
		f"Condition: {weather.detailed_status.title()}\n"
		f"Temperature: {weather.temperature('celsius').get('temp')} C\n"
		f"Humidity: {weather.humidity}%\n"
		f"Wind: {wind.get('speed', 0)} m/s, direction {wind.get('deg', 'unknown')} degrees\n"
		f"Sunrise: {sunrise}\n"
		f"Sunset: {sunset}"
	)


def get_weather_by_id(owm, city_id):
	observation = owm.weather_manager().weather_at_id(city_id)
	return observation.location, observation.weather


def get_forecast(owm, city_id):
	forecast = owm.weather_manager().forecast_at_id(city_id, "3h")
	return forecast.get_forecast().get_weathers()


def get_air_pollution(owm, location):
	pollution_manager = owm.airpollution_manager()
	pollution = pollution_manager.airpollution_at_coords(location.lat, location.lon)
	return pollution.current_airpollution().air_quality


def print_forecast(forecast):
	print("\nFive-day forecast")
	for weather in forecast:
		time_label = datetime.fromtimestamp(weather.reference_time()).strftime(
			"%a %d %b %H:%M"
		)
		temperature = weather.temperature("celsius").get("temp")
		print(f"{time_label}: {weather.detailed_status.title()}, {temperature} C")


def display_city_weather(owm, city_id):
	location, weather = get_weather_by_id(owm, city_id)
	print(format_weather(location.name, weather))
	print_forecast(get_forecast(owm, city_id))
	try:
		air_quality = get_air_pollution(owm, location)
		print(f"Air quality index: {air_quality}")
	except OWMError as error:
		print(f"Air pollution data unavailable: {error}")


def main():
	try:
		owm = create_weather_manager()
		paris_city_id = 2988507
		print("Paris weather")
		display_city_weather(owm, paris_city_id)

		while True:
			answer = input("\nEnter a city ID for another location, or press Enter to quit: ").strip()
			if not answer:
				print("Goodbye!")
				break
			try:
				display_city_weather(owm, int(answer))
			except ValueError:
				print("Please enter a numeric city ID.")
			except OWMError as error:
				print(f"Could not retrieve that city: {error}")
	except (ValueError, OWMError) as error:
		print(f"Weather app error: {error}")


if __name__ == "__main__":
	main()
