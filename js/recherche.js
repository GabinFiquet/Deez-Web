$(function() {
    //Ajout d'un écouteur d'événement sur la soumission du formulaire de recherche
    $('#searchForm').submit(function(event) {
        event.preventDefault();

        //Récupération des valeurs saisies par l'utilisateur
        let searchValue = $('#search').val();
        var sortValue = $('#sort').val();
        
        //Envoie de la requête à l'API de Deezer
        $.ajax({
            url: `https://api.deezer.com/search?q=${searchValue}&order=${sortValue}&output=jsonp`,
            dataType: "jsonp"
          }).then((result) => {
              
            //Condition sur la valeur de la recherche et sur le résultat de la requête
            //Si : il y a une valeur de recherche et qu'il y a des résultats correspondant
            if (searchValue.length != 0 && result.data.length != 0){

                //Boucle qui génère les cartes pour chaque résultat de la requête
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

                    //Code HTML qui génère la carte
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

                    //Ajout d'une class sur le bouton de la carte qui ajoute ou retire des favoris
                    //Selon si la musique est déjà ou non dans les favoris
                    $('#buttonFav' + [i]).addClass( !(storage && storage.find(item => item.id === favoriteSong.id)) ? "addFav" : "removeFav");

                    //Ajout d'un écouteur d'événement sur le clic du bouton de favoris
                    $('#buttonFav' +[i]).on('click', function(e) {
                        e.preventDefault();

                        //Condition sur la class du bouton :
                        //Si : ajout de la musique en Favoris
                        if($(this).hasClass("addFav")){
                            $(this).addClass('removeFav');
                            $(this).removeClass('addFav');                            
                            $(this).html('Retirer des favoris');

                            //Ajout de la musique dans la collection DeezWebFavoris
                            let favorisList = JSON.parse(localStorage.getItem("DeezWebFavoris")) || [];
                            favorisList.push(favoriteSong);
                            localStorage.setItem("DeezWebFavoris", JSON.stringify(favorisList));       
                        }
                        //Retrait de la musique des Favoris
                        else{  
                            $(this).removeClass('removeFav'); 
                            $(this).addClass('addFav');
                            $(this).html('Ajouter aux favoris');

                            //Retrait de la musique dans la collection DeezWebFavoris
                            let favorisList = JSON.parse(localStorage.getItem("DeezWebFavoris")); 
                            favorisList = favorisList.filter(favorisList => { 
                                if( favorisList.id == favoriteSong.id ){
                                    return false;
                                }
                                return true;
                            });
                            localStorage.setItem("DeezWebFavoris", JSON.stringify(favorisList));  
                        }              
                    });                        
                }
                //Ajout du texte correspondant pour chaque class de bouton
                $('.addFav').html('Ajouter aux favoris');
                $('.removeFav').html('Retirer des favoris');            
            }
            //Sinon Si : il y a une valeur de recherche et qu'il n'y a  pas de résultats correspondant
            else if(searchValue.length != 0 && result.data.length == 0){
                $('.songList').append(`<h4>Désolé, aucun résultat ne correspond à la rechreche : ${searchValue}.</h4>`);
            }
            //Sinon : il n'a pas de valeur de recherche
            else{
                $('.songList').append(`<h4>Veuillez remplir le champ de recherche.</h4>`);
            }
          });                              
          //Vide la section .songList avant chaque nouvelle requête
          $('.songList').html('');  
    });

});
