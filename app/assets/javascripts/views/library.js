var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    events: {
        'ajax:beforeSend #addBook': 'onBeforeSendAddBook',
        'ajax:success #addBook': 'onSuccessAddBook'
    },

    onBeforeSendAddBook: function(xhr, settings) {
        //settings.dataType = 'json';
        console.log('onBeforeSendAddBook', settings);
        return true;
    },

    onSuccessAddBook: function(data, status, xhr) {
        console.log('onSuccessAddBook', data);
        this.collection.add( new app.Book( window.book ) );
        delete window.book;
        //this.collection.fetch({reset: true});
    },

    initialize: function() {
        this.collection = new app.Library();
        this.collection.fetch({reset: true});

        this.render();
        this.listenTo( this.collection, 'add', this.renderBook );
        this.listenTo( this.collection, 'reset', this.render );
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderBook( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function( item ) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    }
});
