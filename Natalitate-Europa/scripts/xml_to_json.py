import xml.etree.ElementTree as ET
import json

tree = ET.parse('data.xml')
root = tree.getroot()

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
];

countries_with_info = []

data = []
for child in root:
    country = None
    year = None
    value = None
    for field in child.iter('field'):
        attr = field.attrib
        if attr['name'] == 'Country or Area':
            country = field.text
        elif attr['name'] == 'Year':
            year = field.text
        elif attr['name'] == 'Value':
            value = field.text
    if country in countries and int(year) < 2014 and int(year) >= 1965:
        country_data = {'country' : country, 'year' : year, 'natality' : float(value), 'mortality' : 0}
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

