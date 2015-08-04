(function() {
  'use strict';

  describe('service $card', function() {
    var $addon, $card;

    beforeEach(module('oj.trelloWebClipper'));
    beforeEach(inject(function(_$addon_, _$card_) {
      $addon = _$addon_;
      $card = _$card_;
    }));

    beforeEach(function() {
      $addon.prefs['desc.template'] = '[{{title}}]({{  url  }})\n\nvia [Trello Web Clipper](https://addons.mozilla.org/en-US/firefox/addon/trello-web-clipper/)';
    });

    it('should be registered', function() {
      expect($card).not.toEqual(null);
    });

    it('should have default position', function() {
      expect($card.position).toEqual('bottom');
    });

    describe('fromTab function', function() {
      it('should do nothing if there is not any tab', function() {
        $card.fromTab();

        expect($card.name).toBeUndefined();
        expect($card.desc).toBeUndefined();
        expect($card.attachmentUrl).toBeUndefined();
      });

      it('should assign name, description and url', function() {
        $card.fromTab({
          title: 'Google',
          url: 'https://google.com'
        });

        expect($card.name).toEqual('Google');
        expect($card.attachmentUrl).toEqual('https://google.com');
        expect($card.desc).toEqual('[Google](https://google.com)\n\nvia [Trello Web Clipper](https://addons.mozilla.org/en-US/firefox/addon/trello-web-clipper/)');
      });
    });
  });
})();
