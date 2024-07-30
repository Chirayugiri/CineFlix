Overview:

This project uses TMDB API to fetch JSON data(key,value) form and displays the current Trending & Top-rated 
movies.

Note:

1) To show the movie_details of the clicked movie we store the JSON data of that movie in 'LocalStorage'
and retrieve the LocalStorage data in new page.

2) Each movie card div contains JSON data of that movie in data element called 'data-userObj',
so that when we click on the box the data of particular movie is stored in LocalStorage and displayed.

3) whenever the key is entered for search then remove the previous movie tiles then insert new.

