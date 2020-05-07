$(function() {

    //Récupération dans le localStorage de l'objet "DeezWebFavoris"
    //Mise au format Objet JS de "DeezWebFavoris"
    let storageJSON = localStorage.getItem("DeezWebFavoris");
        favorisList = storageJSON ? JSON.parse(storageJSON) : storageJSON;

    //Condition sur l'exitence de favoris dans favorisList
    //Si : il ya des favoris 
    if (favorisList.length != 0){

        //Boucle qui génère les cartes pour chaque musique présente dans favorisList
        for (let i=0; i< favorisList.length; i++){

            //Code HTML qui génère la carte
            $('.songFavList').append(`
                        <article class="flex-row card" id="card${i}">
                            <div class="flex-col description" id="description${i}">
                                <p><span class="title" id="title${i}">${favorisList[i].title}</span> - <span class="artist" id="artist${i}">${favorisList[i].artist}</span></p>
                                <p class="album" id="album${i}">${favorisList[i].album}</p>
                                <button id="buttonFav${i}" class="btn-DzW removeFav">Retire des favoris</button>
                            </div>
                            <img class="cover" id="cover${i}" src="${favorisList[i].cover}">
                            <audio controls class="player" id="player${i}" src="${favorisList[i].player}"></audio>
                        </article>`);

            let idFavoris = favorisList[i].id;

            //Ajout d'un écouteur d'événement sur le clic du bouton pour retirer des favoris la musique
            $(`#buttonFav${i}`).on('click', idFavoris, function(event){
                favorisList = favorisList.filter(idFavoris => idFavoris.id !== event.data);
                localStorage.setItem("DeezWebFavoris", JSON.stringify(favorisList));

                //Ajout d'une annimation et suppression de la carte ciblé
                $(`#card${i}`).addClass('bounceOut');
                setTimeout(function() {
                    $(`#card${i}`).remove()
                }, 1000);
            });
                //Ajout d'une image de vniyle avec une animation à place de la pochette d'album quand la musique est joué
                $(`#player${i}`).on('play', function(event){
                    $(`#cover${i}`).attr('src', 'images/vinyle.png');
                    $(`#cover${i}`).addClass('rotateVinyle');
                });
                //Remplace le vinyle, et retire l'animation, par la pochette d'album quand la musique est en pause
                $(`#player${i}`).on('pause', function(event){
                    $(`#cover${i}`).attr('src', favorisList[i].cover);
                    $(`#cover${i}`).removeClass('rotateVinyle');
                });
                //Remplace le vinyle, et retire l'animation, par la pochette d'album quand la musique est fini
                $(`#player${i}`).on('ended', function(event){
                    $(`#cover${i}`).attr('src', favorisList[i].cover);
                    $(`#cover${i}`).removeClass('rotateVinyle');
                });
        };
    }
    //Sinon : il n'a pas de favoris
    else{
        $('.songFavList').append(`<h4>Désolé, tu n'as pas encore de favoris</h4>`);
    }
});