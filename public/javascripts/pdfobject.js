function pdfViewer(){
  var currentPdf = 0;
  $("#pdfViewer")[0].src = $("#pdfList li a")[0];
  //$("#pdfViewer")[0].play();
  $("#pdfList li a").click(function(e){
     e.preventDefault(); 
     $("#pdfViewer")[0].src = this;
     //$("#pdfViewer")[0].play();
     $("#pdfList li").removeClass("current-pdf");
      currentPdf = $(this).parent().index();
      $(this).parent().addClass("current-pdf");
  });
          
  $("#pdfViewer")[0].addEventListener("ended", function(){
     currentPdf++;
      if(currentPdf == $("#pdfList li a").length)
          currentPdf = 0;
      $("#playlist li").removeClass("current-pdf");
      $("#playlist li:eq("+currentPdf+")").addClass("current-pdf");
      $("#pdfViewer")[0].src = $("#pdfList li a")[currentPdf].href;
      //$("#pdfViewer")[0].play();
  });
}

pdfViewer();