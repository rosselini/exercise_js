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
    var _handleDropOver = function(event) {console.time('timeName');
        _stop(event);

        var files         = event.dataTransfer.files,       // Get list drag file 
            i             = files.length - 1,                // Count drag file
            reader,                                          /* This object provide functionality upload files method dra and drop.
                                                                This object allow in asynchronus read files. */
            arrayFiles,                                      // List object file
            containerList = document.getElementById('list'), // Container for a list images
            img;

        do {
            reader = new FileReader();

            arrayFiles = files[i];

            // Create object after loading page
            reader.onload = (function(file) {
                return function(e) {
                    _thumbnail(e, containerList);
                };
            })(arrayFiles);
            // Create object img and set src content get for FileReader
            reader.readAsDataURL(arrayFiles);

            i--;
        } while(i >= 0);
    };

    var _thumbnail = function(e, containerList) {
        var canvas = document.createElement('canvas'), // Create new element canvas
            img    = document.createElement('img'),    // Create ne element img
            ctx,                                       // Define drawing mode on canvas
            dataUrl,                                   // Create drop content canvas and save. Finnaly we get url
            newImage = document.createElement('img')   // Create new element image
            link = document.createElement('a');        // Create new element a

        img.src = e.target.result;
        
        /* Append attribut in link */
        link.href = img.src;
        /* Create image */
        canvas.width  = settings.width;  // Append width in object canvas
        canvas.height = settings.height; // Append height in objct canvas
        ctx           = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Get image and draw canvas
        dataUrl       = canvas.toDataURL();
        newImage.src  = dataUrl; // assign dataUrl to attribute src new image

        link.appendChild(newImage);      // Append element newImage to link
        containerList.appendChild(link); // Append node end of list child
     }

    return {
        initialize: function() {
            var drop        = document.getElementById(arguments[0]);
                setSettings = settings.idContainerList; // Append argument in object settings

            setSettings = arguments[1];

            /* This elements catch event dragover and drop
               Event dragover ocurs when user drags file over the element.
               Event drop ocurs when user drop file on the element.
            */
            drop.addEventListener('dragover', _handleDragOver, false);
            drop.addEventListener('drop', _handleDropOver, false);
        }
    };
})();

IMAGESPROCESSING.initialize('drop_file', 'list');