(function() {
  'use strict';

  describe('service $card', function() {
    var $card;

    beforeEach(module('twc'));
    beforeEach(inject(function(_$card_) {
      $card = _$card_;
    }));

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
        expect($card.desc).toEqual('[Google](https://google.com)\n\nvia [Web Clipper for Trello](https://github.com/oskarjakiela/trello-web-clipper)');
      });
    });

    describe('toApi function', function() {
      it('should return throw error if there is not any list', function() {
        expect($card.toApi).toThrow();
      });

      it('should return throw error if list have not got id', function() {
        $card.list = {};
        expect($card.toApi).toThrow();
      });

      it('should serialize card', function() {
        $card.list = { id: '1' };
        $card.name = 'Foo';
        $card.desc = 'Bar';
        expect($card.toApi()).toEqual({
          idList: '1',
          name: 'Foo',
          desc: 'Bar',
          pos: 'bottom'
        });
      });
    });
  });
})();
