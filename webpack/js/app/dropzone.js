/*=========================================================================================
    File Name: dropzone.js
    Description: dropzone
    --------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

Dropzone.options.dpzSingleFile = {
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 1,
    init: function() {
        this.on("maxfilesexceeded", function(file) {
            this.removeAllFiles();
            this.addFile(file);
        });
    }
};

/********************************************
*               Multiple Files              *
********************************************/
Dropzone.options.dpzMultipleFiles = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 0.5, // MB
    clickable: true
}


Dropzone.options.steatmentfiles = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 5, // MB
    clickable: true,
    // autoProcessQueue: false,
		init: function () {
			this.on("sending", async function (file, xhr, formData) {
          //  formData.append("comment", "my comment");


          // var SessionStore = new Store('erp-db', 'session')
          var companyid = await  get('sessionid', SessionStore).then( result => {
                if (result !== undefined) {
                  var session = JSON.parse(result);
                  console.log(session.companyid);
                  return session.companyid
                } else {
                  console.log("no");
                  return ""
                }
              });
            var token = await gettoken();
            var type = $("#sttype").val();
            var typeid = $('#sttypeelement').val();
            var year = $("#year").val();
            var month = $("#stmonth").val();
            uploadsteatment(file, formData, companyid, type, typeid, year, month, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})


        });
		},
}

Dropzone.options.avatarfiles = {
  //  paramName: "logo", // The name that will be used to transfer the file
    axFilesize: 2, // MB
  //  clickable: true,
  //  autoProcessQueue: false,
     //addRemoveLinks: true,
    //previewsContainer: '#avatarpreview',
        acceptedFiles: 'image/*',
    maxFiles: 1,
    transformFile: function(file, done) {

		var myDropZone = this;

		// Create the image editor overlay
		var editor = document.createElement('div');
		editor.style.position = 'fixed';
		editor.style.left = 0;
		editor.style.right = 0;
		editor.style.top = 0;
		editor.style.bottom = 0;
		editor.style.zIndex = 9999;
		editor.style.backgroundColor = '#000';

		// Create the confirm button
		var confirm = document.createElement('button');
		confirm.style.position = 'absolute';
		confirm.style.left = '10px';
		confirm.style.top = '10px';
		confirm.style.zIndex = 9999;
		confirm.textContent = 'Confirm';
		confirm.addEventListener('click', function() {

			// Get the canvas with image data from Cropper.js
			var canvas = cropper.getCroppedCanvas({
				width: 256,
				height: 256
			});

			// Turn the canvas into a Blob (file object without a name)
			canvas.toBlob(function(blob) {

				// Update the image thumbnail with the new image data
				myDropZone.createThumbnail(
					blob,
					myDropZone.options.thumbnailWidth,
					myDropZone.options.thumbnailHeight,
					myDropZone.options.thumbnailMethod,
					false,
					function(dataURL) {

						// Update the Dropzone file thumbnail
						myDropZone.emit('thumbnail', file, dataURL);

						// Return modified file to dropzone
						done(blob);
					}
				);

			});

			// Remove the editor from view
			editor.parentNode.removeChild(editor);

		});
		editor.appendChild(confirm);

		// Load the image
		var image = new Image();
		image.src = URL.createObjectURL(file);
		editor.appendChild(image);

		// Append the editor to the page
		document.body.appendChild(editor);

		// Create Cropper.js and pass image
		var cropper = new Cropper(image, {
			aspectRatio: 1
		});

	},

    init: function() {



      var myDropzone = this;

        this.on("maxfilesexceeded", function(file) {
            this.removeAllFiles();
            this.addFile(file);
        });

        this.on("sending", async function (file, xhr, formData) {
            //  formData.append("comment", "my comment");

            if ( $('#avasshcl').is(':checked')) {
  						formData.append("logo", "avatarshortlogo");
            } else {
              formData.append("logo", "avatar");
            }
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
              var companyid = urlParams.get('id');
              var token = await gettoken();
              if ($('body').attr("page") == "person") {
                uploadpersonfile(file, formData, companyid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})
              } else {


              uploadcompanyfile(file, formData, companyid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})
  }

          });
    }

}

