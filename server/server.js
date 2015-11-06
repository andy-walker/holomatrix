

SceneObjects = new Mongo.Collection("SceneObjects");

Meteor.publish("SceneUpdates", function(filter) {
    
    var self = this;

    var subHandle = SceneObjects.find(filter || {}).observeChanges({
      added: function (id, fields) {
        console.log('server: self added');
        self.added("testdata", id, fields);
      },
      changed: function(id, fields) {
        console.log('server: self updated');
        self.changed("testdata", id, fields);
      },
      removed: function (id) {
        console.log('server: self removed');
        self.removed("testdata", id);
      }
    });

    self.ready();

    self.onStop(function () {
      subHandle.stop();
    });

});

Meteor.startup(function() {
  /*
  if (Objects.find().count() === 0) {

    var objects = [
      {'name': 'Item 1',
        'description': 'This is item 1.'},
      {'name': 'Item 2',
        'description': 'This is item 2.'},
      {'name': 'Item 3',
        'description': 'This is item 3.'}
    ];

    for (var i = 0; i < objects.length; i++)
      Objects.insert(objects[i]);
    
  }
  */  

});