api_key="7907564bc49793fc9ee4b4cb80a4ecc9"
trendingMovies=`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`;
topratedMovies=`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`;
nowplayingMovies=`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`;
baseImgURL="https://image.tmdb.org/t/p/w500/";
searchQuery=`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;

var trending=document.getElementById("trending");
var toprated=document.getElementById("toprated");
var nowplaying=document.getElementById('nowplaying');

async function showMovies(movieType)
{
    try{
        if(movieType=="trending"){
            var response=await fetch(trendingMovies);
        }else if(movieType=="toprated"){
            var response=await fetch(topratedMovies);
        }
        else if(movieType=="nowplaying"){
            var response=await fetch(nowplayingMovies);
        }
        if(response.ok){
            var data=await response.json();
            for(i=0;i<=data.results.length;i++){
                //create elements
                var box=document.createElement("div");
                var img=document.createElement("img");
                var name=document.createElement("h4");

                box.style.width="200px";
                box.style.margin="10px";
                img.style.width="100%";
                // box.setAttribute('id',`${box[i]}`);
                box.classList.add(`box`);

                //setting dict result to html box element
                box.dataset.object=JSON.stringify(data.results[i]);

                img.src=baseImgURL+data.results[i].poster_path;
                name.innerHTML=data.results[i].original_title;

                box.appendChild(img);
                box.appendChild(name);
                if(movieType=="trending"){
                    trending.appendChild(box);
                }else if(movieType=="toprated"){
                    toprated.appendChild(box);
                }
                else if(movieType=="nowplaying"){
                    nowplaying.appendChild(box);
                }
            }
        }
    }catch(err){
        console.log(err);
    }
}

showMovies("trending");     //display movies on home screen
showMovies("toprated");
showMovies('nowplaying');


window.addEventListener('load', function(event){
      document.getElementById('trending').addEventListener('click', function(event) {
        getData(event,false);
      });
      document.getElementById('toprated').addEventListener('click', function(event) {
        getData(event,false);
      });
      document.getElementById('nowplaying').addEventListener('click', function(event) {
        getData(event,false);
      });

      //for searchmenu
      document.getElementById('searchMenu').addEventListener('click',function(event){
        getData(event,true);
      });
})

function getData(event,isFromSearchMenu)
{
    let clickedBox = null;
        if(isFromSearchMenu!=true){
            if (event.target.classList.contains('box')) {
                clickedBox = event.target;
            } else {
                clickedBox = event.target.closest('.box');
            }
        }
        else if(isFromSearchMenu==true){
            if(event.target.classList.contains('movieSearcResultshRow')){
                clickedBox=event.target;
            }else{
                clickedBox=event.target.closest('.movieSearcResultshRow');
            }
        }
        if (clickedBox !== null) {
            const boxData = JSON.parse(clickedBox.dataset.object);
            //store data in localStorage
            localStorage.setItem('movie_detail_data',clickedBox.dataset.object);
            window.location.href='showMovieDetail.html';
        }
}

var searchBox=document.getElementById('searchBox');
var container=document.getElementById('container');
var searchMenu=document.getElementById('searchMenu');

searchBox.addEventListener('keydown',async function (event) {       //display the movie in searchmenu of searched movie
    //perform task
    // console.log(event.key);

    //showing the movie search window
    searchMenu.style.display="block";
    //remove img and name of the movies for each tile
    while (searchMenu.firstChild) {
        searchMenu.removeChild(searchMenu.firstChild); // Remove each child node until there are no more child nodes left
    }
    try{
        var inputData=null;
        if(event.keyCode===8){
            //backspace is clicked
            event.preventDefault();
            inputData=(searchBox.value).slice(0,-1);
            searchBox.value=(searchBox.value).slice(0,-1);
        }
        else{
            inputData=searchBox.value+event.key;
        }

        var response=await fetch(searchQuery+inputData);
        if(response.ok){
            var data=await response.json();
            for(i=0;i<data.results.length;i++)
            {
                //create movie list tile
                var movieSearcResultsRow=document.createElement('div');
                movieSearcResultsRow.classList.add('movieSearcResultshRow');
                //set data in each row element
                movieSearcResultsRow.dataset.object=JSON.stringify(data.results[i]);
                var line=document.createElement('hr');
                var movieSearchedPoster=document.createElement('img');
                movieSearchedPoster.style.width="50px";
                var movieSearchedName=document.createElement('h3');

                //add data
                movieSearchedPoster.src=baseImgURL+data.results[i].poster_path;
                movieSearchedName.textContent=data.results[i].original_title;

                movieSearcResultsRow.appendChild(movieSearchedPoster);
                movieSearcResultsRow.appendChild(movieSearchedName);

                searchMenu.appendChild(line);
                searchMenu.appendChild(movieSearcResultsRow);
            }

        }
    }
    catch(err){
        console.log(err);
    }
});




