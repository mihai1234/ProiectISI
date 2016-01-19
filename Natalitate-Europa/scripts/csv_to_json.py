import json
import csv

countries = [
"Austria",
"Belgium",
"Bulgaria",
"Croatia",
"Cyprus",
"Czech Republic",
"Denmark",
"Estonia",
"Finland",
"France",
"Germany",
"Greece",
"Hungary",
"Ireland",
"Italy",
"Latvia",
"Lithuania",
"Luxembourg",
"Malta",
"Netherlands",
"Poland",
"Portugal",
"Romania",
"Slovak Republic",
"Slovenia",
"Spain",
"Sweden",
"United Kingdom",
]

fieldnames = ("LAT", "LONG", "DMS_LAT", "DMS_LONG", "MGRS", "JOG", "DSG", "AFFIL", "FIPS10", "SHORT_NAME", "FULL_NAME", "MOD_DATE", "ISO3136")
reader = csv.DictReader(open('centroids.csv', 'r'), fieldnames)

data = []
countries_with_info = []

for row in reader:
    country_data = {}
    country = row['SHORT_NAME']
    lat = row['LAT']
    longitude = row['LONG']
    if country in countries:
        country_data = {'country' : country, 'lat' : float(lat), 'long' : float(longitude)}
        data.append(country_data)
        if country not in countries_with_info:
            countries_with_info.append(country)

def print_json_array(array):
    print json.dumps(array, sort_keys=True, indent=4, separators=(',', ': '))

print_json_array(data)

if len(countries) - len(countries_with_info) > 0:
    for country in countries:
        if country not in countries_with_info:
            print country
