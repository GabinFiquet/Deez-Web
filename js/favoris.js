$(function() {
    let storageJSON = localStorage.getItem("DeezWebFavoris");
        favorisList = storageJSON ? JSON.parse(storageJSON) : storageJSON;

    for (let i=0; i< favorisList.length; i++){
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

        $(`#buttonFav${i}`).on('click', idFavoris, function(event){
            favorisList = favorisList.filter(idFavoris => idFavoris.id !== event.data);
            localStorage.setItem("DeezWebFavoris", JSON.stringify(favorisList));

            $(`#card${i}`).addClass('bounceOut');
            setTimeout(function() {
                $(`#card${i}`).remove()
            }, 1000);
        });
    };
    
});