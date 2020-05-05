$(function() {
    $('#searchForm').submit(function(event) {
        event.preventDefault();

        let searchValue = $('#search').val();
        var sortValue = $('#sort').find(':selected').val();
        switch (sortValue) {
            case 'title':
                sortValue = 'TRACK_ASC';
                break;
            case 'artist':
                sortValue = 'ARTIST_ASC';
                break;
            case 'album':
                sortValue = 'ALBUM_ASC';
                break;
            case 'popularity':
                sortValue = 'RATING_ASC';
                break;
            case 'rank':
                sortValue = 'RANKING';
                break;
            default:
                sortValue = 'TRACK_ASC';
        };

        console.log(sortValue)
        $.ajax({
            url: `https://api.deezer.com/search?q=${searchValue}&order=${sortValue}&output=jsonp`,
            dataType: "jsonp"
          }).then((result) => {
            console.log(result.data);

            if (searchValue.length != 0 && result.data.length != 0){

                for (let i=0; i < result.data.length; i++){

                let title = result.data[i].title;              
                    artist = result.data[i].artist.name;
                    album =  result.data[i].album.title;
                    cover = result.data[i].album.cover;   
                    player = result.data[i].preview;
                
                let favoriteSong = {
                        id : result.data[i].id,
                        cover : result.data[i].album.cover,
                        title : result.data[i].title,
                        artist : result.data[i].artist.name,
                        album : result.data[i].album.title,
                        player: result.data[i].preview
                    };

                    $('.songList').append(`
                    <article class="flex-row card" id="card${i}">
                        <div class="flex-col description" id="description${i}">
                            <p><span class="title" id="title${i}">${title}</span> - <span class="artist" id="artist${i}">${artist}</span></p>
                            <p class="album" id="album${i}">${album}</p>
                            <button id="buttonFav${i}" class="btn-DzW"></button>
                        </div>
                        <img class="cover" id="cover${i}" src="${cover}">
                        <audio controls class="player" id="player${i}" src="${player}"></audio>
                    </article>`);

                    let storageJSON = localStorage.getItem("DeezWebFavoris");
                    let storage = storageJSON ? JSON.parse(storageJSON) : storageJSON;

                    $('#buttonFav' + [i]).addClass( !(storage && storage.find(item => item.id === favoriteSong.id)) ? "addFav" : "removeFav");

                    $('#card'+ [i]).find('#buttonFav' +[i]).on('click', function(e) {
                        e.preventDefault();
                        // CONDITION D'AJOUT DE FAVORIS OU DE RETRAIT
                        if($(this).hasClass("addFav")){
                            $(this).addClass('removeFav');
                            $(this).removeClass('addFav');                            
                            $(this).html('Retirer des favoris');

                            let fav = JSON.parse(localStorage.getItem("DeezWebFavoris")) || [];
                            fav.push(favoriteSong);
                            localStorage.setItem("DeezWebFavoris", JSON.stringify(fav));       
                        }
                        else{  
                            $(this).removeClass('removeFav'); 
                            $(this).addClass('addFav');
                            $(this).html('Ajouter aux favoris');

                            let fav = JSON.parse(localStorage.getItem("DeezWebFavoris")); 
                            fav = fav.filter(fav => { 
                                if( fav.id == favoriteSong.id ){
                                    return false;
                                }
                                return true;
                            });
                            localStorage.setItem("DeezWebFavoris", JSON.stringify(fav));  
                        }              
                    });                        
                }
                $('.addFav').html('Ajouter aux favoris');
                $('.removeFav').html('Retirer des favoris');            
            }else if(searchValue.length != 0 && result.data.length == 0){
                $('.songList').append(`<h4>Désolé, aucun résultat ne correspond à la rechreche : ${searchValue}.</h4>`);
            }else{
                $('.songList').append(`<h4>Veuillez remplir le champ de recherche.</h4>`);
            }
          });
                              

          $('.songList').html('');  
    });

});
