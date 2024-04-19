$(document).ready(function () {
  $("#downloadButton").hide();

  $(".card-form").submit(function (e) {
      e.preventDefault();

      $("#processing").html("<h3>Processing...</h3>");
      $("#downloadButton").hide();

      $.ajax({
          url: "http://localhost:4000/api/v1/crawler",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify({
              keyword: $("#keyword").val(),
              quantity: $("#quantity").val(),
              website: $("#website").val(),
          }),
          success: function (response) {   
              $("#processing").html("<h3>Successful!</h3>");
              $("#downloadButton").show();
              $("#downloadButton").removeClass("d-none");
              $("#downloadLink").attr("href", response.downloadLink);
          },
          error: function (error) {
              $("#processing").html("<h3>An unexpected error occurred. Please try again later.</h3>");
          },
      });
  });
});