Dropzone.options.pavatarfiles = {
    axFilesize: 2, // MB
        acceptedFiles: 'image/*',
    maxFiles: 1,
    transformFile: function(file, done) {

		var myDropZone = this;

		// Create the image editor overlay
		var editor = document.createElement('div');
		editor.style.position = 'fixed';
		editor.style.left = 0;
		editor.style.right = 0;
		editor.style.top = 0;
		editor.style.bottom = 0;
		editor.style.zIndex = 9999;
		editor.style.backgroundColor = '#000';

		// Create the confirm button
		var confirm = document.createElement('button');
		confirm.style.position = 'absolute';
		confirm.style.left = '10px';
		confirm.style.top = '10px';
		confirm.style.zIndex = 9999;
		confirm.textContent = 'Confirm';
		confirm.addEventListener('click', function() {

			// Get the canvas with image data from Cropper.js
			var canvas = cropper.getCroppedCanvas({
				width: 256,
				height: 256
			});

			// Turn the canvas into a Blob (file object without a name)
			canvas.toBlob(function(blob) {

				// Update the image thumbnail with the new image data
				myDropZone.createThumbnail(
					blob,
					myDropZone.options.thumbnailWidth,
					myDropZone.options.thumbnailHeight,
					myDropZone.options.thumbnailMethod,
					false,
					function(dataURL) {

						// Update the Dropzone file thumbnail
						myDropZone.emit('thumbnail', file, dataURL);

						// Return modified file to dropzone
						done(blob);
					}
				);

			});

			// Remove the editor from view
			editor.parentNode.removeChild(editor);

		});
		editor.appendChild(confirm);

		// Load the image
		var image = new Image();
		image.src = URL.createObjectURL(file);
		editor.appendChild(image);

		// Append the editor to the page
		document.body.appendChild(editor);

		// Create Cropper.js and pass image
		var cropper = new Cropper(image, {
			aspectRatio: 1
		});

	},

    init: function() {



      var myDropzone = this;

        this.on("maxfilesexceeded", function(file) {
            this.removeAllFiles();
            this.addFile(file);
        });

        this.on("sending", async function (file, xhr, formData) {
          var token = await gettoken();
          if($('#pavatarfiles').attr('name') == "person") {
            formData.append("logo", "avatar");
            var personid =   $('#logocard').attr("name");

              uploadpersonfile(file, formData, personid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})
          } else {
            //  formData.append("comment", "my comment");
            if ( $('#avasshcl').is(':checked')) {
  						formData.append("logo", "avatarshortlogo");
            } else {
              formData.append("logo", "avatar");
            }
              var companyid =   $('#logocard').attr("name");

              uploadcompanyfile(file, formData, companyid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})
}

          });
    }

}

Dropzone.options.sclogofiles = {
  //  paramName: "logo", // The name that will be used to transfer the file
    axFilesize: 2, // MB
    acceptedFiles: 'image/*',
maxFiles: 1,
  //  clickable: true,
  //  autoProcessQueue: false,
     //addRemoveLinks: true,
    //previewsContainer: '#avatarpreview',
        acceptedFiles: 'image/*',
    maxFiles: 1,
    transformFile: function(file, done) {

		var myDropZone = this;

		// Create the image editor overlay
		var editor = document.createElement('div');
		editor.style.position = 'fixed';
		editor.style.left = 0;
		editor.style.right = 0;
		editor.style.top = 0;
		editor.style.bottom = 0;
		editor.style.zIndex = 9999;
		editor.style.backgroundColor = '#000';

		// Create the confirm button
		var confirm = document.createElement('button');
		confirm.style.position = 'absolute';
		confirm.style.left = '10px';
		confirm.style.top = '10px';
		confirm.style.zIndex = 9999;
		confirm.textContent = 'Confirm';
		confirm.addEventListener('click', function() {

			// Get the canvas with image data from Cropper.js
			var canvas = cropper.getCroppedCanvas({
				width: 256,
				height: 256
			});

			// Turn the canvas into a Blob (file object without a name)
			canvas.toBlob(function(blob) {

				// Update the image thumbnail with the new image data
				myDropZone.createThumbnail(
					blob,
					myDropZone.options.thumbnailWidth,
					myDropZone.options.thumbnailHeight,
					myDropZone.options.thumbnailMethod,
					false,
					function(dataURL) {

						// Update the Dropzone file thumbnail
						myDropZone.emit('thumbnail', file, dataURL);

						// Return modified file to dropzone
						done(blob);
					}
				);

			});

			// Remove the editor from view
			editor.parentNode.removeChild(editor);

		});
		editor.appendChild(confirm);

		// Load the image
		var image = new Image();
		image.src = URL.createObjectURL(file);
		editor.appendChild(image);

		// Append the editor to the page
		document.body.appendChild(editor);

		// Create Cropper.js and pass image
		var cropper = new Cropper(image, {
			aspectRatio: 1
		});

	},

    init: function() {



      var myDropzone = this;

        this.on("maxfilesexceeded", function(file) {
            this.removeAllFiles();
            this.addFile(file);
        });

        this.on("sending", async function (file, xhr, formData) {

              if ( $('#sclasavacheckbox').is(':checked')) {
    						formData.append("logo", "avatarshortlogo");
              } else {
                formData.append("logo", "shortlogo");
              }
              var queryString = window.location.search;
              var urlParams = new URLSearchParams(queryString);
                var companyid = urlParams.get('id');

              var token = await gettoken();
              uploadcompanyfile(file, formData, companyid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})
          });
    }

}

