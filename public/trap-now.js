jQuery(function($) {
  $(document)
    .on('shown.bs.modal', function(event) {
      var modal = event.target;
      $(document)
        .off('focusin.bs.modal') // remove bootstrap default focus-trap behavior
        .on('focusin.bs.modal', $.proxy(function (e) {
          var $modal = jQuery(this);
          const targetIsModal = $modal[0] === e.target;
          const modalContainsTarget = $modal.has(e.target).length > 0;
          const targetIsSouthernBoundary = e.target.classList.contains('focus-trap-boundary-south');
          const modalContainsRelatedTarget = e.relatedTarget && $modal.has(e.relatedTarget).length > 0;

          if (!targetIsModal) {
            if (
                !modalContainsTarget || // handle tabbing-back out of modal -- can be specialized to support wrap-around
                (targetIsSouthernBoundary && modalContainsRelatedTarget) // handle attempt to tab out of modal
            ) {
              $modal.trigger('focus')
            }
          }
        }, modal));

    });

  // This isn't really needed because bootstrap modal.js does something similar as part of hide event
  // $(document)
  //   .on('hidden.bs.modal', function(event){
  //     $(document).off('focusin.bs.modal');
  //   });
});