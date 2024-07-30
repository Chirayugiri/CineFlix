
// alert('called');
// console.log(`The data is: ${window.sharedData}`);

function show_movie_details()
{
    baseImgURL="https://image.tmdb.org/t/p/w500";
    var bodyTag=document.body;
    // movie_name.textContent=movie_detail.original_title;
    // console.log(movie_detail.original_title);
    var movie_detail= JSON.parse(localStorage.getItem('movie_detail_data'));
    console.log("The data is: "+movie_detail);

    bodyTag.innerHTML=`<div class="container">
    <div class="title" id="title">
        <div class="heading">
            <h1 id="movie_name">${movie_detail.original_title}</h1> <br> <p id="relasedDate">Released Date: ${movie_detail.release_date}</p>
        </div>
        <div class="rating">
            <h3>TMDB Rating :<br> <i class="fas fa-star gold-star"></i>  ${Math.round(movie_detail.vote_average)}</h3>
        </div>
    </div>
    
    <div class="backdropImg">
        <img src="${baseImgURL+movie_detail.backdrop_path}" id="backgroundImg">
    </div>
    <div class="row" id="row">
        <img src="${baseImgURL+movie_detail.poster_path}" width="130px" id="posterImg">
        <h3 id="desc">${movie_detail.overview}</h3>
    </div>
    
    <hr>
    <h3 id="popularity">Popularity: ${Math.round(movie_detail.popularity)}</h3>
    <hr>
    <h3 id="language">Language: ${movie_detail.original_language}</h3>
</div>`;
}

show_movie_details();