import Ember from 'ember';

export default Ember.Controller.extend({
  socketIOService: Ember.inject.service('socket-io'),
  listData: Ember.A([]),
  selectedUser: null,
  selectedMessages: Ember.computed('selectedUser', function() {
    if (this.get('selectedUser')) {


      return this.listData[this.listData.map(function(e) {
          return e.who;
        })
        .indexOf(this.get('selectedUser'))].msgs




    } else {
      return [];
    }
  }),
  messagesCount: Ember.computed('listData.@each.msgs', function(data) {
    return this.get('listData')
      .map(function(chore, index) {

        return `msglength: ${chore.msgs.length}!`;
      });
  }),

  init: function() {
    this._super.apply(this, arguments);


    //USER INTERACTIONS
    $(window).keydown(function(e) {
      // Auto-focus the current input when a key is typed
      if ((event.ctrlKey || event.metaKey || event.altKey)) {
        $('.inputMessage').focus();
      }
    })


    $("input:file").change(function(e) {

      //Get the first (and only one) file element
      //that is included in the original event
      var file = e.originalEvent.target.files[0],
        reader = new FileReader();
      //When the file has been read...
      reader.onload = function(evt) {
        //Because of how the file was read,
        //evt.target.result contains the image in base64 format
        //Nothing special, just creates an img element
        //and appends it to the DOM so my UI shows
        //that I posted an image.
        //send the image via Socket.io

        this.sendFile(evt.target.result)
      };
      //And now, read the image and base64
      reader.readAsDataURL(file);
    });
    /*
     * 2) The next step you need to do is to create your actual socketIO.
     */
    var socket = this.get('socketIOService')
      .socketFor('http://localhost:3001/');

    /*
     * 3) Define any event handlers
     */
    socket.on('connect', function() {
      /*
       * There are 2 ways to send messages to the server: send and emit
       */
      socket.emit('join support', {
        email: 'support@example.com'
      });
    }, this);

    /*
     * 4) It is also possible to set event handlers on specific events
     */
    socket.on('user message', this.onMessage, this);

    socket.on('myCustomNamespace', function() {
      socket.emit('anotherNamespace', 'some data');
    }, this);
    //   socket.emit('addsupport' ,{})
    socket.on("new_msg", function(data) {

    })
    socket.on('message received', function(data) {



    });
    socket.on("user message", function(data) {



      socket.emit('userMsg received', data);
    })
    let self = this;
    socket.on('new user', function(data) {
      self.listData.pushObject(Ember.Object.create({
        who: data.username,
        msgs: Ember.A([]),
        email: data.email,
        connected: false,
        unseenMsgs: 0
      }))



    })
    socket.on('joined', function(data) {

    })
    socket.on('updatechat', this.updateChat, this)
    socket.on('support typing', function(data) {

      })
      // Whenever the server emits 'stop typing', kill the typing message
    socket.on('stop typing', function(data) {

    });
  },
  updateChat: function(data1, data2) {


    this.listData[this.listData.map(function(e) {
        return e.who;
      })
      .indexOf(data2)].toggleProperty('connected')

  },

  onMessage: function(data) {
    // This is executed within the ember run loop
    let clientUser = this.listData[this.listData.map(function(e) {
        return e.who;
      })
      .indexOf(data.username)]

    if (data.image) {

      clientUser.msgs.pushObject({
        msg: data.buffer,
        type: true,
        image: true
      })
    } else {
      clientUser.msgs.pushObject({
        msg: data.msg,
        type: true
      })
      clientUser.incrementProperty('unseenMsgs')

    }
    $('.messages').animate({
      scrollTop: $('.messages').get(0).scrollHeight
    }, 100);
    //alert( data.msg );
  },
  sendFile: function(buf) {

    let message = {}

    // Prevent markup from being injected into the message
    let clientUser = this.listData[this.listData.map(function(e) {
        return e.who;
      })
      .indexOf(this.get('selectedUser'))]


    message.userEmail = clientUser.email;
    message.buffer = buf;
    message.image = true;
    message.username = clientUser.who;
    clientUser.msgs.pushObject({
      msg: message.buffer,
      image: true,
      type: false
    });
    let socket = this.get('socketIOService')
      .socketFor('http://localhost:3001/');
    socket.emit('support image', message);
    $('.messages').animate({
      scrollTop: $('.messages').get(0).scrollHeight
    }, 100);
  },
  actions: {
    imageBuffer: function(evt) {
      let self = this;

      //var file = e.originalEvent.target.files[0],
      var reader = new FileReader();
      //When the file has been read...
      reader.onload = function(e) {
        //Because of how the file was read,
        //e.target.result contains the image in base64 format
        //Nothing special, just creates an img element
        //and appends it to the DOM so my UI shows
        //that I posted an image.
        //send the image via Socket.io

        self.sendFile(e.target.result);
      };
      //And now, read the image and base64
      reader.readAsDataURL(evt[0]);

    },
    triggerFile: function() {
      $('.x-file--input').trigger('click')
    },
    sendMessage: function(value) {

      let message = {}
      message.msg = value;
      // Prevent markup from being injected into the message
      let clientUser = this.listData[this.listData.map(function(e) {
          return e.who;
        })
        .indexOf(this.get('selectedUser'))]


      message.userEmail = clientUser.email;
      message.username = clientUser.who;

      //socket.emit('stop typing',message);
      var socket = this.get('socketIOService')
        .socketFor('http://localhost:3001/');
      socket.emit('support message', message);
      $('.inputMessage').val('');
      clientUser.msgs.pushObject({
        msg: message.msg,
        type: false
      });
      $('.messages').animate({
        scrollTop: $('.messages').get(0).scrollHeight
      }, 100);
      //emit support message to selected user email
    },
    joinRoom: function(item) {

      item.set('connected', true);

      var socket = this.get('socketIOService')
        .socketFor('http://localhost:3001/');
      socket.emit('room', {
        room_name: item.email
      });

     // item.unseenMsgs = 0
      Ember.set(item , 'unseenMsgs' , 0);
      this.set('selectedUser', item.who)
      $('.messages').animate({
        scrollTop: $('.messages').get(0).scrollHeight
      }, 100);
    },
    testprotectedApi: function() {
      var self = this;
      var user = this.store.createRecord('user', {
        name: 'asdfasdf',
        email: 'asdfasdf'

      });


    },
    socketTest: function() {
      var socket = io('http://localhost:3001');
      socket.emit('join support', {
        email: 'support@example.com'
      });
      //   socket.emit('addsupport' ,{})
      socket.on("new_msg", function(data) {
        addChatMessage(data)
      })
      socket.on('message received', function(data) {


        var a = $(".message")
          .filter(function() {
            return ($(this)
              .text() === data.msg)
          });
        a.children('img')
          .attr('src', 'images/ic_done_black_24px.svg')
      });
      socket.on("user message", function(data) {

        data.user = true;
        var $chatWindow = $(document.getElementById(data.userEmail));
        if ($chatWindow.length) {
          addChatMessage(data)
        } else {
          generateChatWindow(data)
        }
        socket.emit('userMsg received', data);
      })
      socket.on('new user', function(data) {
        socket.emit('room', {
          room_name: data.email
        });
      })
      socket.on('joined', function(data) {
        log('connected');
      })
      socket.on('updatechat', function(data1, data2) {
        log(data1)
        log(data2);
      })
      socket.on('support typing', function(data) {
          addChatTyping(data);
        })
        // Whenever the server emits 'stop typing', kill the typing message
      socket.on('stop typing', function(data) {
        removeChatTyping(data);
      });
    }
  }
});
