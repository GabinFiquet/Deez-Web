$(function() {

    //Récupération dans le localStorage de l'objet "DeezWebFavoris"
    //Mise au format Objet JS de "DeezWebFavoris"
    let storageJSON = localStorage.getItem('DeezWebFavoris');
        favorisList = storageJSON ? JSON.parse(storageJSON) : storageJSON;

    //Condition sur l'exitence de favoris dans favorisList
    //Si : il ya des favoris 
    if (favorisList.length > 0){

        //Choix aléatoire d'une musique dans Liste de favoris
        let randomFavoris = Math.floor(Math.random() * favorisList.length);
            selectedFavoris = favorisList[randomFavoris];
        
        //Génération de la carte de la musique choisi aléatoirement
        $('.title').append(selectedFavoris.title);
        $('.artist').append(selectedFavoris.artist);
        $('.album').append(selectedFavoris.album);
        $('.cover').attr('src', selectedFavoris.cover);
        $('.player').attr('src', selectedFavoris.player);

        //Ajout d'un écouteur d'événement sur le clic du bouton pour retirer des favoris la musique
        $('.removeFav').on('click', selectedFavoris.id, function(event){
            favorisList = favorisList.filter(selectedFavoris => selectedFavoris.id !== event.data);
            localStorage.setItem("DeezWebFavoris", JSON.stringify(favorisList));
            
            //Ajout d'une annimation et recharge une carte
            $('.card').removeClass('flipInY');
            $('.card').addClass('fadeOutLeft');
            setTimeout(function() {
                 location.reload(true);}, 1000);
           
        });

        //Ajout d'une image de vniyle avec une animation à place de la pochette d'album quand la musique est joué
        $('.player').on('play', function(event){
            $('.cover').attr('src', 'images/vinyle.png');
            $('.cover').addClass('rotateVinyle');
        })
        //Remplace le vinyle, et retire l'animation, par la pochette d'album quand la musique est en pause
        $('.player').on('pause', function(event){
            $('.cover').attr('src', selectedFavoris.cover);
            $('.cover').removeClass('rotateVinyle');
        })
        //Remplace le vinyle, et retire l'animation, par la pochette d'album quand la musique est fini
        $('.player').on('ended', function(event){
            $('.cover').attr('src', selectedFavoris.cover);
            $('.cover').removeClass('rotateVinyle');
        })
        //Ajout d'un écouteur d'événement sur le clic du bouton pour changer de musique
        $('#changeTrack').on('click', function(){
            location.reload(true);
        });
    }
    //Sinon : il n'a pas de favoris
    else {
        $('.randomFavoris').css('display', 'none');
    }

});