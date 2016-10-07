$(document).ready(function() {
  $("#btn-all").addClass("all");
  $("#btn-online").removeClass("online");
  $("#btn-offline").removeClass("offline");
  var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "OgamingSC2", "ESL_SC2", "TR7K", "sheevergaming", "brunofin", "comster404"];
  $.each(channels, function() {
    var channel = this;
    $.getJSON('https://api.twitch.tv/kraken/streams/' + this + '?callback=?', function(data) {
      var r = JSON.parse(JSON.stringify(data));
      if (r.stream === null) {
        $.getJSON(r._links.channel + '?callback=?', function(data) {
          var r = JSON.parse(JSON.stringify(data));
          if (r.logo === null) {
            $("#streamers").append(
              "<a href="+r.url+" target='_blank'>"+
              "<div class='streamers-offline'>" +
              "<div class='row'>" +
              "<div class='logo col-md-2 col-lg-2 col-xs-2'>" +
              "<img class='pic' src='http://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F'></img>" +
              "</div>" +
              "<div class='name col-md-4 col-lg-4 col-xs-4'>" + r.display_name + "</div>" +
              "<div class='status col-md-6 col-lg-6 col-xs-6 text-center'>Offline</div>" +
              "</div>" +
              "</div>" +
              "</a>");
          } else {
            $("#streamers").append(
              "<a href="+r.url+" target='_blank'>" + 
              "<div class='streamers-offline'>" +
              "<div class='row'>" +
              "<div class='logo col-md-2 col-lg-2 col-xs-2'>" +
              "<img class='pic' src='" + r.logo + "'></img>" +
              "</div>" +
              "<div class='name col-md-4 col-lg-4 col-xs-4'>"+ r.display_name + "</div>" +
              "<div class='status col-md-6 col-lg-6 col-xs-6 text-center'>Offline</div>" +
              "</div>" +
              "</div>" +
              "</a>");
          }
        });
      } else if (r.error === "Unprocessable Entity") {
        $("#streamers").append(
          "<a href='https://www.twitch.tv/"+channel+"' target='_blank'>"+
          "<div class='streamers-offline'>" +
          "<div class='row'>" +
          "<div class='logo col-md-2 col-lg-2 col-xs-2'>" +
          "<img class='pic' src='http://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F'></img>" +
          "</div>" +
          "<div class='name col-md-4 col-lg-4 col-xs-4'>"  + channel +"</div>"+
          "<div class='status col-md-6 col-lg-6 col-xs-6 text-center'>Account Closed</div>" +
          "</div>" +
          "</div>" +
          "</a>");
      } else {
        $.getJSON(r._links.channel + '?callback=?', function(data) {
          var r = JSON.parse(JSON.stringify(data));
          var status = r.status;
          if (status.length > 40) {
            status = status.substring(0, 35) + "...";
          }
          if (r.logo === null) {
            $("#streamers").prepend(
              "<a href="+r.url+" target='_blank'>" +
              "<div class='streamers-online'>" +
              "<div class='row'>" +
              "<div class='logo col-md-2 col-lg-2 col-xs-2'>" +
              "<img class='pic' src='" + r.logo + "'></img>" +
              "</div>" +
              "<div class='name col-md-4 col-lg-4 col-xs-4'>" + r.display_name + "</div>" +
              "<div class='status col-md-6 col-lg-6 col-xs-6 text-center'>" + status + "</div>" +
              "</div>" +
              "</div>" +
              "</a>");
          } else {
            $("#streamers").prepend(
              "<a href="+r.url+" target='_blank'>"+
              "<div class='streamers-online'>" +
              "<div class='row'>" +
              "<div class='logo col-md-2 col-lg-2 col-xs-2'>" +
              "<img class='pic' src='" + r.logo + "'></img>" +
              "</div>" +
              "<div class='name col-md-4 col-lg-4 col-xs-4'>" + r.display_name + "</div>" +
              "<div class='status col-md-6 col-lg-6 col-xs-6 text-center'>" + status + "</div>" +
              "</div>" +
              "</div>" +
              "</a>");
          }
        });
      }
    });
  });
  $("#btn-all").on("click", function() {
    $("#streamers").focus();
    $("#btn-all").addClass("all");
    $("#btn-online").removeClass("online");
    $("#btn-offline").removeClass("offline");
    $(".streamers-online").show();
    $(".streamers-offline").show();
    $("body").animate({
      backgroundColor: "#5C5457",
    }, 500);
    $(".title h1").animate({
      backgroundColor: "#5C5457",
      color: "white",
    }, 500);
  });
  $("#btn-online").on("click", function() {
    $("#streamers").focus();
    $("#btn-all").removeClass("all");
    $("#btn-online").addClass("online");
    $("#btn-offline").removeClass("offline");
    $(".streamers-online").show();
    $(".streamers-offline").hide();
    $("body").animate({
      backgroundColor: "#B8CCA6",
    }, 500);
    $(".title h1").animate({
      backgroundColor: "#B8CCA6",
      color: "black",
    }, 500);
  });
  $("#btn-offline").on("click", function() {
    $("#streamers").focus();
    $("#btn-all").removeClass("all");
    $("#btn-online").removeClass("online");
    $("#btn-offline").addClass("offline");
    $(".streamers-online").hide();
    $(".streamers-offline").show();
    $("body").animate({
      backgroundColor: "#4A5E82",
    }, 500);
    $(".title h1").animate({
      backgroundColor: "#4A5E82",
      color: "white",
    }, 500);
  });
});