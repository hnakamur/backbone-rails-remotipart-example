var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    events: {
        'ajax:success #addBook': 'onSuccessAddBook'
    },

    onSuccessAddBook: function(ev, data, status) {
        console.log('onSuccessAddBook', data, status);
        if (status === "success") {
            //TODO: fix code to remove this workaround.
            data.cover_image = data.cover_image.cover_image;

            // This is not enough when other users modified books.
            this.collection.add( new app.Book( data ) );
        }
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
