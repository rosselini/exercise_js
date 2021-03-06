var IMAGESPROCESSING = IMAGESPROCESSING || {};

IMAGESPROCESSING = (function() {
    // Settings app
    var settings = {
        // Set width images
        width: 150,
        // Set height images
        height: 150
    };

    // Stop 
    var _stop = function(event) {
        // Method stops the bubbling of an event to parent elements
        event.stopPropagation();
        // Method stops the default action
        event.preventDefault();
    };

    // Method drag
    var _handleDragOver = function(event) {
        _stop(event);
    };

    // Method drop
    var _handleDropOver = function(idList, event) {
        _stop(event);

        var files         = event.dataTransfer.files,       // Get list drag file 
            reader,                                          /* This object provide functionality upload files method dra and drop.
                                                                This object allow in asynchronus read files. */
            objectFiles,                                      // List object file
            img;
            containerList = document.getElementById(idList); // Container for a list images

        // converts arguments into an array
        objectToArray = Array.prototype.slice.apply(files);

        objectToArray.forEach(function(entry) {
            reader = new FileReader();

            reader.onload = _thumbnail.bind(this);
            // Create object img and set src content get for FileReader
            reader.readAsDataURL(entry);
        });
    };

    var _thumbnail = function(e) {
        console.log(e)
        var canvas = document.createElement('canvas'), // Create new element canvas
            img    = new Image(),    // Create ne element img
            ctx,                                       // Define drawing mode on canvas
            dataUrl,                                   // Create drop content canvas and save. Finnaly we get url
            newImage = document.createElement('img'),  // Create new element image
            link = document.createElement('a'),        // Create new element a
            scale,
            newWidth,
            newHeight;

        img.src = e.target.result;
        
        /* Append attribut in link */
        link.href = img.src;
        /* Create image */
        canvas.width  = settings.width;  // Append width in object canvas
        canvas.height = settings.height; // Append height in objct canvas
        ctx           = canvas.getContext('2d');

        // scale save proportion
        if(img.width > img.height) {
            scale = img.width / img.height;
            newWidth = canvas.height * f;

            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, newWidth, canvas.height);
        } else {
            scale = img.height / img.width;
            newHeight = canvas.width * f;

            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, newHeight);
        }
        //ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Get image and draw canvas
        dataUrl       = canvas.toDataURL();
        newImage.src  = dataUrl; // assign dataUrl to attribute src new image

        link.appendChild(newImage);      // Append element newImage to link
        containerList.appendChild(link); // Append node end of list child
     };

    return {
        initialize: function(idDrop, idList) {
            var drop = document.getElementById(idDrop);

            /* This elements catch event dragover and drop
               Event dragover ocurs when user drags file over the element.
               Event drop ocurs when user drop file on the element.
            */
            drop.addEventListener('dragover', _handleDragOver, false);
            drop.addEventListener('drop', _handleDropOver.bind(this, idList), false);
        }
    };
})();

IMAGESPROCESSING.initialize('drop_file', 'list');