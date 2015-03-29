$(document).ready(function () {
  var HeaderView = Backbone.View.extend({
    template: Handlebars.templates.header,
    initialize: function () {
      this.render();
    },
    render: function () {
      $("body").prepend(this.template({}));
      return this;
    }
  });

  var MenuButtonView = Backbone.View.extend({
    tagName: "li",
    className: function () {
      return this.model.className;
    },
    template: Handlebars.templates.menuButton,
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html(this.template(this.model));
      if (this.model.collection) {
        var menuButtonList = new MenuButtonList({
          model: this.model.model,
          collection: this.model.collection
        });
        this.$el.append(menuButtonList.$el);
      }
      return this;
    }
  });
  var MenuButtonList = Backbone.View.extend({
    tagName: "ul",
    className: function () {
      return this.model.listClass;
    },
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html();
      _.each(this.collection, function (buttonModel, index, list) {
        var dashBoardMenu = new MenuButtonView({model: buttonModel});
        this.$el.append(dashBoardMenu.$el);
      }, this);
      return this;
    }
  });
  var menuButtonList = new MenuButtonList({
    model: {
      listClass: "nav nav-pills nav-stacked main-menu"
    },
    collection: [
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#dashboard",
        iconClass: "glyphicon glyphicon-home",
        label: "Dashboard"
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#ui",
        iconClass: "glyphicon glyphicon-eye-open",
        label: "UI Features"
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#form",
        iconClass: "glyphicon glyphicon-edit",
        label: "Forms"
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#chart",
        iconClass: "glyphicon glyphicon-list-alt",
        label: "Charts"
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#typography",
        iconClass: "glyphicon glyphicon-font",
        label: "Typography"
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#gallery",
        iconClass: "glyphicon glyphicon-picture",
        label: "Gallery"
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#table",
        iconClass: "glyphicon glyphicon-align-justify",
        label: "Tables"
      },
      {
        className: "accordion",
        label: "Accordion Menu",
        hyperlink: "#",
        iconClass: "glyphicon glyphicon-plus",
        model: {
          listClass: "nav nav-pills nav-stacked"
        },
        collection: [
          {
            label: "Child Menu 1",
            hyperlink: "#"
          }, {
            label: "Child Menu 2",
            hyperlink: "#"
          }
        ]
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#calendar",
        iconClass: "glyphicon glyphicon-calendar",
        label: "Calendar"
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#grid",
        iconClass: "glyphicon glyphicon-th",
        label: "Grid"
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#tour",
        iconClass: "glyphicon glyphicon-globe",
        label: "Tour"
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#icon",
        iconClass: "glyphicon glyphicon-star",
        label: "Icons"
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#error",
        iconClass: "glyphicon glyphicon-ban-circle",
        label: "Error Page"
      },
      {
        hyperlinkClass: "ajax-link",
        hyperlink: "#login",
        iconClass: "glyphicon glyphicon-lock",
        label: "Login Page"
      }
    ]
  });

  var LeftMenuView = Backbone.View.extend({
    className: "col-sm-2 col-lg-2",
    template: Handlebars.templates.leftMenu,
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html(this.template({}));
      return this;
    }
  });

  var NoScriptView = Backbone.View.extend({
    tagName: "noscript",
    template: Handlebars.templates.noscript,
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });
  var ContentView = Backbone.View.extend({
    tagName: "div",
    id: "content",
    className: "col-lg-10 col-sm-10",
    //template: Handlebars.templates.content,
    initialize: function () {
      this.render();
      this.listenTo(this.model, "change", this.render);
    },
    render: function () {
      if(this.template)this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    switchContent: function(a, b){
      this.template = b;
      this.render();
    }
  });
  var ModalView = Backbone.View.extend({
    tagName: "div",
    id: "myModal",
    className: "modal fade",
    attributes: {
      "tabindex": "-1",
      role: "dialog",
      "aria-labelledby": "myModalLabel",
      "aria-hidden": "true"
    },
    template: Handlebars.templates.modal_dialog,
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  var FooterView = Backbone.View.extend({
    tagName: "footer",
    className: "row",
    template: Handlebars.templates.footer,
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html(this.template({}));
      return this;
    }
  });
  var ContainerView = Backbone.View.extend({
    initialize: function (options) {
      this.options = options;
      this.render();
    },
    render: function () {
      _.each(this.options.children1, function (element) {
        this.$el.append(element.$el);
      }, this);
      return this;
    }
  });
  var leftMenuView = new LeftMenuView({});
  leftMenuView.$("div.nav-canvas").prepend(menuButtonList.$el);
  var noScriptView = new NoScriptView({});
  var a = new Backbone.Model();
  a.set("template", Handlebars.templates.content);
  a.set("label","Dashboard");
  var contentView = new ContentView({model: a});

  var row = new ContainerView({
    tagName: "div",
    className: "row",
    children1: [leftMenuView, noScriptView, contentView]
  });
  var hr = new ContainerView({tagName: "hr"});
  var modal = new ModalView({});
  var footer = new FooterView({});

  var ch_container = new ContainerView({
    className: "ch-container",
    children1: [row, hr, modal, footer]
  });

  $("body").prepend(ch_container.$el);
  var headerView = new HeaderView({});

  var acriveButton= function(){
    $('ul.main-menu li').removeClass("active");
    $('ul.main-menu li a').each(function () {
      if ($($(this))[0].href == String(window.location))
        $(this).parent().addClass('active');
    });
  };
  var router = new CharismaRouter();
  /*router.on("route:dashboard", function (a,b) {
    console.log("this is method on dashboard template");
    contentView.switchContent({label:"DashBoard"},Handlebars.templates.content);
    acriveButton();
  }, $("#content"));
  router.on("route:ui", function () {
    console.log("this is method on ui template");
    contentView.switchContent({label:"UI"},Handlebars.templates.content_ui);
    acriveButton();
  }, contentView);*/
  router.on("route", function (a,b) {
    console.log("this is method on route {");
    console.log(a,b);
    console.log("} this is method on route ");
    var template_index = "content_"+a;
    contentView.switchContent({label:"DashBoard"},Handlebars.templates[template_index]);
    acriveButton();
  }, $("#content"));
  Backbone.history.start();


  //themes, change CSS with JS
  //default theme(CSS) is cerulean, change it if needed
  var defaultTheme = 'cerulean';

  var currentTheme = $.cookie('currentTheme') == null ? defaultTheme : $.cookie('currentTheme');
  var msie = navigator.userAgent.match(/msie/i);
  $.browser = {};
  $.browser.msie = {};
  switchTheme(currentTheme);

  $('.navbar-toggle').click(function (e) {
    e.preventDefault();
    $('.nav-sm').html($('.navbar-collapse').html());
    $('.sidebar-nav').toggleClass('active');
    $(this).toggleClass('active');
  });

  var $sidebarNav = $('.sidebar-nav');

  // Hide responsive navbar on clicking outside
  $(document).mouseup(function (e) {
    if (!$sidebarNav.is(e.target) // if the target of the click isn't the container...
      && $sidebarNav.has(e.target).length === 0
      && !$('.navbar-toggle').is(e.target)
      && $('.navbar-toggle').has(e.target).length === 0
      && $sidebarNav.hasClass('active')
    )// ... nor a descendant of the container
    {
      e.stopPropagation();
      $('.navbar-toggle').click();
    }
  });


  $('#themes a').click(function (e) {
    e.preventDefault();
    currentTheme = $(this).attr('data-value');
    $.cookie('currentTheme', currentTheme, {expires: 365});
    switchTheme(currentTheme);
  });


  function switchTheme(themeName) {
    if (themeName == 'classic') {
      $('#bs-css').attr('href', 'bower_components/bootstrap/dist/css/bootstrap.min.css');
    } else {
      $('#bs-css').attr('href', 'css/bootstrap-' + themeName + '.min.css');
    }

    $('#themes i').removeClass('glyphicon glyphicon-ok whitespace').addClass('whitespace');
    $('#themes a[data-value=' + themeName + ']').find('i').removeClass('whitespace').addClass('glyphicon glyphicon-ok');
  }

  //ajax menu checkbox
  $('#is-ajax').click(function (e) {
    $.cookie('is-ajax', $(this).prop('checked'), {expires: 365});
  });
  $('#is-ajax').prop('checked', $.cookie('is-ajax') === 'true' ? true : false);

  //disbaling some functions for Internet Explorer
  if (msie) {
    $('#is-ajax').prop('checked', false);
    $('#for-is-ajax').hide();
    $('#toggle-fullscreen').hide();
    $('.login-box').find('.input-large').removeClass('span10');

  }


  //highlight current / active link
  $('ul.main-menu li a').each(function () {
    if ($($(this))[0].href == String(window.location))
      $(this).parent().addClass('active');
  });
  /*
   //establish history variables
   var
   History = window.History, // Note: We are using a capital H instead of a lower h
   State = History.getState(),
   $log = $('#log');

   //bind to State Change
   History.Adapter.bind(window, 'statechange', function () { // Note: We are using statechange instead of popstate
   var State = History.getState(); // Note: We are using History.getState() instead of event.state
   $.ajax({
   url: State.url,
   success: function (msg) {
   $('#content').html($(msg).find('#content').html());
   $('#loading').remove();
   $('#content').fadeIn();
   var newTitle = $(msg).filter('title').text();
   $('title').text(newTitle);
   docReady();
   }
   });
   });

   //ajaxify menus
   $('a.ajax-link').click(function (e) {
   if (msie) e.which = 1;
   if (e.which != 1 || !$('#is-ajax').prop('checked') || $(this).parent().hasClass('active')) return;
   e.preventDefault();
   $('.sidebar-nav').removeClass('active');
   $('.navbar-toggle').removeClass('active');
   $('#loading').remove();
   $('#content').fadeOut().parent().append('<div id="loading" class="center">Loading...<div class="center"></div></div>');
   var $clink = $(this);
   History.pushState(null, null, $clink.attr('href'));
   $('ul.main-menu li.active').removeClass('active');
   $clink.parent('li').addClass('active');
   });
   */

  $('.accordion > a').click(function (e) {
    e.preventDefault();
    var $ul = $(this).siblings('ul');
    var $li = $(this).parent();
    if ($ul.is(':visible')) $li.removeClass('active');
    else                    $li.addClass('active');
    $ul.slideToggle();
  });

  $('.accordion li.active:first').parents('ul').slideDown();


  //other things to do on document ready, separated for ajax calls
  docReady();
});


