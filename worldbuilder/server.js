

Objects = new Mongo.Collection("objects");

if (Meteor.isServer) {

  Meteor.startup(function() {

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

  });

}

