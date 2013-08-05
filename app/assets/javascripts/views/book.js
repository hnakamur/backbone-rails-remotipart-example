var app = app || {};

app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',
    template: JST['templates/book'],

    events: {
        'click .delete': 'deleteBook'
    },

    deleteBook: function() {
        //Delete model
        this.model.destroy();

        //Delete view
        this.remove();
        //var self = this;
        //$.ajax({
        //    type: 'DELETE',
        //    url: '/books/' + this.model.id + '.json',
        //    success: function(data, status, xhr) {
        //        console.log('deleteBook ajax success!');

        //        Delete model
        //        self.model.destroy();

        //        Delete view
        //        self.remove();
        //    },
        //    failure: function(xhr, status, error) {
        //        console.log('deleteBook ajax failed', status, error);
        //        alert('delete error!');
        //    }
        //});
        //return false;
    },

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        var json = this.model.toJSON();
        json.coverImage = json.cover_image.url;
        json.releaseDate = json.released_on;
        this.$el.html( this.template( json ) );

        return this;
    }
});