function docReady() {
  //prevent # links from moving to top
  $('a[href="#"][data-top!=true]').click(function (e) {
    e.preventDefault();
  });

  //notifications
  $('.noty').click(function (e) {
    e.preventDefault();
    var options = $.parseJSON($(this).attr('data-noty-options'));
    noty(options);
  });

  //chosen - improves select
  $('[data-rel="chosen"],[rel="chosen"]').chosen();

  //tabs
  $('#myTab a:first').tab('show');
  $('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });


  //tooltip
  $('[data-toggle="tooltip"]').tooltip();

  //auto grow textarea
  $('textarea.autogrow').autogrow();

  //popover
  $('[data-toggle="popover"]').popover();

  //iOS / iPhone style toggle switch
  $('.iphone-toggle').iphoneStyle();

  //star rating
  $('.raty').raty({
    score: 4 //default stars
  });

  //uploadify - multiple uploads
  $('#file_upload').uploadify({
    'swf': 'misc/uploadify.swf',
    'uploader': 'misc/uploadify.php'
    // Put your options here
  });

  //gallery controls container animation
  $('ul.gallery li').hover(function () {
    $('img', this).fadeToggle(1000);
    $(this).find('.gallery-controls').remove();
    $(this).append('<div class="well gallery-controls">' +
    '<p><a href="#" class="gallery-edit btn"><i class="glyphicon glyphicon-edit"></i></a> <a href="#" class="gallery-delete btn"><i class="glyphicon glyphicon-remove"></i></a></p>' +
    '</div>');
    $(this).find('.gallery-controls').stop().animate({'margin-top': '-1'}, 400);
  }, function () {
    $('img', this).fadeToggle(1000);
    $(this).find('.gallery-controls').stop().animate({'margin-top': '-30'}, 200, function () {
      $(this).remove();
    });
  });


  //gallery image controls example
  //gallery delete
  $('.thumbnails').on('click', '.gallery-delete', function (e) {
    e.preventDefault();
    //get image id
    //alert($(this).parents('.thumbnail').attr('id'));
    $(this).parents('.thumbnail').fadeOut();
  });
  //gallery edit
  $('.thumbnails').on('click', '.gallery-edit', function (e) {
    e.preventDefault();
    //get image id
    //alert($(this).parents('.thumbnail').attr('id'));
  });

  //gallery colorbox
  $('.thumbnail a').colorbox({
    rel: 'thumbnail a',
    transition: "elastic",
    maxWidth: "95%",
    maxHeight: "95%",
    slideshow: true
  });

  //gallery fullscreen
  $('#toggle-fullscreen').button().click(function () {
    var button = $(this), root = document.documentElement;
    if (!button.hasClass('active')) {
      $('#thumbnails').addClass('modal-fullscreen');
      if (root.webkitRequestFullScreen) {
        root.webkitRequestFullScreen(
          window.Element.ALLOW_KEYBOARD_INPUT
        );
      } else if (root.mozRequestFullScreen) {
        root.mozRequestFullScreen();
      }
    } else {
      $('#thumbnails').removeClass('modal-fullscreen');
      (document.webkitCancelFullScreen ||
      document.mozCancelFullScreen ||
      $.noop).apply(document);
    }
  });

  //tour
  if ($('.tour').length && typeof(tour) == 'undefined') {
    var tour = new Tour();
    tour.addStep({
      element: "#content", /* html element next to which the step popover should be shown */
      placement: "top",
      title: "Custom Tour", /* title of the popover */
      content: "You can create tour like this. Click Next." /* content of the popover */
    });
    tour.addStep({
      element: ".theme-container",
      placement: "left",
      title: "Themes",
      content: "You change your theme from here."
    });
    tour.addStep({
      element: "ul.main-menu a:first",
      title: "Dashboard",
      content: "This is your dashboard from here you will find highlights."
    });
    tour.addStep({
      element: "#for-is-ajax",
      title: "Ajax",
      content: "You can change if pages load with Ajax or not."
    });
    tour.addStep({
      element: ".top-nav a:first",
      placement: "bottom",
      title: "Visit Site",
      content: "Visit your front end from here."
    });

    tour.restart();
  }

  //datatable
  $('.datatable').dataTable({
    "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'i><'col-md-12 center-block'p>>",
    "sPaginationType": "bootstrap",
    "oLanguage": {
      "sLengthMenu": "_MENU_ records per page"
    }
  });
  $('.btn-close').click(function (e) {
    e.preventDefault();
    $(this).parent().parent().parent().fadeOut();
  });
  $('.btn-minimize').click(function (e) {
    e.preventDefault();
    var $target = $(this).parent().parent().next('.box-content');
    if ($target.is(':visible')) $('i', $(this)).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    else                       $('i', $(this)).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    $target.slideToggle();
  });
  $('.btn-setting').click(function (e) {
    e.preventDefault();
    $('#myModal').modal('show');
  });


  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultDate: '2014-06-12',
    events: [
      {
        title: 'All Day Event',
        start: '2014-06-01'
      },
      {
        title: 'Long Event',
        start: '2014-06-07',
        end: '2014-06-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2014-06-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2014-06-16T16:00:00'
      },
      {
        title: 'Meeting',
        start: '2014-06-12T10:30:00',
        end: '2014-06-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2014-06-12T12:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2014-06-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2014-06-28'
      }
    ]
  });

}


