$(document).ready(function () {
  //////////////

  function imageExists(url) {
    return new Promise((resolve) => {
      var img = new Image();
      img.src = url;
      img.addEventListener("load", () => resolve(true));
      img.addEventListener("error", () => resolve(false));
    });
  }

  //////////////////////

  const url1 = $("#logo").attr("src");
  imageExists(url1).then((ok) => {
    if (!ok) {
      console.log("there is no logo available.");
    }
  });
  $(".video").click(function (e) {
    e.preventDefault();
    var video_id = e.target.id;
    this.paused ? this.play() : this.pause();
  });

  $("#logo").click(function () {
    $("html, body").animate(
      {
        scrollTop: top,
      },
      100
    );
  });

  $("#projects").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#edu_list_div").offset().top,
      },
      100
    );
  });

  $("#education_link").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#career_div").offset().top,
      },
      100
    );
  });

  $("#aboutMe_link").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#about_ruler").offset().top,
      },
      100
    );
  });

  $("#reference_link").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#skill1").offset().top,
      },
      100
    );
  });
});
