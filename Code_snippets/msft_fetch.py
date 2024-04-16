import requests

url = "https://apistocks.p.rapidapi.com/monthly"

querystring = {"symbol":"MSFT","dateStart":"2000-01-01","dateEnd":"2024-01-01"}

headers = {
	"X-RapidAPI-Key": "aba5f18006mshf50a0e95138d6f9p1f5aefjsn99f18a46e2be",
	"X-RapidAPI-Host": "apistocks.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())