//additional functions for data table
$.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
  return {
    "iStart": oSettings._iDisplayStart,
    "iEnd": oSettings.fnDisplayEnd(),
    "iLength": oSettings._iDisplayLength,
    "iTotal": oSettings.fnRecordsTotal(),
    "iFilteredTotal": oSettings.fnRecordsDisplay(),
    "iPage": Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
    "iTotalPages": Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
  };
}
$.extend($.fn.dataTableExt.oPagination, {
  "bootstrap": {
    "fnInit": function (oSettings, nPaging, fnDraw) {
      var oLang = oSettings.oLanguage.oPaginate;
      var fnClickHandler = function (e) {
        e.preventDefault();
        if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
          fnDraw(oSettings);
        }
      };

      $(nPaging).addClass('pagination').append(
        '<ul class="pagination">' +
        '<li class="prev disabled"><a href="#">&larr; ' + oLang.sPrevious + '</a></li>' +
        '<li class="next disabled"><a href="#">' + oLang.sNext + ' &rarr; </a></li>' +
        '</ul>'
      );
      var els = $('a', nPaging);
      $(els[0]).bind('click.DT', {action: "previous"}, fnClickHandler);
      $(els[1]).bind('click.DT', {action: "next"}, fnClickHandler);
    },

    "fnUpdate": function (oSettings, fnDraw) {
      var iListLength = 5;
      var oPaging = oSettings.oInstance.fnPagingInfo();
      var an = oSettings.aanFeatures.p;
      var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

      if (oPaging.iTotalPages < iListLength) {
        iStart = 1;
        iEnd = oPaging.iTotalPages;
      }
      else if (oPaging.iPage <= iHalf) {
        iStart = 1;
        iEnd = iListLength;
      } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
        iStart = oPaging.iTotalPages - iListLength + 1;
        iEnd = oPaging.iTotalPages;
      } else {
        iStart = oPaging.iPage - iHalf + 1;
        iEnd = iStart + iListLength - 1;
      }

      for (i = 0, iLen = an.length; i < iLen; i++) {
        // remove the middle elements
        $('li:gt(0)', an[i]).filter(':not(:last)').remove();

        // add the new list items and their event handlers
        for (j = iStart; j <= iEnd; j++) {
          sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
          $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
            .insertBefore($('li:last', an[i])[0])
            .bind('click', function (e) {
              e.preventDefault();
              oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
              fnDraw(oSettings);
            });
        }

        // add / remove disabled classes from the static elements
        if (oPaging.iPage === 0) {
          $('li:first', an[i]).addClass('disabled');
        } else {
          $('li:first', an[i]).removeClass('disabled');
        }

        if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
          $('li:last', an[i]).addClass('disabled');
        } else {
          $('li:last', an[i]).removeClass('disabled');
        }
      }
    }
  }
});
