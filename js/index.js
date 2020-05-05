$(function() {
    let storage = localStorage.getItem('DeezWebFavoris');
    let favorisList = storage ? JSON.parse(storage) : storage;

    if (favorisList && favorisList.length > 0){
        let randomFavoris = Math.floor(Math.random() * favorisList.length);
        selectedFavoris = favorisList[randomFavoris];

        $('.title').append(selectedFavoris.title);
        $('.artist').append(selectedFavoris.artist);
        $('.album').append(selectedFavoris.album);
        $('.cover').attr('src', selectedFavoris.cover);
        $('.player').attr('src', selectedFavoris.player);

        $('.removeFav').on('click', selectedFavoris.id, function(event){
            favorisList = favorisList.filter(selectedFavoris => selectedFavoris.id !== event.data);
            localStorage.setItem("favoris", JSON.stringify(favorisList));
                
            location.reload(true);
           
        });

        $('#changeTrack').on('click', function(){    
            location.reload(true);
        });
    }else {
        $('.randomFavoris').css('display', 'none');
    }

});