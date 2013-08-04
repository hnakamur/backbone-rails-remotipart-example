class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.date :released_on
      t.string :cover_image

      t.timestamps
    end
  end
end