Dropzone.options.clogofiles = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 5, // MB
    acceptedFiles: 'image/*',
    maxFiles: 1,
    //clickable: true,
    // autoProcessQueue: false,
		init: function () {
			this.on("sending", async function (file, xhr, formData) {

          if ( $('#avasshclb').is(':checked')) {
            formData.append("logo", "companyinvoicelogo");
          } else {
            formData.append("logo", "companylogo");
          }

          var queryString = window.location.search;
          var urlParams = new URLSearchParams(queryString);
            var companyid = urlParams.get('id');
            var token = await gettoken();
            uploadcompanyfile(file, formData, companyid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})


        });
		},
}

Dropzone.options.invoicefiles = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 5, // MB
    clickable: true,
    //autoProcessQueue: true,
		init: function () {
			this.on("sending", async function (file, xhr, formData) {
          //  formData.append("comment", "my comment");

					formData.append("logo", "invoicelogo");
          var queryString = window.location.search;
          var urlParams = new URLSearchParams(queryString);
            var companyid = urlParams.get('id');
            var token = await gettoken();
            uploadcompanyfile(file, formData, companyid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})


        });
		},
}

Dropzone.options.importinvoice = {
    paramName: "invoice", // The name that will be used to transfer the file
    maxFilesize: 5, // MB
    clickable: true,
    maxFiles: 1,
  //  autoProcessQueue: true,
		init: function () {
			this.on("sending", async function (file, xhr, formData) {
        formData.append("type", "invoice");
      var invoiceid = $('#importinvoice').attr("invoiceid");
      // var SessionStore = new Store('erp-db', 'session')
  companyid = await  get('sessionid', SessionStore).then( result => {

        if (result !== undefined) {
          var session = JSON.parse(result);

          return session.companyid

        }
      });
          var token = await gettoken();
          uploadinvoice(file, formData, invoiceid, companyid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})




        });
		},
}

Dropzone.options.importpayment = {
    paramName: "payment", // The name that will be used to transfer the file
    maxFilesize: 5, // MB
    clickable: true,
    maxFiles: 1,
    //autoProcessQueue: true,
		init: function () {
			this.on("sending", async function (file, xhr, formData) {
        formData.append("type", "receipt");
      var paymentid = $('#importpayment').attr("paymentid");
      if (paymentid == undefined) {
        paymentid = GetUrlParameter("id");
      }
      // var SessionStore = new Store('erp-db', 'session')
  companyid = await  get('sessionid', SessionStore).then( result => {

        if (result !== undefined) {
          var session = JSON.parse(result);

          return session.companyid

        }
      });
          var token = await gettoken();
          uploadipaymentreceipt(file, formData, paymentid, companyid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})




        });
		},
}


Dropzone.options.importincominginvoice = {
    paramName: "invoice", // The name that will be used to transfer the file
    maxFilesize: 5, // MB
    clickable: true,
    maxFiles: 1,
    //autoProcessQueue: true,
		init: function () {
			this.on("sending", async function (file, xhr, formData) {
        formData.append("type", "invoice");
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var invoiceid = urlParams.get('id');
      // var SessionStore = new Store('erp-db', 'session')
  companyid = await  get('sessionid', SessionStore).then( result => {

        if (result !== undefined) {
          var session = JSON.parse(result);

          return session.companyid

        }
      });
          var token = await gettoken();
          uploadincomeinvoice(file, formData, invoiceid, companyid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})




        });
		},
}

Dropzone.options.importagreement = {
    paramName: "agreement", // The name that will be used to transfer the file
    //maxFilesize: 5, // MB
    clickable: true,
    //maxFiles: 1,
    // autoProcessQueue: false,
		init: function () {
			this.on("sending", async function (file, xhr, formData) {
        formData.append("type", "agreement");
      var agreementid = $('#importagreement').attr("agreementid");
      if (agreementid == undefined) {
        agreementid = GetUrlParameter("id");
      }
      // var SessionStore = new Store('erp-db', 'session')
  companyid = await  get('sessionid', SessionStore).then( result => {

        if (result !== undefined) {
          var session = JSON.parse(result);

          return session.companyid

        }
      });
          var token = await gettoken();
          uploadagreementfile(file, formData, companyid, agreementid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})




        });
		},
}

