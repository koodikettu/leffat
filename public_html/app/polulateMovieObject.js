function populateMovieObject(movie, a) {
    movie.id = a.find("ID").text();
    movie.dttmShowStart = a.find("dttmShowStart").text();
    movie.dttmShowEnd = a.find("dttmShowEnd").text();
    movie.eventId = a.find("EventId").text();
    movie.title = a.find("Title").text();
    movie.originalTitle = a.find("OriginalTitle").text();

    movie.productionYear = a.find("ProductionYear").text();
    movie.lengthInMinutes = a.find("LengthInMinutes").text();
    movie.dtLocalRelease = a.find("dtLocalRelease").text();
    movie.rating = a.find("Rating").text();
    movie.ratingLabel = a.find("RatingLabel").text();
    movie.ratingImageUrl = a.find("RatingImageUrl").text();

    movie.eventType = a.find("EventType").text();
    movie.genres = a.find("Genres").text();
    movie.theatreID = a.find("TheatreID").text();
    movie.theatreAuditriumID = a.find("TheatreAuditriumID").text();
    movie.theatre = a.find("Theatre").text();
    movie.theatreAuditorium = a.find("TheatreAuditorium").text();

    movie.theatreAndAuditorium = a.find("TheatreAndAuditorium").text();
    movie.presentationMethodAndLanguage = a.find("PresentationMethodAndLanguage").text();
    movie.presentationMethod = a.find("PresentationMethod").text();
    movie.eventSeries = a.find("EventSeries").text();
    movie.showURL = a.find("ShowURL").text();
    movie.eventURL = a.find("EventURL").text();

    movie.portraitImage = a.find("Images").find("EventLargeImagePortrait").text();
    movie.landscapeImage = a.find("Images").find("EventLargeImageLandscape").text();
    movie.contentDescriptors = [];
    a.find("ContentDescriptor").each(function () {
        b = $(this);
        var contentDescriptor = {};
        contentDescriptor.name = b.find("Name").text();
        contentDescriptor.imageUrl = b.find("ImageURL").text();
        movie.contentDescriptors.push(contentDescriptor);
    });

}


