import json

def convert(data):
    new_data = {}
    for key in data:
        new_data[str(key)] = data[key]
    return new_data

with open('country_data.json') as data_file:
    data = json.load(data_file)

with open('centroids.json') as centroids_file:
    centroids = json.load(centroids_file)

coords = {}


for centroid in centroids:
    centroid = convert(centroid)
    country = centroid['country']
    coords[country] = (centroid['lat'], centroid['long'])

def create_combined(country_data, centroid):
    result = {}
    result['type'] = 'Feature'
    result['geometry'] = {'type' : 'Point', 'coordinates' : list(centroid)}
    result['properties'] = country_data
    return result

def print_json_array(array):
    print json.dumps(array, sort_keys=True, indent=4, separators=(',', ': '))

features = []

for country_data in data:
    country_data = convert(country_data)
    country = country_data['country']
    centroid = coords[country]
    features.append(create_combined(country_data, centroid))

out = {'type' : 'FeatureCollection', 'features' : features}

print json.dumps(out, indent=4, separators=(',', ': '))

