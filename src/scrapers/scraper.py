from youtubesearchpython import VideosSearch
import json
from youtube_search import YoutubeSearch

with open("movie_names.json", "r") as name_file:
    names = json.load(name_file)

with open("movies_summary.json", "r") as text_file:
    summaries = json.load(text_file)

with open("movies_meta.json", "r") as meta_file:
    metas = json.load(meta_file)

with open("movie_ratings.json", "r") as rating_file:
    ratings = json.load(rating_file)

results = []
genres_all = []

for movie in summaries["results"]:
    m_id = movie["imdb_id"]
    actors = movie["actors"].replace("|", ", ")
    movie["actors"] = actors
    movie["summary"] = movie["summary"].strip()

    for movie_named in names["results"]:
        if movie_named["imdb_id"] == m_id:
            movie["title"] = movie_named["title"]
            movie["wiki_link"] = movie_named["wiki_link"]
            movie["poster"] = movie_named["poster_path"]

    for movie_meta in metas["results"]:
        genre = movie_meta["genres"].split("|")[0]
        g = movie_meta["genres"].split("|")
        for item in g:
            genres_all.append(item)
        if movie_meta["imdb_id"] == m_id:
            movie["year"] = movie_meta["year_of_release"]
            movie["genre"] = genre

    for movie_rated in ratings["results"]:
        if movie_rated["imdb_id"] == m_id:
            movie["rating"] = movie_rated["imdb_rating"]
    results.append(movie)


with open("data_file.json", "w") as write_file:
    json.dump(results, write_file)

links = []
for name in names["results"]:
    videosSearch = VideosSearch(name['title'], limit=1)

    link = (videosSearch.result()['result'][0]["link"])
    videos = []
    for val in videosSearch.result()['result']:
        videos.append(val["link"])

        data = {"imdb_id": name["imdb_id"], "links": videos}
        links.append(data)


with open("links_file.json", "w") as links_file:
    json.dump(links, links_file)

genres_unique = set(genres_all)
print(genres_unique)
