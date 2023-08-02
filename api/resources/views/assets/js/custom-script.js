$(document).ready(function(){

  $('#item-select-all').on('click', function () {
    if ($(this).is(":checked")) {
      $('.checkbox').prop('checked', true);
    } else {
      $('.checkbox').prop('checked', false);
      // $('#action, #apply').prop('disabled', true);
    }
  });


  $('#action').on('change', function() {
    var value = $(this).val();

    var ids = [];
    var action = $('#action').val();
    var currentToken = $('meta[name="csrf-token"]').attr('content');
    var url = $(this).data('url');
    var errorBlock = $('.bulk-action-error');

    if(value === 'send_email') {
      if(action === '') {
        errorBlock.text('Please select any action from dropdown')
        errorBlock.css('display', 'block')
        return false
      } else {

        $('.checkbox').each(function () {
          if ($(this).is(":checked")) {
            ids.push($(this).val());
          }
        });

        if (ids.length === 0) {
          errorBlock.text('Please Select any record to apply action')
          errorBlock.css('display', 'block')
          return false;
        }

        $('#emailModal').modal('show')

        $('#users_ids_field').val(ids)
      }

    }
  })

  //Apply an action to the Users Table
  $('#apply').on('click', function () {

    var ids = [];
    var action = $('#action').val();
    var currentToken = $('meta[name="csrf-token"]').attr('content');
    var url = $(this).data('url');

    var errorBlock = $('.bulk-action-error');
    if ( action === "") {
      errorBlock.text('Please select any action')
      errorBlock.css('display', 'block')
      // alert("Please select any action");
      return false;
    } else if(action === 'send_email') {
      return false;
    }


    $('.checkbox').each(function () {
      if ($(this).is(":checked")) {
        ids.push($(this).val());
      }
    });

    if (ids.length === 0) {
      errorBlock.text('Nothing is selected.')
      errorBlock.css('display', 'block')
      return false;
    }

    $.ajax({
      type: "POST",

      data: {action: action, ids: ids, _token: currentToken},
      url: url,
      success: function (response) {
        console.log(response);
        if (response.status) {
          window.location.href = response.redirectTo;
        } else {
          errorBlock.text('Something went wrong, Please try again.')
          errorBlock.css('display', 'block')
        }
      }
    });
  });

  // $('form#sendBulkEmails').submit(function(e) {
  //
  //     const editorData = editor.getData();
  //     console.log(editorData)
  //     if( !editorData ) {
  //         alert( 'Please enter a message' );
  //         e.preventDefault();
  //     }
  //
  //
  // })

  let editor;

  ClassicEditor
      .create( document.querySelector( '#editor' ) )
  then(newEditor => {
    editor = newEditor
  })
      .catch( error => {
        console.error( error );
      } );

})
