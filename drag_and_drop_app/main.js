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
    var _handleDropOver = function(event) {
        _stop(event);

        var files         = event.dataTransfer.files,       // Get list drag file 
            i             = files.length - 1,                // Count drag file
            reader        = undefined,                       /* This object provide functionality upload files method dra and drop.
                                                                This object allow in asynchronus read files. */
            arrayFiles    = undefined,                       // List object file
            containerList = document.getElementById('list'), // Container for a list images
            img;

        do {
            reader = new FileReader();

            arrayFiles = files[i];

            // Create object after loading page
            reader.onload = (function(file) {
                return function(e) {
                    // Create element img
                    img        = document.createElement("img");
                    // Append src in object img 
                    img.src    = e.target.result;
                    // Append width in object img
                    img.width  = settings.width;
                    // Append height in object img
                    img.height = settings.height;
                    // Append node end of list child
                    containerList.appendChild(img);
                };
            })(arrayFiles);
            // Create object img and set src content get for FileReader
            reader.readAsDataURL(arrayFiles);

            i -= 1;
        } while(i >= 0);
    };

    return {
        initialize: function(id) {
            var drop = document.getElementById(id);

            /* This elements catch event dragover and drop
               Event dragover ocurs when user drags file over the element.
               Event drop ocurs when user drop file on the element.
            */
            drop.addEventListener('dragover', _handleDragOver, false);
            drop.addEventListener('drop', _handleDropOver, false);
        }
    };
})();

IMAGESPROCESSING.initialize('drop_file');