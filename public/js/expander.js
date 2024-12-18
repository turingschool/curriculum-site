$('.dropdown > h3').each(function(idx, title) {
  const titleText = $(title).text();
  $(title).replaceWith(`<h3><img class="expander-arrow" src="/assets/images/arrow.svg" alt="expander arrow" /> ${titleText}</h3>`);
});

$('.dropdown > h3').nextAll().hide();

$('.dropdown > h3').on('click', function() {
  let arrowEl = $(this).find('img.expander-arrow');
  
  if (!arrowEl.hasClass('expanded')) {
    arrowEl.addClass('expanded');
    arrowEl.parent('h3').nextAll().show(150);
  } else {
    arrowEl.removeClass('expanded');
    arrowEl.parent('h3').nextAll().hide(150);
  }
});

$('.dropdown > .dropdown-header').each(function(idx, title) {
  const titleText = $(title).text();
  $(title).replaceWith(`<p class='dropdown-header'><img class="expander-arrow" src="/assets/images/arrow.svg" alt="expander arrow" /> ${titleText}</p>`);
});

$('.dropdown > .dropdown-header').nextAll().hide();

$('.dropdown > .dropdown-header').on('click', function() {
  let arrowEl = $(this).find('img.expander-arrow');
  
  if (!arrowEl.hasClass('expanded')) {
    arrowEl.addClass('expanded');
    arrowEl.parent('.dropdown-header').nextAll().show(150);
  } else {
    arrowEl.removeClass('expanded');
    arrowEl.parent('.dropdown-header').nextAll().hide(150);
  }
});