(function() {
  'use strict';

  describe('service $template', function() {
    var $template, page;

    beforeEach(function() {
      page = {
        title: 'Google',
        url: 'https://google.com'
      };
    });

    beforeEach(module('twc'));
    beforeEach(inject(function(_$template_) {
      $template = _$template_;
    }));

    describe('when render', function() {
      describe('on error', function() {
        it('should use default template', function() {
          expect($template.render('{{ error }}', {
            page: page
          })).toContain('[Google](https://google.com)\n\nvia [Web Clipper for Trello](https://github.com/oskarjakiela/trello-web-clipper)');
        });

        it('should add error details to description', function() {
          expect($template.render('{{ error }}', {
            page: page
          })).toContain('**Error**\nReferenceError: Can\'t find variable: error');
        });
      });
    });
  });
})();