Dropzone.options.incomemailfiles = {
    paramName: "incommail", // The name that will be used to transfer the file
    //maxFilesize: 5, // MB
    clickable: true,
    //maxFiles: 1,
    // autoProcessQueue: false,
		init: function () {
			this.on("sending", async function (file, xhr, formData) {

        formData.append("type", "incoming");
      var mailid = $('#incommailfiles').attr("mailid");
      if (mailid == undefined) {
        mailid = GetUrlParameter("id");
      }
      // var SessionStore = new Store('erp-db', 'session')
  companyid = await  get('sessionid', SessionStore).then( result => {

        if (result !== undefined) {
          var session = JSON.parse(result);

          return session.companyid

        }
      });
          var token = await gettoken();
          uploadmailfile(file, formData, companyid, mailid, "incoming", token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})




        });
		},
}

Dropzone.options.outgoingmailfiles = {
    paramName: "outgoingmail", // The name that will be used to transfer the file
    //maxFilesize: 5, // MB
    clickable: true,
    //maxFiles: 1,
    // autoProcessQueue: false,
		init: function () {
			this.on("sending", async function (file, xhr, formData) {

        formData.append("type", "outgoing");
      var mailid = $('#outgoingmailfiles').attr("mailid");
      if (mailid == undefined) {
        mailid = GetUrlParameter("id");
      }
      // var SessionStore = new Store('erp-db', 'session')
  companyid = await  get('sessionid', SessionStore).then( result => {

        if (result !== undefined) {
          var session = JSON.parse(result);

          return session.companyid

        }
      });
          var token = await gettoken();
          uploadmailfile(file, formData, companyid, mailid, "outgoing", token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})




        });
		},
}

Dropzone.options.mycompanyfiles = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 250, // MB
    clickable: true,
    // autoProcessQueue: false,
		init: function () {
			this.on("sending", async function (file, xhr, formData) {
          //  formData.append("comment", "my comment");
						formData.append("fname", "registry documents");
           formData.append("folder", $('#mycompanyfiles').attr("path"));
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
              var companyid = urlParams.get('id');

            var token = await gettoken();

            if ($('body').attr("page") == "person") {
              uploadpersonfile(file, formData, companyid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})
            } else {
            uploadcompanyfile(file, formData, companyid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})
}

        });
		},
}

Dropzone.options.personfiles = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 250, // MB
    clickable: true,
    // autoProcessQueue: false,
		init: function () {
			this.on("sending", async function (file, xhr, formData) {
          //  formData.append("comment", "my comment");
						formData.append("fname", "files");
            var personid =   $('#filescard').attr("name");
            var token = await gettoken();
            uploadpersonfile(file, formData, personid, token).done(function(resp){console.log(resp)}).fail(function(resp){failedanswer(resp)})


        });
		},
}


/********************************************************
*               Use Button To Select Files              *
********************************************************/
new Dropzone(document.body, { // Make the whole body a dropzone
    url: "#", // Set the url
  //  previewsContainer: "#dpz-btn-select-files", // Define the container to display the previews
  //  clickable: "#select-files" // Define the element that should be used as click trigger to select files.
});


/****************************************************************
*               Limit File Size and No. Of Files                *
****************************************************************/
Dropzone.options.dpzFileLimits = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 0.5, // MB
    maxFiles: 5,
    maxThumbnailFilesize: 1, // MB
}


/********************************************
*               Accepted Files              *
********************************************/
Dropzone.options.dpAcceptFiles = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 1, // MB
    acceptedFiles: 'image/*'
}


/************************************************
*               Remove Thumbnail                *
************************************************/
Dropzone.options.dpzRemoveThumb = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 1, // MB
    addRemoveLinks: true,
    dictRemoveFile: " Trash"
}

/*****************************************************
*               Remove All Thumbnails                *
*****************************************************/
Dropzone.options.dpzRemoveAllThumb = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 1, // MB
    init: function() {

        // Using a closure.
        var _this = this;

        // Setup the observer for the button.
        $("#clear-dropzone").on("click", function() {
            // Using "_this" here, because "this" doesn't point to the dropzone anymore
            _this.removeAllFiles();
            // If you want to cancel uploads as well, you
            // could also call _this.removeAllFiles(true);
        });
    }
}
